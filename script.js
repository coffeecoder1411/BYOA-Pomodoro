let timeLeft;
let timerId = null;
let isWorkTime = true;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('startPause');
const modeToggleButton = document.getElementById('mode-toggle');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = themeToggleBtn.querySelector('i');
const startPauseIcon = startPauseButton.querySelector('i');
const modeToggleIcon = modeToggleButton.querySelector('i');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function updateModeToggleIcon() {
    // Show coffee icon during work mode (to switch to break)
    // Show brain icon during break mode (to switch to work)
    modeToggleIcon.className = isWorkTime ? 'fas fa-coffee' : 'fas fa-brain';
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Time to Focus! 🎯' : 'Take a Breather! ☕';
    updateModeToggleIcon();
    updateDisplay();
    if (isRunning) {
        pauseTimer();
    }
}

function toggleStartPause() {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    if (!isRunning) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        isRunning = true;
        startPauseIcon.className = 'fas fa-pause';
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isRunning = false;
                startPauseIcon.className = 'fas fa-play';
                switchMode();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    startPauseIcon.className = 'fas fa-play';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    // Don't change the mode, just reset the time for current mode
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    startPauseIcon.className = 'fas fa-play';
    modeText.textContent = isWorkTime ? 'Time to Focus! 🎯' : 'Take a Breather! ☕';
    updateDisplay();
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    }
}

startPauseButton.addEventListener('click', toggleStartPause);
modeToggleButton.addEventListener('click', switchMode);
resetButton.addEventListener('click', resetTimer);
themeToggleBtn.addEventListener('click', toggleTheme);

// Initialize the display
resetTimer(); 