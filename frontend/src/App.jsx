import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
