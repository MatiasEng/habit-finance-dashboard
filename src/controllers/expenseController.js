import Expense from '../models/Expense.js';

async function getExpenses(req, res) {
  try {

    const user = req.user;
    const userExpenses = await Expense.find({user: user.id}).populate('user', 'username email -_id');

    if (userExpenses.length === 0) return res.status(404).json({error: "Not expenses found for user"});
    
    res.json(userExpenses);

  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: "Get expenses failed",
      error: err.message
    });
  }
} 

async function addExpense(req, res) {
  try {
    const user = req.user;
    const { amount, category, description, date } = req.body;
    const newExpense = await Expense.create({
      user: user.id,
      amount: amount,
      category: category,
      description: description,
      date: date
    });

    res.status(201).json({
      success: true,
      expenseCreated: await Expense.find({_id: newExpense.id}).populate('user', 'username email -_id')
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Create Expense Failed",
      error: err.message
    })
  }
} 


async function getOneExpense(req, res) {
  try {
    const user = req.user;
    const expenseId = req.params.id;
    
    const expense = await Expense.find({_id: expenseId, user: user.id}).populate('user', 'username email -_id');
    
    if(!expense) return res.status(404).json({
      success: false,
      message: "Expense not found on user expenses"
    });

    res.json({
      success: true,
      expense: expense
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve the expense",
      error: err.name === "CastError" ? "Cannot find Expense" : err.message
    });
    
  }
} 

async function updateOneExpense(req, res) {
  try {
    const user = req.user;
    const expenseId = req.params.id;
    
    const updatedExpense = await Expense.findOneAndUpdate({_id: expenseId, user: user.id}, req.body)
      .populate('user', 'username email -_id');

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found for user"
      });
    }
    
    res.json({
      success: true,
      updatedExpense: updatedExpense
    })

  } catch(err) {
    res.status(400).json({
      success: false,
      message: "Failed to update Expense",
      error: err.message
    });
  }

} 

async function deleteOneExpense(req, res) {
  try {
    const user = req.user;
    const expenseId = req.params.id;
    
    const expenseToDelete = await Expense.find({_id: expenseId, user: user.id})
      .populate('user', 'username email -_id');
    
    if (!expenseToDelete) {
      return res.status(404).json({
        success: false,
        message: "Expense not found for user" 
      });
    }
    
    await Expense.findOneAndDelete({_id: expenseId, user: user.id});
    
    res.json({
      success: true,
      deletedExpense: expenseToDelete
    });
     
  } catch(err) {
    res.status(400).json({
      success: false,
      message: "Delete Expense failed",
      error: err.message
    });
    
  }
} 

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

export { getExpenses, addExpense, getOneExpense, updateOneExpense, deleteOneExpense };
