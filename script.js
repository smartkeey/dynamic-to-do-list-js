// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // Add Task button
    const taskInput = document.getElementById('task-input'); // Input field for tasks
    const taskList = document.getElementById('task-list'); // Unordered list for tasks

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        // Retrieve tasks from Local Storage or initialize an empty array
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Add each task to the DOM
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // 'false' indicates not to save again to Local Storage
        });
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText; // Set the text content of the li

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set the button text
        removeButton.classList.add('remove-btn'); // Add the class for styling

        // Add an event listener to the remove button to delete the task
        removeButton.addEventListener('click', () => {
            taskList.removeChild(li); // Remove the li from the task list
            removeTaskFromStorage(taskText); // Remove the task from Local Storage
        });

        // Append the remove button to the li
        li.appendChild(removeButton);

        // Append the li to the task list
        taskList.appendChild(li);

        // Save the task to Local Storage if 'save' is true
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        // Retrieve tasks from Local Storage or initialize an empty array
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Add the new task to the array
        storedTasks.push(taskText);

        // Save the updated array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        // Retrieve tasks from Local Storage or initialize an empty array
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Filter out the task to be removed
        const updatedTasks = storedTasks.filter(task => task !== taskText);

        // Save the updated array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add an event listener to the "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText); // Add the task and save it to Local Storage
        } else {
            alert("Please enter a task!"); // Prompt the user to enter a task
        }
    });

    // Add an event listener to the input field to add tasks on pressing "Enter"
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText); // Add the task and save it to Local Storage
            } else {
                alert("Please enter a task!"); // Prompt the user to enter a task
            }
        }
    });
});
