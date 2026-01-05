document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log('Login attempt:', { email, password });
            alert('Login successful! Redirecting to your todo list...');
            window.location.href = 'todo.html';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            console.log('Registration attempt:', { name, email, password });
            alert('Registration successful! You can now login.');
            window.location.href = 'index.html';
        });
    }

    // Todo List Functionality
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const taskCount = document.getElementById('taskCount');
    const clearCompleted = document.getElementById('clearCompleted');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const logoutBtn = document.getElementById('logoutBtn');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos(filter = 'all') {
        if (!todoList) return;
        todoList.innerHTML = '';
        let filteredTodos = todos;

        if (filter === 'pending') {
            filteredTodos = todos.filter(t => !t.completed);
        } else if (filter === 'completed') {
            filteredTodos = todos.filter(t => t.completed);
        }

        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
                <span>${todo.text}</span>
                <button class="delete-btn" onclick="deleteTodo(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            todoList.appendChild(li);
        });

        const activeCount = todos.filter(t => !t.completed).length;
        taskCount.innerText = `${activeCount} task${activeCount !== 1 ? 's' : ''} left`;
    }

    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoInput.value = '';
            saveTodos();
        }
    }

    window.toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
    };

    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
    };

    if (addBtn) {
        addBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });
    }

    if (clearCompleted) {
        clearCompleted.addEventListener('click', () => {
            todos = todos.filter(t => !t.completed);
            saveTodos();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTodos(btn.dataset.filter);
        });
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    // Initial render if on todo page
    if (todoList) {
        renderTodos();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const taskCount = document.getElementById('taskCount');
    const clearCompleted = document.getElementById('clearCompleted');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Login Redirection
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login successful! Redirecting to your todo list...');
            window.location.href = 'todo.html';
        });
    }

    // Register Redirection
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            alert('Registration successful! Redirecting to your todo list...');
            window.location.href = 'todo.html';
        });
    }

    // Todo List Functionality
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos(filter = 'all') {
        if (!todoList) return;
        todoList.innerHTML = '';
        let filteredTodos = todos;

        if (filter === 'pending') {
            filteredTodos = todos.filter(t => !t.completed);
        } else if (filter === 'completed') {
            filteredTodos = todos.filter(t => t.completed);
        }

        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
                <span>${todo.text}</span>
                <button class="delete-btn" onclick="deleteTodo(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            todoList.appendChild(li);
        });

        const activeCount = todos.filter(t => !t.completed).length;
        if (taskCount) {
            taskCount.innerText = `${activeCount} task${activeCount !== 1 ? 's' : ''} left`;
        }
    }

    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            todoInput.value = '';
            saveTodos();
        }
    }

    window.toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
    };

    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
    };

    if (addBtn) {
        addBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });
    }

    if (clearCompleted) {
        clearCompleted.addEventListener('click', () => {
            todos = todos.filter(t => !t.completed);
            saveTodos();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTodos(btn.dataset.filter);
        });
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    if (todoList) {
        renderTodos();
    }
});
