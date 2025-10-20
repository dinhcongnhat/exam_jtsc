import sys
import json
import re
import requests

# Giả sử pdfContent được lưu trong file riêng
def load_pdf_content():
    try:
        with open('js/pdf-content.js', 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract the string content between backticks
            match = re.search(r'export const pdfContent = `([^`]*)`;', content, re.DOTALL)
            if match:
                return match.group(1)
    except FileNotFoundError:
        return ""
    return ""

def search_relevant_content(query, content):
    # Chia content thành các đoạn nhỏ
    sections = content.split('\n\n')
    relevant_sections = []

    # Tìm kiếm từ khóa
    keywords = query.lower().split()
    for section in sections:
        section_lower = section.lower()
        if any(keyword in section_lower for keyword in keywords):
            relevant_sections.append(section)

    # Giới hạn số lượng để không quá dài
    if len(relevant_sections) > 10:
        relevant_sections = relevant_sections[:10]

    return '\n\n'.join(relevant_sections)

def call_gemini_api(prompt, api_key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    headers = {'Content-Type': 'application/json'}
    data = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.2, "topK": 40, "topP": 0.95, "maxOutputTokens": 1024}
    }
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        result = response.json()
        return result.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', 'Không có phản hồi')
    else:
        return f"Lỗi API: {response.status_code}"

def generate_response(message, context, api_key):
    content = load_pdf_content()
    relevant_content = search_relevant_content(message, content)

    prompt = f"""
    **System Instructions:**
    1. **Persona:** Bạn là "Trợ lý Học tập của JTSC", một trợ giảng AI thân thiện, chuyên nghiệp, và luôn trả lời bằng tiếng Việt.
    2. **Core Task:** Trả lời dựa trên KHỐI KIẾN THỨC được cung cấp.
    3. **Formatting:** Dùng markdown.

    --- BẮT ĐẦU KHỐI KIẾN THỨC ---
    {relevant_content or 'Không có nội dung liên quan.'}
    --- KẾT THÚC KHỐI KIẾN THỨC ---

    **Câu hỏi:** {message}
    **Context:** {context}
    """

    return call_gemini_api(prompt, api_key)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python process_text.py <message> <context> <api_key>")
        sys.exit(1)

    message = sys.argv[1]
    context = sys.argv[2]
    api_key = sys.argv[3]

    response = generate_response(message, context, api_key)
    print(response)
