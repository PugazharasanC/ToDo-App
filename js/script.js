const API_URL = "https://your-new-api-url.com/tasks";
const newTaskButton = document.getElementById("newTask");
const taskInput = document.getElementById("task-input");
const taskDetail = document.getElementById("task-detail");
const taskDeadLine = document.getElementById("task-deadline");
const date = new Date();

taskDeadLine.min = `${date.getFullYear()}-${(date.getMonth() + 1 + "").padStart(
  2,
  "0"
)}-${(date.getDate() + "").padStart(2, "0")}`;

const taskAddButton = document.getElementById("task-add");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const tasks = [];

const doApiCall = async (URL, method = "GET", body = {}) => {
  try {
    const res = await (method == "GET"
      ? fetch(URL)
      : fetch(URL, {
          method,
          body,
          headers: {
            "Content-Type": "application/json",
          },
        }));
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error; // rethrow the error for further handling
  }
};

const changeStatus = async (id) => {
  try {
    const data = await doApiCall(`${API_URL}/${id}`);
    let { taskStatus } = data;

    switch (taskStatus) {
      case "Pending":
        taskStatus = "On Progress";
        break;
      case "On Progress":
        taskStatus = "Completed";
        break;
      case "Completed":
        taskStatus = "Pending";
        break;
    }

    const updatedData = await doApiCall(
      `${API_URL}/${id}`,
      "PUT",
      JSON.stringify({
        ...data,
        taskStatus,
      })
    );

    // console.log(updatedData);
    const updatedTaskIndex = tasks.findIndex((task) => task.id == id);
    // console.log(updatedTaskIndex);
    if (updatedTaskIndex !== -1) {
      tasks[updatedTaskIndex].taskStatus = taskStatus;
      // Re-render the UI with the updated tasks array
      renderTheTask(tasks);
    }
  } catch (error) {
    console.error("Error changing task status:", error);
  }
};

const renderTheTask = (tasks) => {
  // console.log(tasks);
  pendingTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  tasks.forEach(({ taskName, taskDeadLine, taskStatus, id }) => {
    const taskContainer =
      taskStatus == "Completed" ? completedTasks : pendingTasks;

    taskContainer.innerHTML += `
            <div class="row m-3 p-3 bg-info-subtle ${getTaskTextClass(
              taskStatus
            )}" ondblclick="changeStatus('${id}')">
                <div class="col-6">${taskName}</div>
                <div class="col-3">${taskDeadLine}</div>
                <div class="col-3">${taskStatus}</div>
            </div>
        `;
  });
};

const getTaskTextClass = (status) => {
  switch (status) {
    case "Pending":
      return "text-primary";
    case "Completed":
      return "text-success";
    default:
      return "text-warning-emphasis";
  }
};

const addNewTask = () => {
  const newTask = {
    taskName: taskDetail.value,
    taskDeadLine: taskDeadLine.value,
    taskStatus: "Pending",
  };

  //   tasks.push(newTask);

  doApiCall(API_URL, "POST", JSON.stringify(newTask)).then((res) => {
    // console.log(res);
    tasks.push(res);
    renderTheTask(tasks);
  });

  // console.log(tasks);
  taskDeadLine.value = "";
  taskDetail.value = "";
  newTaskButton.click();
};

const toggleTaskInput = () => {
  if (taskInput.style.display === "flex") {
    taskInput.style.display = "none";
    newTaskButton.textContent = "+ New";
    newTaskButton.className = "btn btn-outline-success";
  } else {
    taskInput.style.display = "flex";
    newTaskButton.textContent = "Cancel";
    newTaskButton.className = "btn btn-outline-danger";
  }
};

taskAddButton.addEventListener("click", addNewTask);
newTaskButton.addEventListener("click", toggleTaskInput);

function fetchTasks() {
  doApiCall(API_URL).then((data) => {
    tasks.push(...data);
    renderTheTask(tasks);
  });
}

window.onload = () => {
  fetchTasks();
};
