import { Navigate } from 'react-router-dom';

function AuthGuard({ children }) {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken && !refreshToken) {
    return <Navigate
      to='/login'
      replace
    />
  }

  return children;

}

export default AuthGuard;
