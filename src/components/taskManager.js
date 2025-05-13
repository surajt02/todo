class TaskManager {
  createTask = ({ title, description, priority, duedate }) => {
    const task = {
      title: title,
      description: description ? description : 'No description provided',
      priority: priority ? priority : 'none',
      duedate: duedate ? duedate : null,
      completed: false,
      creation: Date.now(),
      id: crypto.randomUUID(),
    };
    console.log('Created task:', task);
    return task;
  };

  deleteTask = (projectID, taskID) => {
    if (projectID && taskID) {
      console.log(taskID);
      const project = projects.filter((p) => p.id === projectID)[0];
      const updatedTasks = project.tasks.filter((t) => t.id !== taskID);

      project.tasks = updatedTasks;
    } else console.error('Project or task not found');
  };

  toggleTask = (projectID, taskID) => {
    const project = projects.filter((p) => p.id === projectID)[0];
    const task = project.tasks.filter((t) => t.id === taskID)[0];
    task.completed = !task.completed;
  };

  // 'low' | 'medium' | 'high' | 'none'
  editPriority = (projectID, taskID, newPriority) => {
    const project = projects.filter((p) => p.id === projectID)[0];
    const task = project.tasks.filter((t) => t.id === taskID)[0];
    task.priority = newPriority;
  };

  editTaskTitle = (projectID, taskID, newTitle) => {
    const project = projects.filter((p) => p.id === projectID)[0];
    const task = project.tasks.filter((t) => t.id === taskID)[0];
    task.title = newTitle;
  };

  editDescription = (projectID, taskID, newDescription) => {
    const project = projects.filter((p) => p.id === projectID)[0];
    const task = project.tasks.filter((t) => t.id === taskID)[0];
    task.description = newDescription;
  };

  renderTask = (task) => {
    console.log('rendering:', task);

    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <label class="task-checkbox">
        <input
          type="checkbox"
          ${task.completed ? 'checked' : ''}
        />
        <span class="checkmark"></span>
      </label>
      <div class='task-content'>
        <div class='task-text'>
          <div class='task-title'>${task.title}</div>
          <div class='task-desc'>${task.description}</div>
        </div>
        ${task.priority}
        ${task.duedate}
      </div>
  `;
    return taskItem;
  };
}

export default TaskManager;
