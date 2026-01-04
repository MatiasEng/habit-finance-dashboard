import Navigation from '../ui/Navigation';
import { Outlet } from 'react-router-dom';

function Layout() {

  return (
    <div>
      <Navigation className='min-h-screen bg-gray-50' />
      <main className='pt-20 md:pt-16 max-w-7xl mx-auto px-4 py-'>
        <Outlet />
      </main>
    </div>

  );
}

export default Layout;

