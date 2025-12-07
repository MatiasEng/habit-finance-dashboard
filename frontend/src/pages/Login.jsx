import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import api from '../lib/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePswdVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });

      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      console.log(res)
      navigate('/');
    } catch (err) {
      console.log(err)
      alert('Login Failed');
    }
  };


  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Welcome Back
      </h1>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:placeholder-transparent"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='example@gmail.com'
            type='email'
          />
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:placeholder-transparent"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='******'
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type='button'
              className="absolute inset-y-0 right-0 pt-4 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={togglePswdVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />

              )}
            </button>
          </div>

          <button
            className="bg-blue-500 text-white font-bold rounded-md px-2 py-2 hover:bg-blue-600 transition-colors"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </>
  )

}

export default Login;
