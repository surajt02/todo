import TaskManager from './taskManager.js';

class ProjectManager {
  #taskManager = new TaskManager();
  #projects = [];

  getProjects = () => {
    return [...this.#projects];
  };

  addProject = (project) => {
    this.#projects.push(project);
  };

  createProject = (name) => {
    const project = {
      name: name,
      tasks: [],
      creation: Date.now(),
      id: crypto.randomUUID(),
    };
    this.addProject(project);
    console.log('Created project:', project);
    return project;
  };

  deleteProject = (projectID) => {
    const updatedProjects = this.#projects.filter((p) => p.id !== projectID);
    this.#projects = updatedProjects;
  };

  editProjectName = (projectID, newName) => {
    const project = this.#projects.filter((p) => p.id === projectID)[0];
    project.name = newName;
  };

  addTask = (projectID, task) => {
    if (projectID && task) {
      const project = this.#projects.filter((p) => p.id === projectID)[0];
      project.tasks.push(task);
    } else console.error('Project or task not found');
  };

  renderProject = (projectID) => {
    const project = this.#projects.filter((p) => p.id === projectID)[0];
    const projectItem = document.createElement('div');
    const taskList = document.createElement('ul');
    const heading = document.createElement('h2');
    heading.textContent = project.name;

    projectItem.classList.add('project-item');
    projectItem.appendChild(heading);
    projectItem.appendChild(taskList);

    const taskItems = project.tasks.map((t) => this.#taskManager.renderTask(t));
    console.log('Task Items:', taskItems);

    taskList.replaceChildren(...taskItems);
    console.log('project item:', projectItem);

    return projectItem;
  };
}

export default ProjectManager;
