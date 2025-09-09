// js/ui.js

// --- DOM ELEMENTS ---
export const screens = {
    loading: document.getElementById('loading-screen'),
    auth: document.getElementById('auth-screen'),
    main: document.getElementById('main-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),
    review: document.getElementById('review-screen')
};

export const loginForm = document.getElementById('login-form');
export const registerForm = document.getElementById('register-form');
export const authError = document.getElementById('auth-error');
export const loginTabBtn = document.getElementById('login-tab-btn');
export const registerTabBtn = document.getElementById('register-tab-btn');
export const logoutBtn = document.getElementById('logout-btn');
export const backToHomeBtn = document.getElementById('back-to-home-btn');
export const submitQuizBtn = document.getElementById('submit-quiz-btn');
export const quizSelectionContainer = document.getElementById('quiz-selection-container');
export const resultsListContainer = document.getElementById('results-list');
export const backFromReviewBtn = document.getElementById('back-from-review-btn');
export const deleteHistoryBtn = document.getElementById('delete-history-btn');
export const exitQuizBtn = document.getElementById('exit-quiz-btn');
export const questionsContainer = document.getElementById('questions-container');
export const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
export const collapsibleNav = document.getElementById('collapsible-nav');
export const navArrowUp = document.getElementById('nav-arrow-up');
export const navArrowDown = document.getElementById('nav-arrow-down');
export const toggleNavBtn = document.getElementById('toggle-nav-btn');

// --- UI FUNCTIONS ---
export function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden'));
    if (screens[screenName]) {
        screens[screenName].classList.remove('hidden');
        if (screenName === 'quiz') {
            screens[screenName].classList.add('flex');
        } else {
            screens[screenName].classList.remove('items-center');
        }
    }
}