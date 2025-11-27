import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HabitForm from './pages/HabitForm';
import ExpenseForm from './pages/ExpenseForm';
import AuthGuard from './components/AuthGuard';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>

      <Route path='/' element={
        <AuthGuard>
          <Dashboard/>
        </AuthGuard>
      }/>

      <Route path='/habitform' element={
        <AuthGuard>
          <HabitForm/>
        </AuthGuard>
      }/>

      <Route path='/expenseform' element={
        <AuthGuard>
          <ExpenseForm/>
        </AuthGuard>
      }/>
    </Routes>
  );
}

export default App;
