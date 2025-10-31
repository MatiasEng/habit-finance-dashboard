
let tasks = [];
const taksStructure = {
  id: 0,
  title: "task name",
  completed: false
}

tasks.push({id: 1, title: "Task 1", completed: false});
tasks.push({id: 2, title: "Task 2", completed: false});
tasks.push({id: 3, title: "Task 3", completed: false});
tasks.push({id: 4, title: "Task 4", completed: false});
tasks.push({id: 5, title: "Task 5", completed: false});

// READ
function getAllTasks(req, res) {
  res.json(tasks);
}

// READ
function getTask(req, res) {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  
  if(!task) {
    return res.status(404).json({error: "Task not found"});
  }
  res.json(task);
}

// CREATE
function createTask(req, res) {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({error: "Title is required"});
  }
  
  const newTask = {
    id: tasks.length ? tasks.length+1 : 1, 
    title: title, 
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
  
}


// UPDATE
const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  console.log(task);

  if (!task) {
    return res.status(404).json({error: "Task Not Found"});
  }
  
  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  
  res.status(200).json(task);
  
}

// DELETE
const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({error: "Task Not Found"});
    
  tasks.splice(index,1);
  res.status(204).send();
}

export { getAllTasks, getTask, createTask, updateTask, deleteTask }
