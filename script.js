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
    web_dev: {
        title: "Kiến thức Lập trình Web",
        description: "Kiểm tra các khái niệm cơ bản về HTML, CSS, và JavaScript.",
        questions: [
            { question: "HTML là viết tắt của cụm từ nào?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correctAnswer: 0 },
            { question: "Thuộc tính CSS nào dùng để thay đổi màu nền của một phần tử?", options: ["color", "font-size", "background-color", "text-align"], correctAnswer: 2 },
        ]
    },
    space: {
        title: "Khoa học Vũ trụ",
        description: "Khám phá kiến thức về các hành tinh, ngôi sao và thiên hà.",
        questions: [
            { question: "Hành tinh nào được mệnh danh là 'Hành tinh Đỏ'?", options: ["Sao Kim", "Sao Hỏa", "Sao Mộc", "Sao Thổ"], correctAnswer: 1 },
        ]
    },
    history_vn: {
        title: "Lịch sử Việt Nam",
        description: "Tìm hiểu về các sự kiện và nhân vật lịch sử quan trọng của Việt Nam.",
        questions: [
            { question: "Chiến thắng Điện Biên Phủ diễn ra vào năm nào?", options: ["1945", "1954", "1968", "1975"], correctAnswer: 1 },
        ]
    },
    geography: {
        title: "Địa lý Thế giới",
        description: "Thử thách hiểu biết của bạn về các quốc gia, châu lục và đại dương.",
         questions: [
            { question: "Dòng sông nào dài nhất thế giới?", options: ["Sông Nile", "Sông Amazon", "Sông Mississippi", "Sông Dương Tử"], correctAnswer: 0 },
        ]
    },
    literature: {
        title: "Văn học Hiện đại",
        description: "Kiểm tra kiến thức về các tác giả, tác phẩm nổi tiếng trong văn học.",
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

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    if (screens[screenName]) screens[screenName].classList.remove('hidden');
}

// --- AUTH LOGIC ---
onAuthStateChanged(auth, async (user) => {
    screens.loading.classList.add('hidden');
    if (user) {
        document.getElementById('user-email').textContent = user.email;
        renderQuizSelection();
        await loadPastResults(user.uid);
        showScreen('main');
    } else {
        showScreen('auth');
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

quizSelectionContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('start-quiz-btn')) {
        const quizId = e.target.dataset.quizId;
        startQuiz(quizId);
    }
});

function startQuiz(quizId) {
    currentQuizId = quizId;
    currentQuestions = allQuizzes[quizId].questions;
    if(currentQuestions.length > 10) currentQuestions = currentQuestions.slice(0, 10);

    userAnswers = {};
    renderQuiz();
    showScreen('quiz');
    const quizDuration = 60 * 10;
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

    currentQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.id = `question-${index}`;
        questionElement.className = 'mb-8 p-6 border-b border-gray-200 last:border-b-0';
        
        let optionsHTML = q.options.map((opt, optIndex) => `
            <label class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100/50 transition-colors">
                <input type="radio" name="q_${index}" value="${optIndex}" class="form-radio h-5 w-5 border-gray-300 text-[#2c5282] focus:ring-[#2c5282]">
                <span class="text-gray-700">${opt}</span>
            </label>
        `).join('');

        questionElement.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h4 class="text-lg font-semibold text-gray-800"><span class="glow-text">Câu ${index + 1}:</span> ${q.question}</h4>
                <button class="flag-btn p-2 rounded-full hover:bg-yellow-400/20" data-index="${index}">
                    <svg class="w-6 h-6 text-gray-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
                </button>
            </div>
            <div class="space-y-2 mt-4">${optionsHTML}</div>
        `;
        questionsContainer.appendChild(questionElement);

        const navBtn = document.createElement('button');
        navBtn.id = `nav-btn-${index}`;
        navBtn.className = 'w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 text-gray-500 font-semibold transition-colors';
        navBtn.textContent = index + 1;
        navBtn.addEventListener('click', () => {
            questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        questionNav.appendChild(navBtn);
    });
    
    questionsContainer.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            const questionIndex = parseInt(e.target.name.split('_')[1]);
            if(!userAnswers[questionIndex]) userAnswers[questionIndex] = {};
            userAnswers[questionIndex].answer = parseInt(e.target.value);
            updateNavButton(questionIndex);
        }
    });

    questionsContainer.addEventListener('click', (e) => {
        const flagBtn = e.target.closest('.flag-btn');
        if (flagBtn) {
            const questionIndex = parseInt(flagBtn.dataset.index);
            if(!userAnswers[questionIndex]) userAnswers[questionIndex] = {};
            userAnswers[questionIndex].flagged = !userAnswers[questionIndex].flagged;
            flagBtn.querySelector('svg').classList.toggle('text-yellow-500', userAnswers[questionIndex].flagged);
            flagBtn.querySelector('svg').classList.toggle('text-gray-400', !userAnswers[questionIndex].flagged);
            updateNavButton(questionIndex);
        }
    });
}

function updateNavButton(index) {
    const navBtn = document.getElementById(`nav-btn-${index}`);
    const state = userAnswers[index];
    navBtn.className = 'w-10 h-10 flex items-center justify-center rounded-lg border-2 font-semibold transition-colors ';
    if (state && state.flagged) navBtn.classList.add('bg-yellow-400', 'border-yellow-500', 'text-black');
    else if (state && state.answer !== undefined) navBtn.classList.add('bg-green-500', 'border-green-600', 'text-white');
    else navBtn.classList.add('bg-white', 'border-gray-300', 'text-gray-500');
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