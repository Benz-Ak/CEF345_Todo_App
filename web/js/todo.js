/**
 * CEF345 - ToDo List Logic
 * Handled by: [Your Names]
 */

// 1. SECURITY: Route Guard
// Check if user is logged in before showing the page
(function protectRoute() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.replace('/login.html');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Select HTML elements
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const logoutBtn = document.getElementById('logoutBtn');
    const taskCount = document.getElementById('taskCount');

    // Load tasks from database
    fetchTasks();

    // Event: Add Task on Button Click
    addBtn.addEventListener('click', () => {
        addTask(todoInput.value);
    });

    // Event: Add Task on Enter Key
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(todoInput.value);
    });

    // Event: Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.clear();
        window.location.replace('/');
    });


    clearCompletedBtn.addEventListener('click', async () => {
        if (!confirm("Remove all completed tasks?")) return;

        const userId = localStorage.getItem('userId');

        try {
            // Appel à l'API pour supprimer les tâches terminées de cet utilisateur
            const response = await fetch(`http://localhost:5000/api/tasks/clear-completed/${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Supprimer visuellement de l'UI tous les éléments ayant la classe 'completed'
                const completedItems = document.querySelectorAll('.todo-item.completed');
                completedItems.forEach(item => item.remove());

                // Mettre à jour le compteur
                fetchTasks();
            }
        } catch (error) {
            console.error("Error clearing tasks:", error);
        }
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.getAttribute('data-filter');
            filterTasks(filterType);
        });
    });

});



// 2. FETCH: Get tasks from MySQL via Backend
async function fetchTasks() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    try {
        const response = await fetch(`http://localhost:5000/api/tasks/${userId}`);
        const tasks = await response.json();

        const todoList = document.getElementById('todoList');
        todoList.innerHTML = ''; // Clear UI

        tasks.forEach(task => renderTask(task));
        updateTaskCount(tasks.length);
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

// 3. CREATE: Send new task to Backend
async function addTask(title) {
    if (!title.trim()) return;

    const userId = localStorage.getItem('userId');
    const taskData = { "title": title, user_id: userId };
    console.log(userId);

    try {
        const response = await fetch('http://localhost:5000/api/tasks/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

        if (response.ok) {
            document.getElementById('todoInput').value = ''; // Clear input
            fetchTasks(); // Refresh list
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// 4. DELETE: Remove task from MySQL
async function deleteTask(id) {
    if (!confirm("Delete this task?")) return;

    try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // UI Update: Remove element directly using the ID
            const item = document.getElementById(`task-${id}`);
            if (item) item.remove();
            // Optional: update count
        }
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// 5. HELPER: Render task in HTML (matches your CSS structure)
function renderTask(task) {
    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    li.id = `task-${task.id}`;
    li.className = `todo-item ${task.is_done ? 'completed' : ''}`; // Classe CSS si fini

    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" 
                   class="task-checkbox" 
                   ${task.is_done ? 'checked' : ''} 
                   onclick="toggleTaskStatus(${task.id}, ${task.is_done})">
            <span class="task-text">${task.title}</span>
        </div>
        <div class="task-actions">
            <button onclick="deleteTask(${task.id})" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    todoList.appendChild(li);
}
function updateTaskCount(count) {
    document.getElementById('taskCount').innerText = `${count} tasks total`;
}

async function toggleTaskStatus(id, currentStatus) {
    // On inverse le statut (0 devient 1, 1 devient 0)
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_done: newStatus })
        });

        if (response.ok) {
            // On rafraîchit l'affichage pour voir le changement de style
            //fetchTasks();
            window.location.reload();
        }
    } catch (error) {
        console.error("Error updating task status:", error);
    }
}


/**
 * Filter tasks based on status: all, pending, or completed
 */
function filterTasks(status) {
    const tasks = document.querySelectorAll('.todo-item');

    tasks.forEach(task => {
        // A task is 'completed' if it has the 'completed' class
        const isCompleted = task.classList.contains('completed');

        switch (status) {
            case 'pending':
                // Show if NOT completed, hide if completed
                task.classList.toggle('hidden', isCompleted);
                break;
            case 'completed':
                // Show if completed, hide if NOT completed
                task.classList.toggle('hidden', !isCompleted);
                break;
            case 'all':
            default:
                // Show everything
                task.classList.remove('hidden');
                break;
        }
    });

    // Update active button UI
    updateFilterButtons(status);
}

function updateFilterButtons(activeStatus) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === activeStatus) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}