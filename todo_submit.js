function submitTask(task, edit_and_save2, progress, showNotification) {
    task = task.replace(/[^a-zA-Z0-9 ]/g, "");
    task = task.replace(/\s+/g, " ");
    task = task.trim();

    let todos = ['1', '2', '3', '4', '5', 'hello'];

    // for not accepting irrespective of existing task
    let flag = true;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].toLowerCase() == task.toLowerCase()) {
            flag = false;
        }
    }

    if (!todos.includes(task) && task != "" && flag) {
        if (todos.includes(edit_and_save2)) {
            todos.splice(todos.indexOf(edit_and_save2), 1);
            // edit_and_save = "empty_or_null";
        }
        todos.push(task);
        //   localStorage.setItem("todos", JSON.stringify(todos)); // adding the task into local storage

        if (true) {
            progress();
        } else {
            all();
        }
       
        if (edit_and_save2 == "empty_or_null") {
            showNotification("Task added successfully.", "success");
        } else {
            showNotification("Task updated successfully.", "success");
        }
    } else if (task == "") {
        showNotification("Empty/Invalid Task not accepted.", "warning");
    } else {
        showNotification("Task already exist.", "warning");
    }
}

function showNotification(message, type) {
    const popUp = document.createElement("div");
    popUp.id = "notification-popup";
    popUp.classList.add(type); // Add class for color (e.g., "success", "warning", "process")

    const content = document.createElement("div");
    content.classList.add("popup-content");
    content.textContent = message;

    popUp.appendChild(content);
    document.body.appendChild(popUp);

    // Auto-hide after a few seconds
    setTimeout(() => {
        document.body.removeChild(popUp);
    }, 1000);
}

module.exports = { submitTask, showNotification };