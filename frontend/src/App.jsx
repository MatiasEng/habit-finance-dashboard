import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import HabitForm from './pages/HabitForm';
import ExpenseForm from './pages/ExpenseForm';
import AuthGuard from './components/AuthGuard';
import Home from './pages/Home'
import HabitDashboard from './pages/HabitDashboard'
import ExpenseDashboard from './pages/ExpenseDashboard'
import './index.css';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/' element={
        <AuthGuard>
          <Home />
        </AuthGuard>
      } />

      <Route path='/habits' element={
        <AuthGuard>
          <HabitDashboard />
        </AuthGuard>
      } />

      <Route path='/expenses' element={
        <AuthGuard>
          <ExpenseDashboard />
        </AuthGuard>
      } />

      <Route path='/habits/habitform' element={
        <AuthGuard>
          <HabitForm />
        </AuthGuard>
      } />

      <Route path='/expenses/expenseform' element={
        <AuthGuard>
          <ExpenseForm />
        </AuthGuard>
      } />
    </Routes>
  );
}

export default App;
