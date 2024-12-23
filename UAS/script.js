// Pomodoro Timer
const timerDisplay = document.getElementById('timer');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const startPauseButton = document.getElementById('start-pause-timer');
const resetButton = document.getElementById('reset-timer');

let timerInterval;
let isPaused = true;
let isWorkTime = true;
let timeLeft = parseInt(localStorage.getItem('timeLeft')) || undefined;
let storedIsWorkTime = localStorage.getItem('isWorkTime');

if (storedIsWorkTime !== null) {
    isWorkTime = storedIsWorkTime === 'true';
}

function updateTimerDisplay(minutes, seconds) {
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function toggleTimer() {
    if (isPaused) {
        startTimer();
        startPauseButton.textContent = 'Pause';
    } else {
        clearInterval(timerInterval);
        startPauseButton.textContent = 'Play';
    }
    isPaused = !isPaused;
}

function startTimer() {
    if (timeLeft === undefined) {
        const workMinutes = parseInt(workTimeInput.value, 10);
        const breakMinutes = parseInt(breakTimeInput.value, 10);
        timeLeft = (isWorkTime ? workMinutes : breakMinutes) * 60;
    }

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        updateTimerDisplay(minutes, seconds);

        if (timeLeft > 0) {
            timeLeft--;
            localStorage.setItem('timeLeft', timeLeft);
        } else {
            isWorkTime = !isWorkTime;
            localStorage.setItem('isWorkTime', isWorkTime);
            timeLeft = (isWorkTime ? parseInt(workTimeInput.value, 10) : parseInt(breakTimeInput.value, 10)) * 60;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    isPaused = true;
    isWorkTime = true;
    timeLeft = undefined;
    localStorage.removeItem('timeLeft');
    localStorage.removeItem('isWorkTime');
    startPauseButton.textContent = 'Start';
    updateTimerDisplay(parseInt(workTimeInput.value, 10), 0);
}

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

if (timeLeft !== undefined) {
    startTimer();
    isPaused = false;
    startPauseButton.textContent = 'Pause';
}

// To-Do List
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

function saveTodos() {
    const todos = Array.from(todoList.children).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('span').classList.contains('line-through')
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        createTodoItem(todo.text, todo.completed);
    });
}

function createTodoItem(text, completed = false) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    const span = document.createElement('span');
    span.textContent = text;
    if (completed) span.classList.add('line-through');
    li.appendChild(span);

    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.classList.add('button', 'secondary');
    doneButton.addEventListener('click', () => {
        span.classList.toggle('line-through');
        saveTodos();
    });
    li.appendChild(doneButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('button', 'danger');
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTodos();
    });
    li.appendChild(deleteButton);

    todoList.appendChild(li);
    saveTodos();
}

addTodoButton.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        createTodoItem(text);
        todoInput.value = '';
    }
});

loadTodos();