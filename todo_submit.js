let all, progress, completed;
let todos = [],
    completedTodos = [];
let input, taskBefore, confirm_message;
let li2 = "";
let edit_and_save, taskBox;

todos = JSON.parse(localStorage.getItem("todos")) || [];
completedTodos = JSON.parse(localStorage.getItem("completedTodos")) || [];

window.addEventListener("load", () => {
    let form = document.querySelector("#new-task-form #title");
    all = document.querySelector("#All");
    progress = document.querySelector("#Progress");
    completed = document.querySelector("#Completed");
    taskBox = document.querySelector("#tasks");
    input = document.querySelector("#title");
    edit_and_save = "empty_or_null";

    let navbarItems = document.querySelectorAll(".navbar a");
    navbarItems.forEach((item) => {
        item.addEventListener("click", () => {
            document.querySelector(".active").classList.remove("active"); // Remove any existing active classes
            item.classList.add("active"); // Add active class to the clicked item
        });
    });

    input.value = "";
    input.focus();
    form.addEventListener("keyup", (e) => {
        // e.preventDefault();
        if (e.key == "Enter") {
            submitTask(input.value, edit_and_save);
        }
    });

    document.getElementById("add-icon").addEventListener("click", () => {
        submitTask(input.value, edit_and_save);
    });

    all.addEventListener("click", () => {
        if (todos.length > 0) {
            li2 = "";
            for (let i = 0; i < todos.length; i++) {
                display(todos[i]);
            }
            taskBox.innerHTML = li2;
        } else {
            taskBox.innerHTML = `<span class="no_task_span">No Task were added</span>`;
        }
    });
    all.click();
    counts();

    progress.addEventListener("click", () => {
        if (todos.length > 0) {
            li2 = "";
            for (let i = 0; i < todos.length; i++) {
                if (!completedTodos.includes(todos[i])) {
                    display(todos[i]);
                }
            }
            taskBox.innerHTML =
                li2 ||
                `<span class="no_task_span">You don't have any Pending Task</span>`;
        } else {
            taskBox.innerHTML = `<span class="no_task_span">You don't have any Pending Task</span>`;
        }
    });

    completed.addEventListener("click", () => {
        if (completedTodos.length > 0) {
            li2 = "";
            for (let i = 0; i < completedTodos.length; i++) {
                if (completedTodos.includes(completedTodos[i])) {
                    display(completedTodos[i]);
                }
            }
            taskBox.innerHTML = li2;
        } else {
            taskBox.innerHTML = `<span class="no_task_span">You don't have any Finished Task</span>`;
        }
    });
});

function submitTask(task, edit_and_save2) {
    task = task.replace(/[^a-zA-Z0-9 ]/g, "");
    task = task.replace(/\s+/g, " ");
    task = task.trim();

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
            edit_and_save = "empty_or_null";
        }
        todos.push(task);
        localStorage.setItem("todos", JSON.stringify(todos)); // adding the task into local storage

        if (document.querySelector(".active").id == "Progress") {
            progress.click();
        } else {
            all.click();
        }

        input.value = "";
        input.focus();
        counts();
        // handleInputOrSubmit();
        if (edit_and_save2 == "empty_or_null") {
            showNotification("Task added successfully.", "success");
        } else {
            showNotification("Task updated successfully.", "success");
        }
    } else if (task == "") {
        input.value = "";
        input.focus();
        showNotification("Empty/Invalid Task not accepted.", "warning");
    } else {
        input.focus();
        showNotification("Task already exist.", "warning");
    }
}

function display(task) {
    if (!completedTodos.includes(task)) {
        const li = `<li class="task">
                            <div class="content">
                            <span class="text">${task}</span>
                            </div>
                            <div class="actions">
                            <button title="Pending Task" onclick="checkbox_function(this)" id="myCheckbox" ><i class="fa-regular fa-circle-check" style="background-color: orange;border-radius:100%;"></i></button>
                              <button class="edit" title="Edit" onclick="edit_function(this)"><i class="fa-solid fa-pen"></i></button>
                              <button class="delete" title="Delete" onclick="delete_function(this)"><i class="fa-solid fa-trash"></i></button>
                            </div>
            </li>`;
        li2 = li + li2;
    } else {
        const li = `<li class="task">
        <div class="content">
        <span class="text">${task}</span>
        </div>
        <div class="actions">
        <button title="Finished Task" onclick="checkbox_function(this)" id="myCheckbox" ><i class="fa-regular fa-circle-check" style="background-color: green;border-radius:100%;"></i></button>
          <button class="edit" title="Edit" onclick="edit_function(this)"><i class="fa-solid fa-pen"></i></button>
          <button class="delete" title="Delete" onclick="delete_function(this)"><i class="fa-solid fa-trash"></i></button>
        </div>
    </li>`;
        li2 = li + li2;
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

function confirmFunction(message, content, callback) {
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

    function removeConfirmationBox() {
        document.body.removeChild(confirmBox);
    }

    yesBox.addEventListener("click", () => {
        callback(true);
        removeConfirmationBox();
    });

    noBox.addEventListener("click", () => {
        callback(false);
        removeConfirmationBox();
    });
}

function counts() {
    const all_count = todos.length;
    const progress_count = all_count - completedTodos.length;
    const completed_count = completedTodos.length;
    document.getElementById("All").innerHTML = `All(${all_count})`;
    document.getElementById("Progress").innerHTML = `Pending(${progress_count})`;
    document.getElementById(
        "Completed"
    ).innerHTML = `Finished(${completed_count})`;
}

// function handleInputOrSubmit() {
//     // taskBox.scrollTop = 0; // Scroll to top immediately

//     // For smoother scrolling
//     taskBox.scrollTo({ top: 0, behavior: "smooth" });
// }

module.exports = { submitTask, showNotification, confirmFunction, display, counts };