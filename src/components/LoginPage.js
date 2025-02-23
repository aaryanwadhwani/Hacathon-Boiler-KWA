import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogIn, Upload, BarChart3, ChevronDown } from 'lucide-react';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const [animateStep, setAnimateStep] = useState([false, false, false]); // State for animation steps

  // Trigger animations sequentially
  useEffect(() => {
    setTimeout(() => setAnimateStep([true, false, false]), 300); // Step 1 appears first
    setTimeout(() => setAnimateStep([true, true, false]), 800); // Step 2 appears after 500ms
    setTimeout(() => setAnimateStep([true, true, true]), 1300); // Step 3 appears after another 500ms
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-24"
         style={{ background: 'linear-gradient(to bottom, #f5fff5, #d5f5e3)' }}>
      
      <div className="flex items-center justify-center space-x-24 max-w-6xl w-full px-8">
        
        {/* Glassmorphic Login Card - Slightly Left */}
        <div className="p-14 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl text-center transition-transform transform hover:scale-105 duration-300 w-1/2">
          <h1 className="text-5xl font-extrabold mb-8 text-green-700">Welcome to Alignify</h1>
          <p className="text-gray-700 mb-8 text-xl">Unlock the full potential of your resume with AI insights.</p>
          <button
            onClick={() => loginWithRedirect()}
            className="px-8 py-3 bg-green-700 text-white font-bold rounded-lg transition-all hover:bg-green-800 hover:shadow-lg text-lg"
          >
            Get Started
          </button>
        </div>

        {/* Animated Flowchart - Right */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center uppercase tracking-widest">
            How It Works
          </h2>

          <div className="space-y-8 relative w-full">
            {/* Step 1 */}
            <div className={`flex items-center bg-white rounded-3xl p-6 shadow-xl transition-all duration-700 ease-out transform 
                            hover:scale-105 hover:shadow-2xl cursor-pointer ${animateStep[0] ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              <LogIn className="text-green-700 w-14 h-14 mr-6" />
              <div>
                <h3 className="font-semibold text-green-800 text-xl">1. Login</h3>
                <p className="text-gray-600 text-lg">Sign in securely to access your dashboard.</p>
              </div>
            </div>

            {/* Animated Arrow */}
            <ChevronDown className={`text-green-500 w-8 h-8 mx-auto transition-all duration-500 ease-out 
                                    hover:translate-y-2 ${animateStep[1] ? 'opacity-100' : 'opacity-0'}`} />

            {/* Step 2 */}
            <div className={`flex items-center bg-white rounded-3xl p-6 shadow-xl transition-all duration-700 ease-out transform 
                            hover:scale-105 hover:shadow-2xl cursor-pointer ${animateStep[1] ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              <Upload className="text-green-700 w-14 h-14 mr-6" />
              <div>
                <h3 className="font-semibold text-green-800 text-xl">2. Upload</h3>
                <p className="text-gray-600 text-lg">Submit your resume for AI-powered analysis.</p>
              </div>
            </div>

            {/* Animated Arrow */}
            <ChevronDown className={`text-green-500 w-8 h-8 mx-auto transition-all duration-500 ease-out 
                                    hover:translate-y-2 ${animateStep[2] ? 'opacity-100' : 'opacity-0'}`} />

            {/* Step 3 */}
            <div className={`flex items-center bg-white rounded-3xl p-6 shadow-xl transition-all duration-700 ease-out transform 
                            hover:scale-105 hover:shadow-2xl cursor-pointer ${animateStep[2] ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              <BarChart3 className="text-green-700 w-14 h-14 mr-6" />
              <div>
                <h3 className="font-semibold text-green-800 text-xl">3. Improve</h3>
                <p className="text-gray-600 text-lg">Get AI-driven insights to refine your resume.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
