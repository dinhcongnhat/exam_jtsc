// js/chatbot.js
import { structuredLegalData } from './structured-legal-data.js';

const chatbox = document.getElementById('jts-chatbox');
const chatMessages = document.getElementById('jts-chat-messages');
const chatInput = document.getElementById('jts-chat-input');
const sendBtn = document.getElementById('jts-send-btn');
const chatbotToggle = document.getElementById('jts-chatbot-toggle');
const chatbotContainer = document.getElementById('jts-chatbot-container');

// --- CÁC HÀM XỬ LÝ CHATBOT ---

// Gửi tin nhắn đi
function sendMessage() {
    const query = chatInput.value.trim();
    if (query === '') return;

    appendMessage(query, 'user');
    chatInput.value = '';

    // Hiển thị "Thinking..." ngay lập tức
    const thinkingIndicator = appendMessage('Đang tìm kiếm câu trả lời...', 'bot', true);

    // Mô phỏng độ trễ và tìm câu trả lời
    setTimeout(() => {
        const answer = findAnswer(query);
        // Xóa "Thinking..." và hiển thị câu trả lời thật
        chatMessages.removeChild(thinkingIndicator);
        appendMessage(answer, 'bot');
    }, 500); // Độ trễ ngắn để tạo cảm giác tự nhiên
}

// Thêm tin nhắn vào giao diện
function appendMessage(text, sender, isThinking = false) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('flex', 'mb-4');

    let content;
    if (sender === 'user') {
        messageWrapper.classList.add('justify-end');
        content = `
            <div class="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-xs md:max-w-md lg:max-w-lg">
                <p>${text}</p>
            </div>
        `;
    } else {
        messageWrapper.classList.add('justify-start');
        let thinkingClass = isThinking ? 'thinking-indicator' : '';
        content = `
            <div class="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-3">
                 <img src="./img/logo.png" alt="Bot Avatar" class="w-full h-full rounded-full object-cover">
            </div>
            <div class="bg-gray-200 rounded-lg py-2 px-4 max-w-xs md:max-w-md lg:max-w-lg ${thinkingClass}">
                <p class="text-gray-800">${text}</p>
            </div>
        `;
    }

    messageWrapper.innerHTML = content;
    chatMessages.appendChild(messageWrapper);
    chatbox.scrollTop = chatbox.scrollHeight; // Tự động cuộn xuống
    return messageWrapper;
}

// --- LOGIC TÌM KIẾM CÂU TRẢ LỜI (ĐÃ TỐI ƯU) ---
function findAnswer(query) {
    // Chuyển câu hỏi về chữ thường để dễ so sánh
    const lowerCaseQuery = query.toLowerCase();

    // 1. Tìm trong dữ liệu luật đã cấu trúc (structuredLegalData)
    for (const law in structuredLegalData) {
        for (const chapter in structuredLegalData[law]) {
            for (const articleKey in structuredLegalData[law][chapter]) {
                const articleData = structuredLegalData[law][chapter][articleKey];
                // Lấy tên Điều để kiểm tra
                const articleName = articleKey.toLowerCase();

                if (articleName.includes(lowerCaseQuery)) {
                     // Nếu articleData là một object (có các khoản)
                    if (typeof articleData === 'object' && articleData !== null) {
                        let fullArticleText = ``;
                        for(const clauseKey in articleData) {
                            fullArticleText += `<strong>Khoản ${clauseKey}:</strong> ${articleData[clauseKey]}<br/><br/>`;
                        }
                        return `<strong>${articleKey.split('.')[0]}:</strong><br/>${fullArticleText}`;
                    }
                    // Nếu là string (chỉ có nội dung chính)
                    return `<strong>${articleKey.split('.')[0]}:</strong><br/>${articleData}`;
                }
            }
        }
    }

    // 2. Nếu không tìm thấy trong luật, trả về câu trả lời mặc định
    return "Xin lỗi, tôi không tìm thấy thông tin bạn cần. Bạn có thể sao chép và dán toàn bộ câu hỏi trắc nghiệm vào đây để tôi hỗ trợ.";
}


// --- KHỞI TẠO EVENT LISTENERS ---
export function initChatbot() {
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    chatbotToggle.addEventListener('click', () => {
        const isHidden = chatbotContainer.classList.contains('hidden');
        if (isHidden) {
            chatbotContainer.classList.remove('hidden');
            setTimeout(() => {
                chatbotContainer.classList.remove('opacity-0');
                chatbotContainer.classList.add('opacity-100');
            }, 10);
        } else {
            chatbotContainer.classList.remove('opacity-100');
            chatbotContainer.classList.add('opacity-0');
            setTimeout(() => {
                chatbotContainer.classList.add('hidden');
            }, 300);
        }
    });
}
