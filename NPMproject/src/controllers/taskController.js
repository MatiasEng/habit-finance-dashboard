
let tasks = [];
const taksStructure = {
  id: 0,
  title: "task name",
  completed: false
}

tasks.push({id: 1, title: "Task 1: work", completed: true});
tasks.push({id: 2, title: "Task 2", completed: false});
tasks.push({id: 3, title: "Task 3", completed: true});
tasks.push({id: 4, title: "Task 4: work", completed: false});
tasks.push({id: 5, title: "Task 5", completed: true});

// READ
function getTask(req, res) {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  
  if(!task) {
    return res.status(404).json({error: "Task not found"});
  }
  res.json(task);
}

// READ
function getTasks(req, res) {

  let { search, status, limit} = req.query;

  if (search === undefined && status === undefined && limit === undefined) {
    return res.json(tasks);
  }
  
  let results = [...tasks]; // copy of the tasks
  
  if (search !== undefined) {
    search = search.toLowerCase(); // turn the search into lowercase
    results = results.filter(t => t.title.toLowerCase().includes(search));
  }
  
  if (status !== undefined) {
    status = status.toLowerCase();
    results = results.filter(t => String(t.completed) === status);
  }
  
  if (results.length === 0) {
    return res.status(404).json({error: "No tasks found"});
  }
  
  if (limit !== undefined) {
    if (isNaN(limit)) { 
      return res.status(400).json({error: "Limit must be number"});
    } 
    
    limit = parseInt(limit);
    
    if (limit <= 0 ) {
      return res.status(400).json({error: "Limit must be greather than 0"});
    }

    if (limit <= results.length) return res.json(results.slice(0, limit));
  }

  res.json(results);
  

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

export { getTasks, getTask, createTask, updateTask, deleteTask }
