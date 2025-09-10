// js/main.js
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { auth } from './firebase-config.js';
import * as ui from './ui.js';
import { initAuth } from './auth.js';
import { initQuiz, renderQuizSelection } from './quiz.js';
import { initResults, loadPastResults } from './results.js';
import { initChatbot } from './chatbot.js';

// --- MAIN APP INITIALIZATION ---

// Hàm này sẽ chạy khi DOM đã được tải hoàn toàn
document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo các event listeners cho từng module
    initAuth();
    initQuiz();
    initResults();
    initChatbot();

    // 2. Theo dõi trạng thái đăng nhập để quyết định màn hình hiển thị ban đầu
    onAuthStateChanged(auth, async (user) => {
        ui.screens.loading.classList.add('hidden'); // Ẩn màn hình loading
        if (user) {
            // Nếu người dùng đã đăng nhập
            document.getElementById('user-email').textContent = user.email;
            renderQuizSelection(); // Hiển thị danh sách các bài thi
            await loadPastResults(user.uid); // Tải lịch sử làm bài
            ui.showScreen('main'); // Hiển thị màn hình chính
            ui.chatbotToggleBtn.classList.remove('hidden'); // Hiện nút chatbot
        } else {
            // Nếu người dùng chưa đăng nhập
            ui.showScreen('auth'); // Hiển thị màn hình đăng nhập/đăng ký
            ui.chatbotToggleBtn.classList.add('hidden'); // Ẩn nút chatbot
        }
    });
    
});