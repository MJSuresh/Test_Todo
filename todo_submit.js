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

function confirmFunction(message, content) {
    const confirmBox = document.createElement("div");
    confirmBox.classList.add("confirm-box");
  
    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box");
    messageBox.innerText = message;
    confirmBox.appendChild(messageBox);
  
    const popTaskBox = document.createElement("div");
    popTaskBox.classList.add("popTaskBox");
    popTaskBox.innerText = content;
    messageBox.appendChild(popTaskBox);
  
    const buttonBox = document.createElement("div");
    buttonBox.classList.add("button-box");
    messageBox.appendChild(buttonBox);
  
    const yesBox = document.createElement("button");
    yesBox.classList.add("yes-button");
    yesBox.textContent = "Yes";
    buttonBox.appendChild(yesBox);
  
    const noBox = document.createElement("button");
    noBox.classList.add("no-button");
    noBox.textContent = "No";
    buttonBox.appendChild(noBox);
  
    document.body.appendChild(confirmBox);
  
    // function removeConfirmationBox() {
    //   document.body.removeChild(confirmBox);
    // }
  
    // yesBox.addEventListener("click", () => {
    //   callback(true);
    //   removeConfirmationBox();
    // });
  
    // noBox.addEventListener("click", () => {
    //   callback(false);
    //   removeConfirmationBox();
    // });
  }

module.exports = { submitTask, showNotification, confirmFunction };