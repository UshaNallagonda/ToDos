document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".add-task-btn");
  const taskInput = document.querySelector("#task-title");
  const taskList = document.querySelector("#task-list");

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();
    
    // Check if input is not empty
    if (taskText !== "") {
      // Check for duplicate tasks (case-insensitive)
      const existingTasks = Array.from(taskList.querySelectorAll("li span"));
      const isDuplicate = existingTasks.some(
        (task) => task.textContent.toLowerCase() === taskText.toLowerCase()
      );
      
      if (isDuplicate) {
        window.alert("Task already exists!");
        return;
      }

      // Create new list item
      const listElement = document.createElement("li");
      const taskCheckbox = document.createElement("input");
      taskCheckbox.type = "checkbox";
      const taskLabel = document.createElement("span");
      taskLabel.textContent = taskText;
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      // Add classes and event listeners to buttons
      editButton.classList.add("edit");
      deleteButton.classList.add("delete");
      editButton.innerHTML = "edit";
      deleteButton.innerHTML = "delete";

      // Append elements to the li
      listElement.appendChild(taskCheckbox);
      listElement.appendChild(taskLabel);
      listElement.appendChild(editButton);
      listElement.appendChild(deleteButton);
      taskList.appendChild(listElement);

      // Reset input
      taskInput.value = "";

      // Edit button functionality
      editButton.addEventListener("click", () => {
        const newTaskText = prompt("Edit your task:", taskLabel.textContent);
        if (newTaskText && newTaskText.trim() !== "") {
          taskLabel.textContent = newTaskText.trim();
        }
      });

      // Delete button functionality
      deleteButton.addEventListener("click", () => {
        taskList.removeChild(listElement);
      });

      // Mark task as completed and disable edit button
      taskCheckbox.addEventListener("change", () => {
        listElement.classList.toggle("completed");
        editButton.disabled = taskCheckbox.checked;
      });
    } else {
      window.alert("Task should not be empty");
    }
  }

  // Add task when 'Add' button is clicked
  addButton.addEventListener("click", addTask);

  // Add task when 'Enter' key is pressed
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
});
