import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp, doc, getDoc, writeBatch } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = typeof __firebase_config !== 'undefined' 
    ? JSON.parse(__firebase_config)
    : {
        apiKey: "AIzaSyCE9pYi-F8f8aJ66GvhlgrXVnTdJBz4sNc",
        authDomain: "jtscdb.firebaseapp.com",
        projectId: "jtscdb",
        storageBucket: "jtscdb.firebasestorage.app",
        messagingSenderId: "Y676905178628",
        appId: "1:676905178628:web:5242a9e2cfedf0b7640751"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// --- CÁC BỘ CÂU HỎI ---
const allQuizzes = {
    
        
    exam4: {
        title: "Đề 4",
        description: "Đề bài gồm 60 câu, thời gian làm bài 120 phút!",
         questions: [
            { question: "Dòng sông nào dài nhất thế giới?", options: ["Sông Nile", "Sông Amazon", "Sông Mississippi", "Sông Dương Tử"], correctAnswer: 0 },
        ]
    },
    exam5: {
        title: "Đề 5",
        description: "Đề bài gồm 60 câu, thời gian làm bài 120 phút!",
        questions: [
            { question: "Ai là tác giả của tác phẩm 'Số Đỏ'?", options: ["Nam Cao", "Ngô Tất Tố", "Vũ Trọng Phụng", "Nguyễn Công Hoan"], correctAnswer: 2 },
        ]
    }
};

// --- BIẾN TRẠNG THÁI ---
let userAnswers = {};
let timerInterval;
let currentQuizId = null;
let currentQuestions = [];

// --- DOM ELEMENTS ---
const screens = {
    loading: document.getElementById('loading-screen'),
    auth: document.getElementById('auth-screen'),
    main: document.getElementById('main-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),
    review: document.getElementById('review-screen')
};
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authError = document.getElementById('auth-error');
const loginTabBtn = document.getElementById('login-tab-btn');
const registerTabBtn = document.getElementById('register-tab-btn');
const logoutBtn = document.getElementById('logout-btn');
const backToHomeBtn = document.getElementById('back-to-home-btn');
const submitQuizBtn = document.getElementById('submit-quiz-btn');
const quizSelectionContainer = document.getElementById('quiz-selection-container');
const resultsListContainer = document.getElementById('results-list');
const backFromReviewBtn = document.getElementById('back-from-review-btn');
const deleteHistoryBtn = document.getElementById('delete-history-btn');
const exitQuizBtn = document.getElementById('exit-quiz-btn');
const questionsContainer = document.getElementById('questions-container');
const collapsibleNav = document.getElementById('collapsible-nav');
const navArrowUp = document.getElementById('nav-arrow-up');
const navArrowDown = document.getElementById('nav-arrow-down');
const toggleNavBtn = document.getElementById('toggle-nav-btn');
toggleNavBtn.addEventListener('click', () => {
  collapsibleNav.classList.toggle('open');
  navArrowUp.classList.toggle('hidden');
  navArrowDown.classList.toggle('hidden');
});
function showScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.add('hidden'));
  if (screens[screenName]) {
       screens[screenName].classList.remove('hidden');
       if(screenName === 'quiz') {
          screens[screenName].classList.add('flex');
       } else {
          screens[screenName].classList.remove('items-center');
       }
  }
}

// --- AUTH LOGIC ---
onAuthStateChanged(auth, async (user) => {
    screens.loading.classList.add('hidden');
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    if (user) {
        document.getElementById('user-email').textContent = user.email;
        renderQuizSelection();
        await loadPastResults(user.uid);
        showScreen('main');
        chatbotToggleBtn.classList.remove('hidden');
    } else {
        showScreen('auth');
        chatbotToggleBtn.classList.add('hidden');
    }
});

// --- QUIZ LOGIC ---


function renderQuizSelection() {
    quizSelectionContainer.innerHTML = '';
    for (const quizId in allQuizzes) {
        const quiz = allQuizzes[quizId];
        const card = document.createElement('div');
        card.className = 'card-tech rounded-lg p-6 flex flex-col items-center text-center cursor-pointer';
        card.innerHTML = `
            <h3 class="text-xl font-bold text-gray-800 mb-2">${quiz.title}</h3>
            <p class="text-gray-600 mb-4 flex-grow">${quiz.description}</p>
            <button data-quiz-id="${quizId}" class="start-quiz-btn w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition">Bắt đầu</button>
        `;
        quizSelectionContainer.appendChild(card);
    }
}

//Thoát chương trình
exitQuizBtn.addEventListener('click', () => {
  if (confirm('Bạn có chắc chắn muốn thoát? Toàn bộ tiến trình làm bài sẽ bị mất.')) {
      clearInterval(timerInterval);
      showScreen('main');
  }
});
quizSelectionContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('start-quiz-btn')) {
        const quizId = e.target.dataset.quizId;
        startQuiz(quizId);
    }
});

function startQuiz(quizId) {
    currentQuizId = quizId;
    currentQuestions = allQuizzes[quizId].questions;
    if(currentQuestions.length > 10) currentQuestions = currentQuestions.slice(0, 60);

    userAnswers = {};
    renderQuiz();
    showScreen('quiz');
    const quizDuration = 60*100;
    startTimer(quizDuration, document.getElementById('timer'));
}

async function submitQuiz() {
    clearInterval(timerInterval);
    let correct = 0, incorrect = 0, unanswered = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
        if (userAnswers[i] && userAnswers[i].answer !== undefined) {
            if (userAnswers[i].answer === currentQuestions[i].correctAnswer) correct++;
            else incorrect++;
        } else unanswered++;
    }
    
    const user = auth.currentUser;
    if (user) {
        try {
            await addDoc(collection(db, "quizResults"), {
                userId: user.uid,
                quizId: currentQuizId,
                quizTitle: allQuizzes[currentQuizId].title,
                score: correct,
                totalQuestions: currentQuestions.length,
                timestamp: serverTimestamp(),
                questions: currentQuestions,
                userAnswers: userAnswers
            });
        } catch (error) { console.error("Error saving result: ", error); }
    }
    displayResults(correct, incorrect, unanswered);
}

function displayResults(correct, incorrect, unanswered) {
    const total = currentQuestions.length;
    const score = total > 0 ? (correct / total) * 100 : 0;
    document.getElementById('score-text').textContent = `${correct}/${total}`;
    document.getElementById('correct-answers').textContent = correct;
    document.getElementById('incorrect-answers').textContent = incorrect;
    document.getElementById('unanswered-questions').textContent = unanswered;
    const progressCircle = document.getElementById('progress-circle');
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference - score / 100 * circumference;
    
    renderResultDetails(currentQuestions, userAnswers);
    showScreen('result');
}

async function loadPastResults(userId) {
    const resultsContainer = document.getElementById('results-list');
    const noResultsText = document.getElementById('no-results-text');
    const deleteBtn = document.getElementById('delete-history-btn');
    resultsContainer.innerHTML = '';
    try {
        const q = query(collection(db, "quizResults"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            noResultsText.style.display = 'block';
            deleteBtn.classList.add('hidden');
        } else {
            noResultsText.style.display = 'none';
            deleteBtn.classList.remove('hidden');
            
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });

            results.sort((a, b) => {
                if (!a.timestamp) return 1;
                if (!b.timestamp) return -1;
                return b.timestamp.toMillis() - a.timestamp.toMillis();
            });
            
            results.forEach((data) => {
                const date = data.timestamp ? data.timestamp.toDate().toLocaleString('vi-VN') : 'N/A';
                const resultElement = document.createElement('div');
                resultElement.className = 'flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0';
                resultElement.innerHTML = `
                    <div>
                        <p class="font-semibold text-gray-800">${data.quizTitle || 'Bài kiểm tra'}</p>
                        <p class="text-sm text-gray-500">Ngày làm: ${date}</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="text-right">
                           <p class="font-bold text-lg text-gray-800">${data.score}/${data.totalQuestions}</p>
                           <p class="font-semibold text-sm ${data.score/data.totalQuestions >= 0.5 ? 'text-green-600' : 'text-red-600'}">
                               ${((data.score/data.totalQuestions)*100).toFixed(0)}%
                           </p>
                        </div>
                        <button data-result-id="${data.id}" class="review-btn bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition">Xem lại</button>
                    </div>
                `;
                resultsContainer.appendChild(resultElement);
            });
        }
    } catch (error) {
        console.error("Error loading past results: ", error);
        noResultsText.textContent = "Lỗi tải lịch sử. Vui lòng kiểm tra console.";
        noResultsText.style.display = 'block';
    }
}

backToHomeBtn.addEventListener('click', async () => {
    if (auth.currentUser) await loadPastResults(auth.currentUser.uid);
    showScreen('main');
});

function renderQuiz() {
    const questionsContainer = document.getElementById('questions-container');
    const questionNav = document.getElementById('question-nav');
    questionsContainer.innerHTML = '';
    questionNav.innerHTML = '';

    // Reset userAnswers mỗi lần render mới
    userAnswers = [];

    currentQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.id = `question-${index}`;
        questionElement.className = 'mb-8 p-6 border-b border-gray-200 last:border-b-0';
        
        let optionsHTML = q.options.map((opt, optIndex) => {
            const checked = (userAnswers[index]?.answer === optIndex) ? 'checked' : '';
            return `
                <label class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer bg-white shadow-sm quiz-option-label">
                    <input type="radio" name="q_${index}" value="${optIndex}" ${checked} 
                           class="form-radio h-5 w-5 border-gray-300 text-[#2c5282] focus:ring-[#2c5282]">
                    <span class="text-gray-700">${opt}</span>
                </label>
            `;
        }).join('');

        questionElement.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h4 class="text-lg font-semibold text-gray-800"><span class="glow-text">Câu ${index + 1}:</span> ${q.question}</h4>
                <button class="flag-btn p-2 rounded-full hover:bg-yellow-400/20" data-index="${index}">
                    <svg class="w-6 h-6 transition-colors ${userAnswers[index]?.flagged ? 'text-yellow-500' : 'text-gray-400'}" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
                    </svg>
                </button>
            </div>
            <div class="space-y-2 mt-4">${optionsHTML}</div>
        `;
        questionsContainer.appendChild(questionElement);

        // Tạo button nav
        const navBtn = document.createElement('button');
        navBtn.id = `nav-btn-${index}`;
        navBtn.className = 'w-10 h-10 flex items-center justify-center rounded-lg border-2 text-gray-500 font-semibold transition-colors';
        navBtn.textContent = index + 1;
        navBtn.addEventListener('click', () => {
            questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        questionNav.appendChild(navBtn);

        updateNavButton(index);
    });

    // Sự kiện chọn đáp án
    questionsContainer.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            const questionIndex = parseInt(e.target.name.split('_')[1]);
            if (!userAnswers[questionIndex]) userAnswers[questionIndex] = {};
            userAnswers[questionIndex].answer = parseInt(e.target.value);
            updateNavButton(questionIndex);
        }
    });

    // Sự kiện flag
    questionsContainer.addEventListener('click', (e) => {
        const flagBtn = e.target.closest('.flag-btn');
        if (flagBtn) {
            const questionIndex = parseInt(flagBtn.dataset.index);
            if (!userAnswers[questionIndex]) userAnswers[questionIndex] = {};
            userAnswers[questionIndex].flagged = !userAnswers[questionIndex].flagged;
            const svg = flagBtn.querySelector('svg');
            svg.classList.toggle('text-yellow-500', userAnswers[questionIndex].flagged);
            svg.classList.toggle('text-gray-400', !userAnswers[questionIndex].flagged);
            updateNavButton(questionIndex);
        }
    });
}

function updateNavButton(index) {
    const navBtn = document.getElementById(`nav-btn-${index}`);
    const state = userAnswers[index];
    navBtn.className = 'w-10 h-10 flex items-center justify-center rounded-lg border-2 font-semibold transition-colors';
    if (state && state.flagged) {
        navBtn.classList.add('bg-yellow-400', 'border-yellow-500', 'text-black');
    } else if (state && state.answer !== undefined) {
        navBtn.classList.add('bg-green-500', 'border-green-600', 'text-white');
    } else {
        navBtn.classList.add('bg-white', 'border-gray-300', 'text-gray-500');
    }
}


function startTimer(duration, display) {
    let timer = duration;
    timerInterval = setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

async function renderReview(resultId) {
    try {
        const docRef = doc(db, "quizResults", resultId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const reviewContent = document.getElementById('review-content');
            const reviewTitle = document.getElementById('review-title');
            reviewContent.innerHTML = '';
            reviewTitle.textContent = `Xem Lại: ${data.quizTitle}`;
            
            const questions = data.questions || [];
            const userAnswersData = data.userAnswers || {};

            questions.forEach((q, index) => {
                const questionElement = renderResultQuestion(q, index, userAnswersData);
                reviewContent.appendChild(questionElement);
            });
            showScreen('review');

        } else { alert("Không tìm thấy kết quả bài làm."); }
    } catch (error) {
        console.error("Error getting document:", error);
        alert("Đã xảy ra lỗi khi tải chi tiết bài làm.");
    }
}

function renderResultDetails(questions, userAnswersData){
    const container = document.getElementById('result-details-container');
    container.innerHTML = '';
    questions.forEach((q, index) => {
        const questionElement = renderResultQuestion(q, index, userAnswersData);
        container.appendChild(questionElement);
    });
}

function renderResultQuestion(q, index, userAnswersData) {
    const userAnswerInfo = userAnswersData[index];
    const userAnswerIndex = userAnswerInfo ? userAnswerInfo.answer : undefined;
    
    let optionsHTML = q.options.map((opt, optIndex) => {
        let optionClasses = "flex items-center space-x-3 p-3 rounded-lg border";
        if (optIndex === q.correctAnswer) {
            optionClasses += " bg-green-100 border-green-300";
        } else if (optIndex === userAnswerIndex) {
            optionClasses += " bg-red-100 border-red-300";
        } else {
            optionClasses += " border-gray-200";
        }

        return `
            <div class="${optionClasses}">
                <input type="radio" name="review_q_${index}" value="${optIndex}" class="form-radio h-5 w-5 border-gray-300" ${userAnswerIndex === optIndex ? 'checked' : ''} disabled>
                <span class="text-gray-800">${opt}</span>
            </div>
        `;
    }).join('');

    const questionElement = document.createElement('div');
    questionElement.className = 'p-4 border-b border-gray-200 last:border-b-0';
    questionElement.innerHTML = `
        <h4 class="text-lg font-semibold text-gray-800 mb-4"><span class="glow-text">Câu ${index + 1}:</span> ${q.question}</h4>
        <div class="space-y-2 mt-2">${optionsHTML}</div>
    `;
    return questionElement;
}

async function deleteAllHistory(userId) {
    if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử làm bài không? Hành động này không thể hoàn tác.')) {
        return;
    }
    deleteHistoryBtn.disabled = true;
    deleteHistoryBtn.textContent = 'Đang xóa...';
    try {
        const q = query(collection(db, "quizResults"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        await loadPastResults(userId); // Refresh the list
    } catch (error) {
        console.error("Error deleting history: ", error);
        alert('Đã xảy ra lỗi khi xóa lịch sử. Vui lòng kiểm tra lại quy tắc bảo mật (Security Rules) trong Firebase và cấp quyền "delete".');
    } finally {
        deleteHistoryBtn.disabled = false;
        deleteHistoryBtn.textContent = 'Xóa Tất Cả';
    }
}

deleteHistoryBtn.addEventListener('click', () => {
    if (auth.currentUser) {
        deleteAllHistory(auth.currentUser.uid);
    }
});

resultsListContainer.addEventListener('click', (e) => {
    const reviewBtn = e.target.closest('.review-btn');
    if (reviewBtn) {
        const resultId = reviewBtn.dataset.resultId;
        renderReview(resultId);
    }
});

backFromReviewBtn.addEventListener('click', () => showScreen('main'));

submitQuizBtn.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn nộp bài không?')) submitQuiz();
});

loginTabBtn.addEventListener('click', () => {
    loginTabBtn.classList.add('border-[#2c5282]', 'text-[#2c5282]');
    loginTabBtn.classList.remove('border-transparent', 'text-gray-500');
    registerTabBtn.classList.remove('border-[#2c5282]', 'text-[#2c5282]');
    registerTabBtn.classList.add('border-transparent', 'text-gray-500');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    authError.textContent = '';
});
registerTabBtn.addEventListener('click', () => {
    registerTabBtn.classList.add('border-[#2c5282]', 'text-[#2c5282]');
    registerTabBtn.classList.remove('border-transparent', 'text-gray-500');
    loginTabBtn.classList.remove('border-[#2c5282]', 'text-[#2c5282]');
    loginTabBtn.classList.add('border-transparent', 'text-gray-500');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    authError.textContent = '';
});
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    try { await createUserWithEmailAndPassword(auth, email, password); } 
    catch (error) { authError.textContent = "Lỗi đăng ký: " + error.code; }
});
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try { await signInWithEmailAndPassword(auth, email, password); }
    catch (error) { authError.textContent = "Lỗi đăng nhập: " + error.code; }
});
logoutBtn.addEventListener('click', () => signOut(auth));

// --- CHATBOT LOGIC (MODIFIED FOR GOOGLE GEMINI) ---
const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotHeader = document.querySelector('#chatbot-container .bg-blue-700');
const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSendBtn = document.getElementById('chatbot-send-btn');
const chatbotMessages = document.getElementById('chatbot-messages');

// chatHistory format: [{ role: "user" | "model", parts: [{ text: "message content" }] }]
let chatHistory = []; 

const toggleChatbot = () => {
    chatbotContainer.classList.toggle('hidden');
    setTimeout(() => {
        chatbotContainer.classList.toggle('open');
    }, 10);
};

chatbotToggleBtn.addEventListener('click', toggleChatbot);
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

function appendMessage(message, sender) {
    const messagesContainer = document.querySelector('#chatbot-messages .relative.z-10');
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('flex', 'mb-4', 'max-w-full'); // Increased margin bottom
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('p-4', 'rounded-lg', 'break-words', 'shadow-sm'); // Added padding and subtle shadow

    if (sender === 'user') {
        messageWrapper.classList.add('justify-end');
        messageElement.classList.add('user-message', 'ml-auto');
        messageElement.textContent = message;
    } else { // bot (model)
        messageWrapper.classList.add('justify-start');
        messageElement.classList.add('bot-message', 'mr-auto');
        if (message === 'typing...') {
            messageElement.innerHTML = `<div class="flex items-center justify-center space-x-1"><div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div><div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div><div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div></div>`;
            messageElement.id = 'typing-indicator';
        } else {
            messageElement.textContent = message;
        }
    }
    
    messageWrapper.appendChild(messageElement);
    messagesContainer.appendChild(messageWrapper);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function getGeminiResponse(userMessage) {
    const GEMINI_API_KEY = "AIzaSyCIAZp0_4gOUuMltP3UfBzfCngD858QUZk";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        appendMessage("Lỗi: Vui lòng cấu hình API Key của Google Gemini trong mã nguồn.", 'bot');
        return;
    }

    chatbotSendBtn.disabled = true;
    appendMessage('typing...', 'bot');

    // Get current website content and context
    const currentQuiz = currentQuizId ? allQuizzes[currentQuizId] : null;
    const websiteContext = {
        currentScreen: Object.entries(screens).find(([_, screen]) => !screen.classList.contains('hidden'))?.[0] || 'main',
        currentQuiz: currentQuiz ? {
            title: currentQuiz.title,
            description: currentQuiz.description,
            currentQuestion: currentQuestions ? currentQuestions.length : 0,
            questions: currentQuestions || []
        } : null,
        userAnswers: userAnswers
    };
    
    // Process user message for question-related queries
    // Check for question number in user message
    const questionMatch = userMessage.toLowerCase().match(/(?:câu|question|q|c[aâ]u)\s*(\d+)/i);
    
    let responseMessage = '';
    if (questionMatch && currentQuizId && allQuizzes[currentQuizId]) {
        const questionNum = parseInt(questionMatch[1]) - 1;
        const quiz = allQuizzes[currentQuizId];
        
        if (questionNum >= 0 && questionNum < quiz.questions.length) {
            const question = quiz.questions[questionNum];
            const correctAnswerLetter = ['A', 'B', 'C', 'D'][question.correctAnswer];
            responseMessage = `📝 Câu hỏi ${questionNum + 1}
━━━━━━━━━━━━━━━━━━━━━━
${question.question}

🔍 Các phương án trả lời:

A) ${question.options[0]}
B) ${question.options[1]}
C) ${question.options[2]}
D) ${question.options[3]}

✅ Đáp án chính xác: ${correctAnswerLetter}`;
        }
    }

    const contextMessage = responseMessage || `
Current Context:
${JSON.stringify({
    screen: websiteContext.currentScreen,
    quiz: websiteContext.currentQuiz ? {
        title: websiteContext.currentQuiz.title,
        currentQuestion: websiteContext.currentQuiz.currentQuestion,
        totalQuestions: websiteContext.currentQuiz.questions.length,
        progress: Object.keys(userAnswers).length
    } : null,
    lastMessages: chatHistory.slice(-3)
}, null, 2)}

User Query: ${userMessage}

Instructions for Response:
1. Quiz Context:
   - If in a quiz, provide relevant information about current progress
   - For question queries, analyze and explain thoroughly
   - Mention time remaining if asked

2. Response Format:
   - Use clear sections with emoji icons
   - Break down complex explanations
   - Use bullet points for lists
   - Add emphasis on important points using **bold**

3. Language:
   - Default to Vietnamese
   - Match user's language choice
   - Use formal but friendly tone

4. Navigation Help:
   - Explain interface elements
   - Provide clear step-by-step guidance
   - Reference visual elements user can see

Remember to maintain helpful, clear, and structured responses.`;

    chatHistory.push({ 
        role: "user", 
        parts: [{ text: contextMessage }] 
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: chatHistory,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024
                }
            })
        });

        if (!response.ok) {
            appendMessage(`Đợi tôi chút nhé!`, 'bot');

            // Multiple retries with exponential backoff
            let retryAttempts = 0;
            const maxRetries = 3;
            const baseDelay = 1000;
            
            const retryRequest = async () => {
                if (retryAttempts >= maxRetries) {
                    appendMessage("Xin lỗi, tôi đang gặp khó khăn trong việc xử lý. Hãy thử lại sau nhé!", 'bot');
                    return;
                }
                
                const delay = baseDelay * Math.pow(2, retryAttempts);
                await new Promise(resolve => setTimeout(resolve, delay));
                
                try {
                    const retryResponse = await fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{
                                role: "user",
                                parts: [{ text: userMessage }]
                            }],
                            generationConfig: {
                                temperature: 0.5,
                                topK: 30,
                                topP: 0.9,
                                maxOutputTokens: 800
                            }
                        })
                    });
                    
                    if (retryResponse.ok) {
                        const retryData = await retryResponse.json();
                        if (retryData.candidates?.[0]?.content?.parts?.[0]) {
                            const retryAnswer = retryData.candidates[0].content.parts[0].text.trim();
                            appendMessage(retryAnswer, 'bot');
                            return;
                        }
                    }
                    
                    retryAttempts++;
                    retryRequest();
                    
                } catch (retryError) {
                    console.error("Error in retry attempt:", retryError);
                    retryAttempts++;
                    retryRequest();
                }
            };
            
            retryRequest();
            
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error.message}`);
        }

        const data = await response.json();

        let botMessage = "Rất tiếc, tôi không thể xử lý yêu cầu này.";
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            botMessage = data.candidates[0].content.parts[0].text;
        } else if (data.candidates && data.candidates[0] && data.candidates[0].finishReason === "SAFETY") {
            botMessage = "Nội dung này bị chặn vì lý do an toàn.";
        }
        
        chatHistory.push({ role: "model", parts: [{ text: botMessage }] });
        
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) typingIndicator.parentElement.remove();
        appendMessage(botMessage, 'bot');

    } catch (error) {
        console.error("Error calling Google Gemini API:", error);
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) typingIndicator.parentElement.remove();
        appendMessage(`Đợi tôi chút nhé!`, 'bot');
    } finally {
        chatbotSendBtn.disabled = false;
    }
}

// Drag-and-drop functionality for chatbot
let isDragging = false;
let offsetX, offsetY;

chatbotHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - chatbotContainer.offsetLeft;
    offsetY = e.clientY - chatbotContainer.offsetTop;
    chatbotContainer.style.position = 'absolute';
    chatbotContainer.style.zIndex = 1000;
    
    // Use CSS transform for better performance
    chatbotContainer.style.transition = 'none';

    function onMouseMove(e) {
        if (!isDragging) return;
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        chatbotContainer.style.left = x + 'px';
        chatbotContainer.style.top = y + 'px';
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

const resizeHandle = document.getElementById('resize-handle');

resizeHandle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const chatbotContainer = document.getElementById('chatbot-container');
    
    // Disable transitions for smooth resizing
    chatbotContainer.style.transition = 'none';
    
    const minWidth = 300; // Minimum width
    const minHeight = 400; // Minimum height
    const startWidth = chatbotContainer.offsetWidth;
    const startHeight = chatbotContainer.offsetHeight;
    const startX = e.clientX;
    const startY = e.clientY;

    function onMouseMove(e) {
        // Calculate new dimensions
        const width = Math.max(minWidth, startWidth + (e.clientX - startX));
        const height = Math.max(minHeight, startHeight + (e.clientY - startY));
        
        // Apply new dimensions directly without any delay
        chatbotContainer.style.width = `${width}px`;
        chatbotContainer.style.height = `${height}px`;
        
        // Prevent text selection during resize
        e.preventDefault();
    }

    function onMouseUp() {
        // Re-enable transitions after resize
        chatbotContainer.style.transition = '';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});