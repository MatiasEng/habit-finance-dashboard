import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import HabitForm from './pages/HabitForm';
import ExpenseForm from './pages/ExpenseForm';
import AuthGuard from './components/AuthGuard';
import Home from './pages/Home'
import HabitDashboard from './pages/HabitDashboard'
import ExpenseDashboard from './pages/ExpenseDashboard'

import ExpenseDetails from './components/expenses/ExpenseDetails'
import HabitDetails from './components/habits/HabitDetails'

import ExpenseEdit from './components/expenses/ExpenseEdit.jsx'
import HabitEdit from './components/habits/HabitEdit'

import Profile from './pages/Profile'
import ProfileEdit from './components/EditProfile'
import ChangePassword from './components/ChangePassword'

import './index.css';

function App() {
  return (
    <Routes>
      {/* General Routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/' element={
        <AuthGuard>
          <Home />
        </AuthGuard>
      } />
      <Route path='/profile' element={
        <AuthGuard>
          <Profile />
        </AuthGuard>
      } />
      <Route path='/profile/edit' element={
        <AuthGuard>
          <ProfileEdit />
        </AuthGuard>
      } />
      <Route path='/profile/changepassword' element={
        <AuthGuard>
          <ChangePassword />
        </AuthGuard>
      } />

      {/* Habits Routes */}
      <Route path='/habits' element={
        <AuthGuard>
          <HabitDashboard />
        </AuthGuard>
      } />

      <Route path='/habits/habitform' element={
        <AuthGuard>
          <HabitForm />
        </AuthGuard>
      } />

      <Route path='/habits/:id' element={
        <AuthGuard>
          <HabitDetails />
        </AuthGuard>
      } />

      <Route path='/habits/edit/:id' element={
        <AuthGuard>
          <HabitEdit />
        </AuthGuard>
      } />

      {/* Expenses Routes */}
      <Route path='/expenses' element={
        <AuthGuard>
          <ExpenseDashboard />
        </AuthGuard>
      } />

      <Route path='/expenses/expenseform' element={
        <AuthGuard>
          <ExpenseForm />
        </AuthGuard>
      } />

      <Route path='/expenses/:id' element={
        <AuthGuard>
          <ExpenseDetails />
        </AuthGuard>
      } />

      <Route path='/expenses/edit/:id' element={
        <AuthGuard>
          <ExpenseEdit />
        </AuthGuard>
      } />

    </Routes>
  );
}

export default App;
