import expenses from '../data/expenses.js';

let nextId = expenses.length+1;


function getExpenses(req, res) {
  const userId = req.user.id;
  
  const userExpenses = expenses.filter(e => e.userId === userId);
  
  if (!userExpenses) return res.status(404).json({error: "Not expenses found for user"});
  
  res.json(userExpenses);
  

} 

function addExpense(req, res) {
  const {amount, category, description, date} = req.body;
  
  if (!amount || !category || !description || !date) {
    return res.status(404).json({error: "All fields are require"});
  }
  
  if (isNaN(amount)) return res.status(400).json({error: "The amount must be a number"});
  if (amount < 0) return res.status(400).json({error: "The amount cannot negative"});
  
  const newExpense = {
    id: nextId,
    userId: req.user.id,
    amount: amount,
    category: category,
    description: description,
    date: date,
    createdAt: getCurrentDate() 
  }
  
  nextId++;
  expenses.push(newExpense);
  res.status(201).json(newExpense);

} 

// the following the param id is relative to the userExpenses

function getOneExpense(req, res) {
  const userExpenses = expenses.filter(e => e.userId === req.user.id);
  
  if(!userExpenses) return res.status(404).json({error: "Expenses for user Not Found"});
  
  const expenseId = req.params.id;

  if (isNaN(expenseId)) return res.status(400).json({error: "The expense id must be a number"});
  if (expenseId < 1 || expenseId > userExpenses.length) return res.status(400).json({error: "The expense id is out of range"});
  
  const expense = userExpenses[expenseId-1];
  
  res.json(expense);

} 

function updateOneExpense(req, res) {
  const { amount, category, description, date } = req.body;
  const expenseId =  req.params.id;
  const userExpenses = expenses.filter(e => e.userId === req.user.id); 
  
  // check for expenses
  if(!userExpenses) res.status(404).json({error: "Expenses for user Not Found"});
  
  
  // check for valid expenseId 
  if (isNaN(expenseId)) return res.status(400).json({error: "The expense id must be a number"});
  if (expenseId < 1 || expenseId > userExpenses.length) return res.status(400).json({error: "The expense id is out of range"});
  
  // check for valid fields
  if (!amount && !category && !description && !data) {
    return res.status(400).json({error: "At least one field is require"});
  }

  
  const expense = userExpenses[expenseId-1];
  
  expense.amount = amount ?? expense.amount;
  expense.category = category ?? expense.category;
  expense.description = description ?? expense.description;
  expense.date = date ?? expense.date;

  res.json(expense);

} 

function deleteOneExpense(req, res) {
  const expenseId =  req.params.id;
  const userExpenses = expenses.filter(e => e.userId === req.user.id); 
  
  // check for expenses
  if(!userExpenses) res.status(404).json({error: "Expenses for user Not Found"});
  
  
  // check for valid expenseId
  if (isNaN(expenseId)) return res.status(400).json({error: "The expense id must be a number"});
  if (expenseId < 1 || expenseId > userExpenses.length) return res.status(400).json({error: "The expense id is out of range"});
  
  const expense = userExpenses[expenseId-1];
  
  const expenseIndex = expenses.findIndex(e => e.id === expense.id);
  
  expenses.splice(expenseIndex,1);

  res.json(expense);

} 

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

export { getExpenses, addExpense, getOneExpense, updateOneExpense, deleteOneExpense };
