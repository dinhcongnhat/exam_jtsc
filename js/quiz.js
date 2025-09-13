// js/quiz.js
import { allQuizzes } from './quiz-data.js';
import * as ui from './ui.js';
import { submitQuiz } from './results.js';

// --- BIẾN TRẠNG THÁI ---
export let userAnswers = {};
export let timerInterval;
export let currentQuizId = null;
export let currentQuestions = [];

// --- QUIZ LOGIC ---

// Hàm xáo trộn mảng (Fisher-Yates shuffle) - hiện tại không sử dụng để tránh xáo trộn đáp án
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Hàm tạo đề thi ngẫu nhiên - giữ nguyên vị trí đáp án
function createRandomQuiz() {
    // Gom tất cả câu hỏi từ các đề 1, 2, 3
    const allSourceQuestions = [];
    if (allQuizzes.exam1 && allQuizzes.exam1.questions) {
        allSourceQuestions.push(...allQuizzes.exam1.questions);
    }
    if (allQuizzes.exam2 && allQuizzes.exam2.questions) {
        allSourceQuestions.push(...allQuizzes.exam2.questions);
    }
    if (allQuizzes.exam3 && allQuizzes.exam3.questions) {
        allSourceQuestions.push(...allQuizzes.exam3.questions);
    }

    if (allSourceQuestions.length === 0) {
        console.error("Không tìm thấy câu hỏi nguồn từ các đề 1, 2, 3.");
        alert("Lỗi: Không thể tạo đề thi ngẫu nhiên do thiếu câu hỏi nguồn.");
        return [];
    }

    // Tạo deep copy và shuffle chỉ thứ tự câu hỏi, KHÔNG shuffle đáp án
    const shuffledQuestions = [...allSourceQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 100)
        .map((q, index) => {
            // Deep copy câu hỏi và giữ nguyên vị trí đáp án
            const questionCopy = {
                Câu: index + 1, // Đánh số lại từ 1-100
                question: q.question,
                options: q.options.map(opt => ({
                    // Deep copy từng option object - giữ nguyên label và text
                    label: opt.label,
                    text: opt.text
                })),
                correctAnswer: q.correctAnswer // Giữ nguyên vị trí đáp án đúng
            };
            
            // Log để kiểm tra việc giữ nguyên đáp án
            console.log(`✅ Câu ${index + 1}: Giữ nguyên đáp án ${questionCopy.options[questionCopy.correctAnswer].label} - ${questionCopy.options[questionCopy.correctAnswer].text.substring(0, 50)}...`);
            
            return questionCopy;
        });

    console.log(`🎯 Đã tạo đề ngẫu nhiên với ${shuffledQuestions.length} câu hỏi, giữ nguyên vị trí đáp án`);
    return shuffledQuestions;
}


export function renderQuizSelection() {
    ui.quizSelectionContainer.innerHTML = '';
    for (const quizId in allQuizzes) {
        const quiz = allQuizzes[quizId];
        const card = document.createElement('div');
        card.className = 'card-tech rounded-lg p-6 flex flex-col items-center text-center cursor-pointer';
        card.innerHTML = `
            <h3 class="text-xl font-bold text-gray-800 mb-2">${quiz.title}</h3>
            <p class="text-gray-600 mb-4 flex-grow">${quiz.description}</p>
            <button data-quiz-id="${quizId}" class="start-quiz-btn w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition">Bắt đầu</button>
        `;
        ui.quizSelectionContainer.appendChild(card);
    }
}

function startQuiz(quizId) {
    currentQuizId = quizId;
    let quizDuration;

    if (quizId === 'exam4' || quizId === 'exam5') {
        currentQuestions = createRandomQuiz();
        if (currentQuestions.length === 0) return; // Dừng lại nếu không tạo được đề
        quizDuration = 60 * 120; // 120 minutes
    } else {
        // Tạo deep copy để tránh modification gốc
        currentQuestions = allQuizzes[quizId].questions.map(q => ({
            question: q.question,
            options: q.options.map(opt => ({
                label: opt.label,
                text: opt.text
            })),
            correctAnswer: q.correctAnswer
        }));
        quizDuration = 60 * 100; // 100 minutes
    }
    
    userAnswers = {};
    renderQuiz();
    ui.showScreen('quiz');
    startTimer(quizDuration, document.getElementById('timer'));
}

function renderQuiz() {
    const questionNav = document.getElementById('question-nav');
    ui.questionsContainer.innerHTML = '';
    questionNav.innerHTML = '';

    currentQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.id = `question-${index}`;
        questionElement.className = 'mb-8 p-6 border-b border-gray-200 last:border-b-0';

        // Lấy thuộc tính text của mỗi option để hiển thị đúng
        let optionsHTML = q.options.map((opt, optIndex) => {
            const optionText = opt.text || opt; // Nếu option là object, lấy thuộc tính text, nếu không thì lấy giá trị trực tiếp
            return `
                <label class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer bg-white shadow-sm quiz-option-label">
                    <input type="radio" name="q_${index}" value="${optIndex}" class="form-radio h-5 w-5 border-gray-300 text-[#2c5282] focus:ring-[#2c5282]">
                    <span class="text-gray-700">${String.fromCharCode(65 + optIndex)}. ${optionText}</span>
                </label>
            `;
        }).join('');

        questionElement.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h4 class="text-lg font-semibold text-gray-800"><span class="glow-text">Câu ${index + 1}:</span> ${q.question}</h4>
                <button class="flag-btn p-2 rounded-full hover:bg-yellow-400/20" data-index="${index}">
                    <svg class="w-6 h-6 transition-colors text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
                    </svg>
                </button>
            </div>
            <div class="space-y-2 mt-4">${optionsHTML}</div>
        `;
        ui.questionsContainer.appendChild(questionElement);

        const navBtn = document.createElement('button');
        navBtn.id = `nav-btn-${index}`;
        navBtn.className = 'w-10 h-10 flex items-center justify-center rounded-lg border-2 text-gray-500 font-semibold transition-colors';
        navBtn.textContent = index + 1;
        navBtn.addEventListener('click', () => {
            questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        questionNav.appendChild(navBtn);
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
    clearInterval(timerInterval); // Clear any existing timers
    timerInterval = setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            clearInterval(timerInterval);
            alert("Hết giờ làm bài!");
            submitQuiz();
        }
    }, 1000);
}

export function initQuiz() {
    ui.quizSelectionContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('start-quiz-btn')) {
            const quizId = e.target.dataset.quizId;
            startQuiz(quizId);
        }
    });

    ui.exitQuizBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn thoát? Toàn bộ tiến trình làm bài sẽ bị mất.')) {
            clearInterval(timerInterval);
            ui.showScreen('main');
        }
    });
    
    ui.questionsContainer.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            const questionIndex = parseInt(e.target.name.split('_')[1]);
            if (!userAnswers[questionIndex]) userAnswers[questionIndex] = {};
            userAnswers[questionIndex].answer = parseInt(e.target.value);
            updateNavButton(questionIndex);
        }
    });

    ui.questionsContainer.addEventListener('click', (e) => {
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

    ui.toggleNavBtn.addEventListener('click', () => {
        ui.collapsibleNav.classList.toggle('open');
        ui.navArrowUp.classList.toggle('hidden');
        ui.navArrowDown.classList.toggle('hidden');
    });
}

// Test function để kiểm tra việc giữ nguyên vị trí đáp án
function testAnswerPreservation() {
    console.log('=== TESTING ANSWER PRESERVATION (NO SHUFFLE) ===');
    
    // Test case với cấu trúc object thực tế
    const testQuestion = {
        question: "Test question?",
        options: [
            { label: "A", text: "Wrong option A" },
            { label: "B", text: "Wrong option B" },
            { label: "C", text: "CORRECT option C" },
            { label: "D", text: "Wrong option D" }
        ],
        correctAnswer: 2 // "CORRECT option C"
    };
    
    console.log('Original:', {
        question: testQuestion.question,
        options: testQuestion.options,
        correctAnswer: testQuestion.correctAnswer,
        correctText: testQuestion.options[testQuestion.correctAnswer].text
    });
    
    // Test deep copy 10 lần để đảm bảo không có shuffle
    for (let i = 0; i < 10; i++) {
        const questionCopy = {
            question: testQuestion.question,
            options: testQuestion.options.map(opt => ({
                label: opt.label,
                text: opt.text
            })),
            correctAnswer: testQuestion.correctAnswer
        };
        
        const originalCorrectText = testQuestion.options[testQuestion.correctAnswer].text;
        const newCorrectText = questionCopy.options[questionCopy.correctAnswer].text;
        
        console.log(`Test ${i + 1}:`, {
            preservedOptions: questionCopy.options.map(opt => `${opt.label}: ${opt.text}`),
            correctAnswer: questionCopy.correctAnswer,
            correctText: newCorrectText,
            isValid: originalCorrectText === newCorrectText,
            positionPreserved: testQuestion.correctAnswer === questionCopy.correctAnswer
        });
    }
    
    console.log('=== END ANSWER PRESERVATION TEST ===');
}

// Export test function để có thể gọi từ console
window.testAnswerPreservation = testAnswerPreservation;
