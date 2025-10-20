// js/results.js
import { collection, addDoc, query, where, getDocs, serverTimestamp, doc, getDoc, writeBatch } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { db, auth } from './firebase-config.js';
import { allQuizzes } from './quiz-data.js';
import * as ui from './ui.js';
import { userAnswers, timerInterval, currentQuizId, currentQuestions } from './quiz.js';

export async function submitQuiz() {
    clearInterval(timerInterval);
    let correct = 0, incorrect = 0, unanswered = 0;

    console.group('🏁 QUIZ EVALUATION STARTING');
    console.log('Total questions:', currentQuestions.length);
    console.log('User answers:', userAnswers);

    for (let i = 0; i < currentQuestions.length; i++) {
        if (userAnswers[i] && userAnswers[i].answer !== undefined) {
            const userAnswer = userAnswers[i].answer;
            const correctAnswer = currentQuestions[i].correctAnswer;
            const isCorrect = userAnswer === correctAnswer;
            
            // Detailed logging for debugging
            const question = currentQuestions[i];
            const userSelectedText = question.options[userAnswer] ? question.options[userAnswer].text : 'INVALID';
            const correctText = question.options[correctAnswer] ? question.options[correctAnswer].text : 'INVALID';
            
            console.group(`Question ${i + 1}: ${question.question.substring(0, 50)}...`);
            console.log('Options:', question.options.map((opt, idx) => `${opt.label}(${idx}): ${opt.text.substring(0, 30)}...`));
            console.log(`User selected: [${userAnswer}] "${userSelectedText.substring(0, 40)}..."`);
            console.log(`Correct answer: [${correctAnswer}] "${correctText.substring(0, 40)}..."`);
            console.log(`Evaluation: ${isCorrect ? '✅ CORRECT' : '❌ INCORRECT'}`);
            
            // Special case debugging for the problematic question
            if (question.question.includes('Biện pháp nào sau đây được thực hiện trong quá trình thực hiện hợp đồng')) {
                console.warn('🎯 FOUND PROBLEMATIC QUESTION - DETAILED ANALYSIS:');
                console.log('All options with indices:');
                question.options.forEach((opt, idx) => {
                    const marker = idx === correctAnswer ? ' ← SYSTEM CORRECT' : '';
                    const userMarker = idx === userAnswer ? ' ← USER SELECTED' : '';
                    console.log(`  [${idx}] ${opt.label}: ${opt.text}${marker}${userMarker}`);
                });
                
                if (!isCorrect) {
                    console.error('❌ EVALUATION MISMATCH DETECTED!');
                    console.log('Expected user to select:', `[${correctAnswer}] ${question.options[correctAnswer].label}`);
                    console.log('User actually selected:', `[${userAnswer}] ${question.options[userAnswer].label}`);
                }
            }
            console.groupEnd();
            
            if (isCorrect) correct++;
            else incorrect++;
        } else {
            console.log(`Question ${i + 1}: UNANSWERED`);
            unanswered++;
        }
    }
    
    console.log(`Final Score: ${correct} correct, ${incorrect} incorrect, ${unanswered} unanswered`);
    console.groupEnd();
    
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
    ui.showScreen('result');
}

export async function loadPastResults(userId) {
    const noResultsText = document.getElementById('no-results-text');
    ui.resultsListContainer.innerHTML = '';
    try {
        const q = query(collection(db, "quizResults"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            noResultsText.style.display = 'block';
            ui.deleteHistoryBtn.classList.add('hidden');
        } else {
            noResultsText.style.display = 'none';
            ui.deleteHistoryBtn.classList.remove('hidden');
            
            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });

            results.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
            
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
                ui.resultsListContainer.appendChild(resultElement);
            });
        }
    } catch (error) {
        console.error("Error loading past results: ", error);
        noResultsText.textContent = "Lỗi tải lịch sử.";
        noResultsText.style.display = 'block';
    }
}

async function renderReview(resultId) {
    try {
        const docRef = doc(db, "quizResults", resultId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const reviewContent = document.getElementById('review-content');
            reviewContent.innerHTML = '';
            document.getElementById('review-title').textContent = `Xem Lại: ${data.quizTitle}`;
            
            const questions = data.questions || [];
            const userAnswersData = data.userAnswers || {};

            questions.forEach((q, index) => {
                const questionElement = renderResultQuestion(q, index, userAnswersData);
                reviewContent.appendChild(questionElement);
            });
            ui.showScreen('review');
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
    const userAnswerIndex = userAnswersData[index] ? userAnswersData[index].answer : undefined;
    
    let optionsHTML = q.options.map((opt, optIndex) => {
        let optionClasses = "flex items-center space-x-3 p-3 rounded-lg border";
        if (optIndex === q.correctAnswer) optionClasses += " bg-green-100 border-green-300";
        else if (optIndex === userAnswerIndex) optionClasses += " bg-red-100 border-red-300";
        else optionClasses += " border-gray-200";

        return `
            <div class="${optionClasses}">
                <input type="radio" name="review_q_${index}" value="${optIndex}" class="form-radio h-5 w-5 border-gray-300" ${userAnswerIndex === optIndex ? 'checked' : ''} disabled>
                <span class="text-gray-800">${opt.label || String.fromCharCode(65 + optIndex)}. ${opt.text || opt}</span>
            </div>`;
    }).join('');

    const questionElement = document.createElement('div');
    questionElement.className = 'p-4 border-b border-gray-200 last:border-b-0';
    questionElement.innerHTML = `
        <h4 class="text-lg font-semibold text-gray-800 mb-4"><span class="glow-text">Câu ${index + 1}:</span> ${q.question}</h4>
        <div class="space-y-2 mt-2">${optionsHTML}</div>`;
    return questionElement;
}

async function deleteAllHistory(userId) {
    if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử?')) return;
    ui.deleteHistoryBtn.disabled = true;
    ui.deleteHistoryBtn.textContent = 'Đang xóa...';
    try {
        const q = query(collection(db, "quizResults"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
        await loadPastResults(userId);
    } catch (error) {
        console.error("Error deleting history: ", error);
        alert('Lỗi khi xóa lịch sử.');
    } finally {
        ui.deleteHistoryBtn.disabled = false;
        ui.deleteHistoryBtn.textContent = 'Xóa Tất Cả';
    }
}

export function initResults() {
    ui.submitQuizBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn nộp bài không?')) submitQuiz();
    });

    ui.backToHomeBtn.addEventListener('click', async () => {
        if (auth.currentUser) await loadPastResults(auth.currentUser.uid);
        ui.showScreen('main');
    });

    ui.deleteHistoryBtn.addEventListener('click', () => {
        if (auth.currentUser) deleteAllHistory(auth.currentUser.uid);
    });

    ui.resultsListContainer.addEventListener('click', (e) => {
        const reviewBtn = e.target.closest('.review-btn');
        if (reviewBtn) renderReview(reviewBtn.dataset.resultId);
    });

    ui.backFromReviewBtn.addEventListener('click', () => ui.showScreen('main'));
}
