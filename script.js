// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // Add Task button
    const taskInput = document.getElementById('task-input'); // Input field for tasks
    const taskList = document.getElementById('task-list'); // Unordered list for tasks

    // Function to add a new task
    function addTask() {
        // Get the trimmed value from the input field
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task!"); // Prompt the user to enter a task
            return; // Exit the function
        }

        // Create a new list item (li) for the task
        const li = document.createElement('li');
        li.textContent = taskText; // Set the text content of the li

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set the button text
        removeButton.classList.add('remove-btn'); // Use classList.add to add the class

        // Add an event listener to the remove button to delete the task
        removeButton.addEventListener('click', () => {
            taskList.removeChild(li); // Remove the li from the task list
        });

        // Append the remove button to the li
        li.appendChild(removeButton);

        // Append the li to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Add an event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add an event listener to the input field to add tasks on pressing "Enter"
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            addTask(); // Call the addTask function
        }
    });
});
