import React from 'react';
import { Link } from 'react-router-dom';
import { AlignHorizontalJustifyCenter, Upload, BarChart2, Power } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <nav className="fixed top-0 w-full p-4 shadow-md z-50" style={{ backgroundColor: '#58d68d' }}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <Link 
          to="/" 
          className="flex items-center text-xl font-bold transition-transform transform hover:scale-105 duration-300" 
          style={{ color: '#000000' }}
        >
          <AlignHorizontalJustifyCenter className="mr-2" size={36} />
          Alignify
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-6">
          {isAuthenticated && (
            <>
              <Link 
                to="/resume-analysis" 
                className="flex items-center font-semibold px-3 py-2 rounded-lg transition-all transform hover:scale-105 hover:text-white hover:bg-green-300 duration-300 ease-in-out"
                style={{ color: '#000000' }}
              >
                <Upload className="mr-1" size={20} />
                ATS Scanner
              </Link>

              <Link 
                to="/dashboard" 
                className="flex items-center font-semibold px-3 py-2 rounded-lg transition-all transform hover:scale-105 hover:text-white hover:bg-green-300 duration-300 ease-in-out"
                style={{ color: '#000000' }}
              >
                <BarChart2 className="mr-1" size={20} />
                Dashboard
              </Link>

              <button
                onClick={() => logout({ returnTo: window.location.origin + '/login' })}
                className="flex items-center font-bold px-3 py-2 rounded-lg transition-all transform hover:scale-105 hover:text-white hover:bg-red-500 duration-300 ease-in-out"
                style={{ color: '#000000' }}
              >
                <Power className="mr-1" size={20} />
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <button
              onClick={() => loginWithRedirect()}
              className="flex items-center font-bold px-3 py-2 rounded-lg transition-all transform hover:scale-105 hover:text-white hover:bg-green-500 duration-300 ease-in-out"
              style={{ color: '#000000' }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
