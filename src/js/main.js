import menu from './modules/menu.js';
import preventPageLoadTransitions from './modules/preventPageLoadTransitions.js';

// ページロード時のtransition除去
preventPageLoadTransitions();
document.addEventListener('DOMContentLoaded', () => {
  menu();
});