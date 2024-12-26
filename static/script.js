document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    async function fetchTasks() {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const listItem = createTaskElement(task);
            taskList.appendChild(listItem);
        });
    }

    function createTaskElement(task) {
        const listItem = document.createElement('li');
        listItem.dataset.id = task.id;
        if (task.completed) listItem.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id, checkbox.checked));

        const span = document.createElement('span');
        span.innerHTML = `<strong>Nom de la tâche :</strong> ${task.content}`;

        const description = document.createElement('p');
        description.className = 'description';
        description.innerHTML = `<strong>Description :</strong> ${task.description || "Aucune"}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'task-content';
        contentWrapper.appendChild(checkbox);
        contentWrapper.appendChild(span);
        contentWrapper.appendChild(deleteButton);

        listItem.appendChild(contentWrapper);
        listItem.appendChild(description);
        return listItem;
    }

    async function addTask(content, description) {
        await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, description })
        });
        showPopup('Tâche ajoutée', 'La tâche a été ajoutée avec succès.');
        fetchTasks();
    }

    async function deleteTask(id) {
        await fetch(`/tasks/${id}`, { method: 'DELETE' });
        showPopup('Tâche supprimée', 'La tâche a été supprimée avec succès.');
        fetchTasks();
    }

    async function toggleTask(id, completed) {
        await fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed })
        });
        fetchTasks();
    }

    addTaskButton.addEventListener('click', () => {
        showTaskPopup();
    });

    fetchTasks();

    function showPopup(title, message) {
        const popup = document.createElement('div');
        popup.className = 'popup show';
        popup.innerHTML = `
            <h2>${title}</h2>
            <p>${message}</p>
            <button onclick="closePopup(this)">Fermer</button>
        `;
        document.body.appendChild(popup);
    }

    window.closePopup = function(button) {
        button.parentElement.classList.remove('show');
        setTimeout(() => {
            button.parentElement.remove();
        }, 300);
    };

    function showTaskPopup() {
        const popup = document.createElement('div');
        popup.className = 'popup show';
        popup.innerHTML = `
            <h2>Ajouter une Tâche</h2>
            <input type="text" id="popupTaskInput" placeholder="Nom de la tâche..." class="task-input">
            <textarea id="popupTaskDescription" placeholder="Description..." class="task-input"></textarea>
            <button onclick="submitTask()">Ajouter</button>
            <button onclick="closePopup(this)">Annuler</button>
        `;
        document.body.appendChild(popup);
    }

    window.submitTask = function() {
        const taskInput = document.getElementById('popupTaskInput').value.trim();
        const taskDescription = document.getElementById('popupTaskDescription').value.trim();
        if (taskInput) {
            addTask(taskInput, taskDescription);
            closePopup(document.querySelector('.popup.show button'));
        } else {
            alert('Le nom de la tâche est requis.');
        }
    };
});
