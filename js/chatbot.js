// js/chatbot.js
import { pdfContent } from './pdf-content.js';
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
            let formattedMessage = message
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
            messageElement.innerHTML = formattedMessage;
        }
    }
    
    messageWrapper.appendChild(messageElement);
    messagesContainer.appendChild(messageWrapper);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function getGeminiResponse(userMessage) {
    const GEMINI_API_KEY = "AIzaSyCVEzm4DaJcsWDyKjWnlOVzd69wQKXCJNI";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1500;

    chatbotSendBtn.disabled = true;
    appendMessage('typing...', 'bot');
    let typingIndicator = document.getElementById('typing-indicator');

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

    let questionInfo = null;
    const getOptionText = (option) => option.text || option;

    if (websiteContext.quizActive) {
        const quiz = allQuizzes[currentQuizId];
        const questionMatchByNumber = userMessage.toLowerCase().match(/(?:câu|question|q|c[aâ]u)\s*(?:hỏi|số)?\s*(\d+)/i);
        let questionNum = -1;

        if (questionMatchByNumber) {
            questionNum = parseInt(questionMatchByNumber[1]) - 1;
        } else {
            const trimmedUserMessage = userMessage.trim().toLowerCase();
            questionNum = quiz.questions.findIndex(q => q.question.trim().toLowerCase() === trimmedUserMessage);
        }

        if (questionNum >= 0 && questionNum < quiz.questions.length) {
            const q = quiz.questions[questionNum];
            questionInfo = {
                question: q.question,
                options: q.options,
                correctAnswerIndex: q.correctAnswer,
                questionNumber: questionNum + 1
            };
        }
    }
    
    let requestBody;
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

    const isExternalQuestion = !questionInfo && userMessage.match(/A\)|B\)|C\)|D\)/i);

    if (questionInfo) {
        const { question, options, correctAnswerIndex, questionNumber } = questionInfo;
        const correctAnswerLetter = String.fromCharCode(65 + correctAnswerIndex);
        const correctOptionText = getOptionText(options[correctAnswerIndex]);

        const optionsStringForDisplay = options.map((opt, index) => {
            return `${String.fromCharCode(65 + index)}) ${getOptionText(opt)}`;
        }).join('\n');

        const responseMessage = `📝 **Câu hỏi ${questionNumber}**\n━━━━━━━━━━━━━━━━━━━━━━\n${question}\n\n**Các phương án trả lời:**\n${optionsStringForDisplay}\n\n✅ **Đáp án chính xác:** ${correctAnswerLetter}`;
        
        if (typingIndicator) typingIndicator.parentElement.remove();
        appendMessage(responseMessage, 'bot');
        appendMessage('typing...', 'bot');
        typingIndicator = document.getElementById('typing-indicator');

        const explanationPrompt = `
            **System Instructions:**
            1. **Persona:** Bạn là "Trợ lý Học tập của JTSC", một trợ giảng AI thân thiện, chuyên nghiệp, và luôn trả lời bằng tiếng Việt.
            2. **Core Task:** Giải thích câu hỏi trắc nghiệm dựa vào "KHỐI KIẾN THỨC" dưới đây.
            3. **Formatting:** Dùng markdown, bắt đầu bằng việc xác nhận đáp án đúng, sau đó giải thích chi tiết.

            --- BẮT ĐẦU KHỐI KIẾN THỨC ---
            ${pdfContent}
            --- KẾT THÚC KHỐI KIẾN THỨC ---

            **Câu hỏi cần giải thích:**
            *   **Câu hỏi:** ${question}
            *   **Các lựa chọn:** ${options.map((o, i) => `\n${String.fromCharCode(65 + i)}) ${getOptionText(o)}`).join('')}
            *   **Đáp án đúng:** ${correctAnswerLetter} (${correctOptionText})

            **Yêu cầu:** Hãy giải thích câu trả lời cho câu hỏi trên.
        `;
        
        requestBody = {
            contents: [{ role: "user", parts: [{ text: explanationPrompt }] }]
        };

    } else if (isExternalQuestion) {
        if (typingIndicator) typingIndicator.parentElement.remove();
        appendMessage('Đây là câu hỏi không thuộc tài liệu, mình sẽ trả lời dựa trên kiến thức chung nhé!', 'bot');
        appendMessage('typing...', 'bot');
        typingIndicator = document.getElementById('typing-indicator');

        const externalQuestionPrompt = `
            **System Instructions:**
            1. **Persona:** Bạn là một trợ lý AI chuyên gia, trả lời bằng tiếng Việt.
            2. **Core Task:** Bạn đã nhận được một câu hỏi trắc nghiệm không có trong tài liệu học tập được cung cấp. Nhiệm vụ của bạn là:
                a. Phân tích câu hỏi và các lựa chọn.
                b. Xác định câu trả lời đúng nhất dựa trên kiến thức chung của bạn.
                c. Trình bày câu trả lời theo định dạng: "**Đáp án:** [A/B/C/D].\n\n**Giải thích:** [Giải thích lý do tại sao đáp án đó đúng và các đáp án khác sai]."
            3. **Formatting:** Sử dụng markdown cho rõ ràng.

            **Câu hỏi từ người dùng:**
            "${userMessage}"

            **Yêu cầu:** Hãy trả lời câu hỏi trên theo hướng dẫn.
        `;

        requestBody = {
            contents: [{ role: "user", parts: [{ text: externalQuestionPrompt }] }]
        };

    } else {
        requestBody = {
            contents: chatHistory,
            systemInstruction: {
                parts: [{
                    text: `
                    **System Instructions:**
                    1. **Persona:** Bạn là "Trợ lý Học tập của JTSC", một AI thân thiện, chuyên nghiệp, trả lời bằng tiếng Việt.
                    2. **Core Task:**
                       - **ƯU TIÊN 1:** Trả lời câu hỏi của người dùng dựa vào "KHỐI KIẾN THỨC" dưới đây.
                       - **ƯU TIÊN 2:** Nếu không tìm thấy, hãy dùng kiến thức chung để trả lời.
                    3. **Formatting:** Dùng markdown.

                    --- BẮT ĐẦU KHỐI KIẾN THỨC ---
                    ${pdfContent}
                    --- KẾT THÚC KHỐI KIẾN THỨC ---

                    **Current User Context:**
                    - Đang ở màn hình: ${websiteContext.screen}
                    - Đang làm bài thi: ${websiteContext.quizTitle}
                    - Tiến độ: ${websiteContext.progress}
                    `
                }]
            }
        };
    }

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...requestBody,
                    generationConfig: { temperature: 0.2, topK: 40, topP: 0.95, maxOutputTokens: 1024 }
                })
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            
            if (data.candidates?.[0]?.content?.parts?.[0]) {
                const botMessage = data.candidates[0].content.parts[0].text;
                // Only add the actual bot response to history
                if (!isExternalQuestion && !questionInfo) {
                    chatHistory.push({ role: "model", parts: [{ text: botMessage }] });
                } else {
                    // For special cases, we pop the user message and add both to keep history clean
                    chatHistory.pop();
                    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
                    chatHistory.push({ role: "model", parts: [{ text: botMessage }] });
                }
                
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
                appendMessage("Hmm, có lỗi xảy ra, hãy thử lại sau nhé! 😥", 'bot');
                chatHistory.pop();
            } else {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            }
        }
    }
    
    chatbotSendBtn.disabled = false;
}

// Unchanged functions below...
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
