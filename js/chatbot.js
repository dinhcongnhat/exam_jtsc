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
let currentLanguage = 'vi'; // Ngôn ngữ mặc định
let welcomeMessageShown = false; // Flag để theo dõi đã hiển thị thông báo chào mừng chưa

// Hàm chuyển đổi ngôn ngữ
function switchLanguage(lang) {
    currentLanguage = lang;
    // Hiển thị thông báo chuyển đổi ngôn ngữ
    const langNames = {
        vi: 'Tiếng Việt',
        en: 'English',
        zh: '中文',
        ko: '한국어'
    };
    const messages = {
        vi: `🌐 Đã chuyển sang ngôn ngữ: ${langNames[lang]}. Tôi có thể trả lời mọi câu hỏi của bạn!`,
        en: `🌐 Switched to: ${langNames[lang]}. I can answer any question you have!`,
        zh: `🌐 已切换到：${langNames[lang]}。我可以回答您的任何问题！`,
        ko: `🌐 언어 변경: ${langNames[lang]}. 모든 질문에 답변해드릴 수 있습니다!`
    };
    appendMessage(messages[lang] || messages.vi, 'bot');
}

function toggleChatbot() {
    chatbotContainer.classList.toggle('hidden');
    setTimeout(() => {
        chatbotContainer.classList.toggle('open');
    }, 10);

    // Hiển thị thông báo chào mừng bằng ngôn ngữ hiện tại (chỉ một lần)
    if (!chatbotContainer.classList.contains('hidden') && !welcomeMessageShown) {
        setTimeout(() => {
            const welcomeMessages = {
                vi: "JTSC xin chào! Tôi là một trợ lý được đào tạo bởi đội ngũ JTSC hỗ trợ bạn trong quá trình ôn tập. Hãy hỏi tôi bất cứ điều gì liên quan đến nội dung pháp luật và đấu thầu! Tôi cũng có thể trợ giúp bạn trong nhiều lĩnh vực khác. HÃY HỎI TÔI NẾU BẠN CẦN GIÚP ĐỠ!",
                en: "Hello from JTSC! Feel free to ask me if you have any difficulties during the exam!",
                zh: "JTSC问候您！考试过程中遇到任何困难都可以问我！",
                ko: "JTSC에서 인사드립니다! 시험 중에 어려움이 있으면 언제든 물어보세요!"
            };
            appendMessage(welcomeMessages[currentLanguage], 'bot');
            welcomeMessageShown = true; // Đánh dấu đã hiển thị
        }, 500);
    }
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

// Hàm tìm kiếm nội dung liên quan cải tiến
function searchRelevantContent(query, content) {
    if (!content || !query) return '';
    
    // Kiểm tra nếu câu hỏi chắc chắn không liên quan đến nội dung pháp luật/đấu thầu
    const nonLegalTopics = [
        'toeic', 'ielts', 'english', 'học tập', 'giáo dục', 'khoa học', 'toán học', 'vật lý', 'hóa học',
        'lịch sử', 'địa lý', 'văn học', 'âm nhạc', 'thể thao', 'du lịch', 'ẩm thực', 'sức khỏe',
        'công nghệ', 'ai', 'blockchain', 'machine learning', 'programming', 'python', 'javascript',
        'marketing', 'kinh doanh', 'quản lý', 'leadership', 'tạo câu hỏi', 'viết bài', 'giải thích'
    ];
    
    const queryNormalized = query.toLowerCase()
        .replace(/[^\w\sàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệđìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/g, ' ');
    
    // Nếu câu hỏi chứa các chủ đề không liên quan, trả về rỗng
    if (nonLegalTopics.some(topic => queryNormalized.includes(topic))) {
        return '';
    }
    
    const sections = content.split('\n\n');
    const relevantSections = [];
    const keywords = queryNormalized
        .split(/\s+/)
        .filter(word => word.length > 2); // Chỉ lấy từ có độ dài > 2

    for (const section of sections) {
        const sectionLower = section.toLowerCase();
        let relevanceScore = 0;
        
        // Tính điểm liên quan
        for (const keyword of keywords) {
            const occurrences = (sectionLower.match(new RegExp(keyword, 'g')) || []).length;
            relevanceScore += occurrences;
        }
        
        // Nếu có điểm liên quan, thêm vào danh sách
        if (relevanceScore > 0) {
            relevantSections.push({ section, score: relevanceScore });
        }
    }

    // Sắp xếp theo điểm số và lấy top 5
    return relevantSections
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(item => item.section)
        .join('\n\n');
}

// Hàm phát hiện ngôn ngữ của người dùng (ưu tiên ngôn ngữ đã chọn)
function detectLanguage(text) {
    // Nếu người dùng đã chọn ngôn ngữ cụ thể, ưu tiên sử dụng
    if (currentLanguage !== 'vi') {
        return currentLanguage;
    }

    // Kiểm tra ký tự tiếng Việt
    const vietnameseChars = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệđìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/i;
    if (vietnameseChars.test(text)) {
        return 'vi';
    }

    // Kiểm tra từ khóa tiếng Anh phổ biến
    const englishWords = /\b(the|and|or|but|in|on|at|to|for|of|with|by|an|a|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|can|could|should|may|might|must|shall)\b/i;
    if (englishWords.test(text)) {
        return 'en';
    }

    // Kiểm tra ký tự Trung Quốc
    const chineseChars = /[\u4e00-\u9fff]/;
    if (chineseChars.test(text)) {
        return 'zh';
    }

    // Kiểm tra ký tự Hàn Quốc
    const koreanChars = /[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]/;
    if (koreanChars.test(text)) {
        return 'ko';
    }

    // Mặc định là tiếng Việt (đối với nội dung tiếng Việt)
    return 'vi';
}

// Hàm tạo prompt cho câu hỏi chung (dựa vào kiến thức tổng quát)
function createGeneralKnowledgePrompt(language, userMessage, websiteContext) {
    const prompts = {
        vi: {
            persona: "Bạn là \"Trợ lý Học tập của JTSC\", một AI thông minh, thân thiện và chuyên nghiệp. Bạn có khả năng lập luận logic và trả lời mọi câu hỏi một cách chi tiết, chính xác.",
            capabilities: [
                "- Trả lời câu hỏi về mọi lĩnh vực: học thuật, công nghệ, khoa học, văn hóa, giáo dục, v.v.",
                "- Lập luận có logic và cung cấp ví dụ cụ thể khi cần thiết",
                "- Tạo ra nội dung học tập như bài tập, câu hỏi, giải thích khái niệm",
                "- Phân tích và so sánh các khái niệm phức tạp",
                "- Đưa ra lời khuyên thực tế và hữu ích"
            ],
            approach: "Hãy tư duy như một chuyên gia trong lĩnh vực được hỏi và trả lời một cách toàn diện, dễ hiểu."
        },
        en: {
            persona: "You are \"JTSC Learning Assistant\", an intelligent, friendly, and professional AI. You can reason logically and answer any question comprehensively and accurately.",
            capabilities: [
                "- Answer questions across all domains: academic, technology, science, culture, education, etc.",
                "- Provide logical reasoning and concrete examples when needed",
                "- Create educational content like exercises, questions, concept explanations",
                "- Analyze and compare complex concepts",
                "- Offer practical and helpful advice"
            ],
            approach: "Think like an expert in the relevant field and provide comprehensive, easy-to-understand answers."
        },
        zh: {
            persona: "您是\"JTSC学习助手\"，一个智能、友好且专业的AI。您能够进行逻辑推理并全面准确地回答任何问题。",
            capabilities: [
                "- 回答各个领域的问题：学术、技术、科学、文化、教育等",
                "- 提供逻辑推理和具体示例",
                "- 创建教育内容如练习、问题、概念解释",
                "- 分析和比较复杂概念",
                "- 提供实用和有用的建议"
            ],
            approach: "像相关领域的专家一样思考，提供全面易懂的答案。"
        },
        ko: {
            persona: "당신은 \"JTSC 학습 도우미\"로, 지능적이고 친근하며 전문적인 AI입니다. 논리적으로 추론하고 모든 질문에 포괄적이고 정확하게 답변할 수 있습니다.",
            capabilities: [
                "- 모든 영역의 질문에 답변: 학술, 기술, 과학, 문화, 교육 등",
                "- 논리적 추론과 구체적인 예시 제공",
                "- 연습문제, 질문, 개념 설명 등 교육 콘텐츠 생성",
                "- 복잡한 개념 분석 및 비교",
                "- 실용적이고 도움이 되는 조언 제공"
            ],
            approach: "관련 분야의 전문가처럼 생각하고 포괄적이고 이해하기 쉬운 답변을 제공하세요."
        }
    };

    const langData = prompts[language] || prompts.vi;

    return `
        **System Instructions:**
        
        **Persona:** ${langData.persona}
        
        **Your Capabilities:**
        ${langData.capabilities.join('\n        ')}
        
        **Approach:** ${langData.approach}
        
        **Formatting Guidelines:**
        - Sử dụng markdown để định dạng rõ ràng
        - Cấu trúc câu trả lời logic với tiêu đề phụ khi cần
        - Cung cấp ví dụ cụ thể để minh họa
        - Nếu là câu hỏi phức tạp, chia nhỏ thành các phần dễ hiểu
        
        **User's Question:** "${userMessage}"
        
        **Instruction:** Hãy trả lời câu hỏi trên một cách thông minh, chi tiết và hữu ích nhất có thể. Đừng đề cập đến việc câu hỏi có trong tài liệu hay không - chỉ tập trung vào việc cung cấp câu trả lời tốt nhất.
    `;
}

// Hàm tạo prompt theo ngôn ngữ
function createMultilingualPrompt(language, relevantContent, userMessage, websiteContext, isExplanation = false, questionInfo = null) {
    const prompts = {
        vi: {
            persona: "Bạn là \"Trợ lý Học tập của JTSC\", một trợ giảng AI thân thiện, chuyên nghiệp, và luôn trả lời bằng tiếng Việt.",
            coreTask: "Trả lời dựa trên KHỐI KIẾN THỨC được cung cấp.",
            formatting: "Dùng markdown.",
            knowledgeStart: "--- BẮT ĐẦU KHỐI KIẾN THỨC ---",
            knowledgeEnd: "--- KẾT THÚC KHỐI KIẾN THỨC ---",
            contextTitle: "Current User Context:",
            screenLabel: "Đang ở màn hình:",
            quizLabel: "Đang làm bài thi:",
            progressLabel: "Tiến độ:",
            noQuiz: "Không có",
            notApplicable: "Không áp dụng",
            explanationTask: "Giải thích câu hỏi trắc nghiệm dựa vào \"KHỐI KIẾN THỨC\" dưới đây.",
            questionLabel: "Câu hỏi:",
            optionsLabel: "Các lựa chọn:",
            correctAnswerLabel: "Đáp án đúng:",
            requirement: "Hãy giải thích câu trả lời cho câu hỏi trên."
        },
        en: {
            persona: "You are \"JTSC Learning Assistant\", a friendly, professional AI tutor who always responds in English.",
            coreTask: "Answer based on the provided KNOWLEDGE BASE.",
            formatting: "Use markdown.",
            knowledgeStart: "--- START OF KNOWLEDGE BASE ---",
            knowledgeEnd: "--- END OF KNOWLEDGE BASE ---",
            contextTitle: "Current User Context:",
            screenLabel: "Current screen:",
            quizLabel: "Taking quiz:",
            progressLabel: "Progress:",
            noQuiz: "None",
            notApplicable: "Not applicable",
            explanationTask: "Explain the multiple-choice question based on the \"KNOWLEDGE BASE\" below.",
            questionLabel: "Question:",
            optionsLabel: "Options:",
            correctAnswerLabel: "Correct answer:",
            requirement: "Please explain the answer to the question above."
        },
        zh: {
            persona: "您是\"JTSC学习助手\"，一个友好、专业的人工智能导师，始终用中文回复。",
            coreTask: "基于提供的知识库回答问题。",
            formatting: "使用markdown格式。",
            knowledgeStart: "--- 知识库开始 ---",
            knowledgeEnd: "--- 知识库结束 ---",
            contextTitle: "当前用户上下文：",
            screenLabel: "当前页面：",
            quizLabel: "正在考试：",
            progressLabel: "进度：",
            noQuiz: "无",
            notApplicable: "不适用",
            explanationTask: "基于下面的\"知识库\"解释选择题。",
            questionLabel: "问题：",
            optionsLabel: "选项：",
            correctAnswerLabel: "正确答案：",
            requirement: "请解释上述问题的答案。"
        },
        ko: {
            persona: "당신은 \"JTSC 학습 도우미\"로, 친절하고 전문적인 AI 튜터이며 항상 한국어로 답변합니다.",
            coreTask: "제공된 지식 기반을 기반으로 답변하십시오.",
            formatting: "마크다운을 사용하십시오.",
            knowledgeStart: "--- 지식 기반 시작 ---",
            knowledgeEnd: "--- 지식 기반 종료 ---",
            contextTitle: "현재 사용자 컨텍스트:",
            screenLabel: "현재 화면:",
            quizLabel: "시험 진행 중:",
            progressLabel: "진행 상황:",
            noQuiz: "없음",
            notApplicable: "해당 없음",
            explanationTask: "아래의 \"지식 기반\"을 기반으로 객관식 문제를 설명하십시오.",
            questionLabel: "질문:",
            optionsLabel: "선택지:",
            correctAnswerLabel: "정답:",
            requirement: "위 질문의 답변을 설명해 주십시오."
        }
    };

    const langData = prompts[language] || prompts.vi;

    if (isExplanation && questionInfo) {
        const { question, options, correctAnswerIndex, correctAnswerLetter, correctOptionText } = questionInfo;
        return `
            **System Instructions:**
            1. **Persona:** ${langData.persona}
            2. **Core Task:** ${langData.explanationTask}
            3. **Formatting:** ${langData.formatting}

            ${langData.knowledgeStart}
            ${relevantContent}
            ${langData.knowledgeEnd}

            **${langData.questionLabel}**
            *   **${langData.questionLabel}** ${question}
            *   **${langData.optionsLabel}** ${options.map((o, i) => `\n${String.fromCharCode(65 + i)}) ${o}`).join('')}
            *   **${langData.correctAnswerLabel}** ${correctAnswerLetter} (${correctOptionText})

            **${langData.requirement}**
        `;
    }

    return `
        **System Instructions:**
        1. **Persona:** ${langData.persona}
        2. **Core Task:** ${langData.coreTask}
        3. **Formatting:** ${langData.formatting}

        ${langData.knowledgeStart}
        ${relevantContent || 'Không có nội dung liên quan.'}
        ${langData.knowledgeEnd}

        **${langData.contextTitle}**
        - ${langData.screenLabel} ${websiteContext.screen}
        - ${langData.quizLabel} ${websiteContext.quizTitle}
        - ${langData.progressLabel} ${websiteContext.progress}
    `;
}

async function getGeminiResponse(userMessage) {
    const GEMINI_API_KEY = "AIzaSyCVEzm4DaJcsWDyKjWnlOVzd69wQKXCJNI";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1500;

    chatbotSendBtn.disabled = true;
    appendMessage('typing...', 'bot');
    let typingIndicator = document.getElementById('typing-indicator');

    // Phát hiện ngôn ngữ của người dùng
    const userLanguage = detectLanguage(userMessage);

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

    // Tìm kiếm nội dung liên quan trước
    const relevantContent = searchRelevantContent(userMessage, pdfContent);
    const hasRelevantContent = relevantContent && relevantContent.trim().length > 50; // Tăng threshold để tránh kết quả nhiễu
    
    // Kiểm tra xem có phải câu hỏi trắc nghiệm external không
    const isExternalMultipleChoice = !questionInfo && userMessage.match(/A\)|B\)|C\)|D\)/i);
    
    // Kiểm tra xem có phải câu hỏi chung cần AI suy nghĩ không  
    // Force general question mode cho các chủ đề chắc chắn không liên quan
    const forceGeneralTopics = [
        'toeic', 'ielts', 'tạo câu hỏi', 'tạo 10 câu', 'viết bài', 'cho tôi', 'hãy tạo',
        'lịch sử việt nam', 'khoa học', 'toán học', 'giáo dục', 'học tập', 'ai là gì',
        'blockchain', 'python', 'javascript', 'marketing', 'cách học'
    ];
    
    const shouldForceGeneral = forceGeneralTopics.some(topic => 
        userMessage.toLowerCase().includes(topic)
    );
    
    // Bao gồm các trường hợp: không có thông tin liên quan, hoặc thông tin quá ít, hoặc force general
    const isGeneralQuestion = !questionInfo && (!hasRelevantContent || shouldForceGeneral);

    // Debug log
    console.log('Chat Debug:', {
        userMessage,
        questionInfo: !!questionInfo,
        relevantContentLength: relevantContent ? relevantContent.length : 0,
        hasRelevantContent,
        shouldForceGeneral,
        isExternalMultipleChoice,
        isGeneralQuestion
    });

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

        // Tìm kiếm nội dung liên quan
        const relevantContent = searchRelevantContent(question, pdfContent);

        // Tạo prompt đa ngôn ngữ cho giải thích
        const questionInfoForPrompt = {
            question,
            options: options.map(getOptionText),
            correctAnswerIndex,
            correctAnswerLetter,
            correctOptionText
        };

        const explanationPrompt = createMultilingualPrompt(userLanguage, relevantContent, userMessage, websiteContext, true, questionInfoForPrompt);
        
        requestBody = {
            contents: [{ role: "user", parts: [{ text: explanationPrompt }] }]
        };

    } else if (isExternalMultipleChoice) {
        // Trả lời trực tiếp câu hỏi trắc nghiệm external mà không cần thông báo

        const externalQuestionPrompt = `
            **System Instructions:**
            
            **Persona:** Bạn là "Trợ lý Học tập của JTSC", một AI thông minh và chuyên nghiệp, luôn trả lời bằng ngôn ngữ của người dùng.
            
            **Task:** Phân tích câu hỏi trắc nghiệm và đưa ra câu trả lời chính xác nhất dựa trên kiến thức của bạn.
            
            **Format yêu cầu:**
            - **Đáp án:** [A/B/C/D]
            - **Giải thích:** Giải thích chi tiết tại sao đáp án này đúng và tại sao các đáp án khác sai
            - Sử dụng markdown để định dạng rõ ràng
            
            **Câu hỏi:** "${userMessage}"
            
            **Hướng dẫn:** Hãy phân tích kỹ lưỡng và đưa ra câu trả lời chính xác nhất với lời giải thích logic.
        `;

        requestBody = {
            contents: [{ role: "user", parts: [{ text: externalQuestionPrompt }] }]
        };

    } else if (isGeneralQuestion) {
        // Câu hỏi chung cần AI suy nghĩ - trả lời trực tiếp không cần thông báo

        const generalQuestionPrompt = createGeneralKnowledgePrompt(userLanguage, userMessage, websiteContext);
        
        requestBody = {
            contents: [{ role: "user", parts: [{ text: generalQuestionPrompt }] }]
        };

    } else {
        // Có nội dung liên quan trong tài liệu
        // Tạo prompt đa ngôn ngữ
        const systemPrompt = createMultilingualPrompt(userLanguage, relevantContent, userMessage, websiteContext);

        requestBody = {
            contents: chatHistory,
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            }
        };
    }

    // Thực hiện API call
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
                
                // Quản lý chat history
                if (!isExternalMultipleChoice && !questionInfo && !isGeneralQuestion) {
                    // Câu hỏi thường có trong tài liệu - thêm vào history
                    chatHistory.push({ role: "model", parts: [{ text: botMessage }] });
                } else {
                    // Câu hỏi đặc biệt (external questions, general questions) - không thêm vào history để tránh nhiễu
                    chatHistory.pop(); // Xóa câu hỏi user vừa thêm
                    // Không thêm vào history để giữ context sạch
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

// Hàm reset trạng thái chatbot
function resetChatbot() {
    chatHistory = [];
    welcomeMessageShown = false;
    currentLanguage = 'vi';
    // Xóa tất cả tin nhắn
    const messagesContainer = document.querySelector('#chatbot-messages .relative.z-10');
    if (messagesContainer) {
        messagesContainer.innerHTML = '';
    }
    // Reset language selector
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = 'vi';
    }
}

export function initChatbot() {
    ui.chatbotToggleBtn.addEventListener('click', toggleChatbot);
    chatbotCloseBtn.addEventListener('click', toggleChatbot);

    // Thêm event listener cho language selector
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        languageSelector.addEventListener('change', (e) => {
            switchLanguage(e.target.value);
        });
    }

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

// Export hàm reset để sử dụng từ bên ngoài
export { resetChatbot };
