import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../lib/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const login = async () => {
    try {
      const res = await api.post('/auth/login', {email, password});

      localStorage.setItem('token', res.data.accessToken);
      console.log('passed login');
      navigate('/');
    } catch(err) {
      console.log(err)
      alert('Login Failed');
    }
  };
  

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome Back
      </h1>
      <input 
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input 
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button
        onClick={login} 
      >
        Login
      </button>

    </div> 
  )

}

export default Login;