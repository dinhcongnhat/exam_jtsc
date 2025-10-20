// js/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { auth } from './firebase-config.js';
import * as ui from './ui.js';
import { resetChatbot } from './chatbot.js';

function setupTabSwitching() {
    ui.loginTabBtn.addEventListener('click', () => {
        ui.loginTabBtn.classList.add('border-[#2c5282]', 'text-[#2c5282]');
        ui.loginTabBtn.classList.remove('border-transparent', 'text-gray-500');
        ui.registerTabBtn.classList.remove('border-[#2c5282]', 'text-[#2c5282]');
        ui.registerTabBtn.classList.add('border-transparent', 'text-gray-500');
        ui.loginForm.classList.remove('hidden');
        ui.registerForm.classList.add('hidden');
        ui.authError.textContent = '';
    });

    ui.registerTabBtn.addEventListener('click', () => {
        ui.registerTabBtn.classList.add('border-[#2c5282]', 'text-[#2c5282]');
        ui.registerTabBtn.classList.remove('border-transparent', 'text-gray-500');
        ui.loginTabBtn.classList.remove('border-[#2c5282]', 'text-[#2c5282]');
        ui.loginTabBtn.classList.add('border-transparent', 'text-gray-500');
        ui.registerForm.classList.remove('hidden');
        ui.loginForm.classList.add('hidden');
        ui.authError.textContent = '';
    });
}

function setupAuthForms() {
    ui.registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            ui.authError.textContent = "Lỗi đăng ký: " + error.code;
        }
    });

    ui.loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            ui.authError.textContent = "Lỗi đăng nhập: " + error.code;
        }
    });

    ui.logoutBtn.addEventListener('click', () => {
        signOut(auth);
        resetChatbot(); // Reset chatbot khi đăng xuất
    });
}

export function initAuth() {
    setupTabSwitching();
    setupAuthForms();
}