import './styles.css';
import TaskManager from './components/taskManager';
import ProjectManager from './components/projectManager';

const taskManager = new TaskManager();
const projectManager = new ProjectManager();

let currentProjectId = null;

const setCurrentProject = (projectId) => {
  const project_view = document.getElementById('project-view');
  currentProjectId = projectId;
  project_view.replaceChildren(projectManager.renderProject(currentProjectId));
};

// add task modal
const renderAddTaskModal = () => {
  const modal = document.createElement('div');
  let taskinput = '';

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskinput.trim()) return;
    const task = taskManager.createTask({ title: taskinput, id: 3 });
    projectManager.addTask(currentProjectId, task);
    e.target.reset();
    modal.remove();
    setCurrentProject(currentProjectId);
  };

  const taskForm = document.createElement('form');
  taskForm.onsubmit = handleTaskSubmit;
  taskForm.classList.add('task-form');

  const taskTitleInput = document.createElement('input');
  taskTitleInput.type = 'text';
  taskTitleInput.placeholder = 'Add a new task';
  taskTitleInput.classList.add('task-input');
  taskTitleInput.addEventListener('change', (e) => {
    taskinput = e.target.value;
  });

  const addButton = document.createElement('button');
  addButton.type = 'submit';
  addButton.textContent = 'Add';

  modal.replaceChildren(taskForm);
  taskForm.replaceChildren(taskTitleInput, addButton);

  console.log('modal:', modal);
  return modal;
};

const initEventHandlers = () => {
  const content = document.getElementById('content');

  // Task button
  const newTaskButton = document.getElementById('new-task-btn');
  newTaskButton.addEventListener('click', () => {
    content.appendChild(renderAddTaskModal());
    console.log('task button work');
  });

  // Project button
  const newProjectButton = document.getElementById('new-project-btn');
  newProjectButton.addEventListener('click', () => {
    const projectName = prompt('Enter project name');
    if (!projectName?.trim()) return;
    const project = projectManager.createProject(projectName);
    setCurrentProject(project.id);
    updateProjectsList();
    console.log('proj button work');
  });
};

const updateProjectsList = () => {
  const projectsList = document.getElementById('projects-list');
  const projects = projectManager.getProjects();
  const projectItems = projects.map((project) => {
    const li = document.createElement('li');
    li.textContent = project.name;
    li.addEventListener('click', () => setCurrentProject(project.id));
    return li;
  });
  projectsList.replaceChildren(...projectItems);
};

const main = () => {
  initEventHandlers();

  const defaultProject = projectManager.createProject('General');
  setCurrentProject(defaultProject.id);
  updateProjectsList();
};

main();
