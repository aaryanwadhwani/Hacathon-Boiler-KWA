import React from 'react';
import { Link } from 'react-router-dom';
import { AlignHorizontalJustifyCenter, Upload, BarChart2, LogOut, UserRoundCog } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full shadow-md z-50 bg-green-500 py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center text-xl font-bold text-black transition-transform transform hover:scale-105 duration-300"
          >
            <AlignHorizontalJustifyCenter className="mr-2" size={28} />
            Alignify
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            
            {/* About Us - Fixed Alignment */}
            <Link 
              to="/about" 
              className="flex items-center font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105 hover:bg-green-400 text-black"
            >
              <UserRoundCog className="mr-2" size={18} /> 
              About Us
            </Link>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/resume-analysis"
                  className="flex items-center font-semibold px-4 py-2 rounded-lg transition-all transform hover:scale-105 hover:bg-green-400 text-black"
                >
                  <Upload className="mr-2" size={18} />
                  ATS Scanner
                </Link>

                <Link 
                  to="/dashboard"
                  className="flex items-center font-semibold px-4 py-2 rounded-lg transition-all transform hover:scale-105 hover:bg-green-400 text-black"
                >
                  <BarChart2 className="mr-2" size={18} />
                  Dashboard
                </Link>

                <button
                  onClick={() => logout({ returnTo: window.location.origin + '/login' })}
                  className="flex items-center font-bold px-4 py-2 rounded-lg transition-all transform hover:scale-105 hover:bg-red-500 text-black"
                >
                  <LogOut className="mr-2" size={18} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="flex items-center font-bold px-4 py-2 rounded-lg transition-all transform hover:scale-105 hover:bg-green-600 text-black"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Add Padding to Prevent Overlapping Content */}
      <div className="pt-20"></div>
    </>
  );
}

export default Navbar;
