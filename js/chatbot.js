// js/chatbot.js
import { allQuizzes } from './quiz-data.js';
import { currentQuizId, currentQuestions, userAnswers } from './quiz.js';
import * as ui from './ui.js';

const chatbotContainer = document.getElementById('chatbot-container');
const chatbotHeader = document.querySelector('#chatbot-container .bg-blue-700');
const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSendBtn = document.getElementById('chatbot-send-btn');
const chatbotMessages = document.getElementById('chatbot-messages');
const resizeHandle = document.getElementById('resize-handle');

let chatHistory = [];

function toggleChatbot() {
    chatbotContainer.classList.toggle('hidden');
    setTimeout(() => {
        chatbotContainer.classList.toggle('open');
    }, 10);
};

function appendMessage(message, sender) {
    const messagesContainer = document.querySelector('#chatbot-messages .relative.z-10');
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('flex', 'mb-4', 'max-w-full');
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('p-4', 'rounded-lg', 'break-words', 'shadow-sm');

    if (sender === 'user') {
        messageWrapper.classList.add('justify-end');
        messageElement.classList.add('user-message', 'ml-auto');
        messageElement.textContent = message;
    } else {
        messageWrapper.classList.add('justify-start');
        messageElement.classList.add('bot-message', 'mr-auto');
        if (message === 'typing...') {
            messageElement.innerHTML = `<div class="flex items-center justify-center space-x-1"><div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div><div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div><div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div></div>`;
            messageElement.id = 'typing-indicator';
        } else {
            // Cải tiến để render markdown tốt hơn
            let formattedMessage = message
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // In đậm
                .replace(/\n/g, '<br>'); // Xuống dòng
            messageElement.innerHTML = formattedMessage;
        }
    }
    
    messageWrapper.appendChild(messageElement);
    messagesContainer.appendChild(messageWrapper);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// *** HÀM getGeminiResponse ĐƯỢC NÂNG CẤP VỚI NGỮ CẢNH VÀ PERSONA ***
async function getGeminiResponse(userMessage) {
    const GEMINI_API_KEY = "AIzaSyCIAZp0_4gOUuMltP3UfBzfCngD858QUZk"; 
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1500;

    chatbotSendBtn.disabled = true;
    appendMessage('typing...', 'bot');
    let typingIndicator = document.getElementById('typing-indicator');

    // --- BƯỚC 1: XÁC ĐỊNH NGỮ CẢNH HIỆN TẠI CỦA NGƯỜI DÙNG ---
    const getCurrentScreen = () => {
        for (const screenName in ui.screens) {
            if (!ui.screens[screenName].classList.contains('hidden')) {
                return screenName;
            }
        }
        return 'unknown';
    };

    const websiteContext = {
        screen: getCurrentScreen(),
        quizActive: !!currentQuizId,
        quizTitle: currentQuizId ? allQuizzes[currentQuizId].title : 'Không có',
        progress: currentQuizId ? `Đã trả lời ${Object.keys(userAnswers).length}/${currentQuestions.length} câu` : 'Không áp dụng'
    };

    // --- BƯỚC 2: XÂY DỰNG PROMPT THÔNG MINH DỰA TRÊN NGỮ CẢNH ---
    let finalPrompt = '';
    const questionMatch = userMessage.toLowerCase().match(/(?:câu|question|q|c[aâ]u)\s*(\d+)/i);
    
    if (questionMatch && websiteContext.quizActive) {
        // Trường hợp 1: Người dùng hỏi về một câu hỏi cụ thể trong bài thi
        const questionNum = parseInt(questionMatch[1]) - 1;
        const quiz = allQuizzes[currentQuizId];

        if (questionNum >= 0 && questionNum < quiz.questions.length) {
            const q = quiz.questions[questionNum];
            const correctAnswerLetter = ['A', 'B', 'C', 'D'][q.correctAnswer];
            
            const responseMessage = `📝 **Câu hỏi ${questionNum + 1}**\n━━━━━━━━━━━━━━━━━━━━━━\n${q.question}\n\n**Các phương án trả lời:**\n A) ${q.options[0]}\n B) ${q.options[1]}\n C) ${q.options[2]}\n D) ${q.options[3]}\n\n✅ **Đáp án chính xác:** ${correctAnswerLetter}`;
            
            if (typingIndicator) typingIndicator.parentElement.remove();
            appendMessage(responseMessage, 'bot');
            appendMessage('typing...', 'bot');
            typingIndicator = document.getElementById('typing-indicator');
            
            finalPrompt = `Với vai trò là một trợ giảng AI, hãy giải thích thật chi tiết tại sao đáp án "${q.options[q.correctAnswer]}" là đúng và các phương án còn lại là sai cho câu hỏi: "${q.question}".`;
        }
    } else {
        // Trường hợp 2: Người dùng hỏi một câu hỏi chung
        finalPrompt = `
            **System Instructions:**
            1.  **Persona:** Bạn là "Trợ lý Học tập", một trợ giảng AI thân thiện, thông minh và chuyên nghiệp. **Luôn luôn trả lời bằng tiếng Việt.**
            2.  **Formatting:** Luôn sử dụng markdown để câu trả lời được rõ ràng và chuyên nghiệp.
                -   Dùng **in đậm** cho các thuật ngữ quan trọng.
                -   Dùng gạch đầu dòng (-) cho danh sách.
                -   Sử dụng emojis phù hợp (💡, ✅, 📝, 🚀, 🎯) để tăng tính trực quan và thân thiện.
            3.  **Context Awareness:** Dựa vào thông tin ngữ cảnh dưới đây để đưa ra câu trả lời phù hợp nhất.

            **Current User Context:**
            -   Đang ở màn hình: ${websiteContext.screen}
            -   Đang làm bài thi: ${websiteContext.quizTitle}
            -   Tiến độ: ${websiteContext.progress}

            **User's Question:** "${userMessage}"
        `;
    }
    
    chatHistory.push({ role: "user", parts: [{ text: finalPrompt }] });

    // --- BƯỚC 3: GỌI API VÀ XỬ LÝ PHẢN HỒI (Không thay đổi) ---
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: chatHistory,
                    generationConfig: { temperature: 0.6, topK: 40, topP: 0.95, maxOutputTokens: 1024 }
                })
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            
            if (data.candidates?.[0]?.content?.parts?.[0]) {
                const botMessage = data.candidates[0].content.parts[0].text;
                chatHistory.push({ role: "model", parts: [{ text: botMessage }] });
                
                if (typingIndicator) typingIndicator.parentElement.remove();
                appendMessage(botMessage, 'bot');
                chatbotSendBtn.disabled = false;
                return;
            } else {
                 throw new Error("Invalid response from API");
            }

        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error);
            if (attempt === MAX_RETRIES) {
                if (typingIndicator) typingIndicator.parentElement.remove();
                appendMessage("Hmm, có vẻ như tôi đang gặp chút trục trặc. Bạn vui lòng kiểm tra lại câu hỏi hoặc thử lại sau một lát nhé! 😥", 'bot');
            } else {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            }
        }
    }
    
    chatbotSendBtn.disabled = false;
}

// Các hàm còn lại không thay đổi
function setupDraggableChatbot() {
    let isDragging = false;
    let offsetX, offsetY;

    chatbotHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - chatbotContainer.offsetLeft;
        offsetY = e.clientY - chatbotContainer.offsetTop;
        chatbotContainer.style.transition = 'none';

        function onMouseMove(e) {
            if (!isDragging) return;
            chatbotContainer.style.left = (e.clientX - offsetX) + 'px';
            chatbotContainer.style.top = (e.clientY - offsetY) + 'px';
        }

        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            chatbotContainer.style.transition = '';
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

function setupResizableChatbot() {
    resizeHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        chatbotContainer.style.transition = 'none';
        const minWidth = 300, minHeight = 400;
        const startWidth = chatbotContainer.offsetWidth;
        const startHeight = chatbotContainer.offsetHeight;
        const startX = e.clientX;
        const startY = e.clientY;

        function onMouseMove(e) {
            const width = Math.max(minWidth, startWidth + (e.clientX - startX));
            const height = Math.max(minHeight, startHeight + (e.clientY - startY));
            chatbotContainer.style.width = `${width}px`;
            chatbotContainer.style.height = `${height}px`;
        }

        function onMouseUp() {
            chatbotContainer.style.transition = '';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

export function initChatbot() {
    ui.chatbotToggleBtn.addEventListener('click', toggleChatbot);
    chatbotCloseBtn.addEventListener('click', toggleChatbot);

    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatbotInput.value.trim();
        if (message) {
            appendMessage(message, 'user');
            getGeminiResponse(message);
            chatbotInput.value = '';
        }
    });

    setupDraggableChatbot();
    setupResizableChatbot();
}