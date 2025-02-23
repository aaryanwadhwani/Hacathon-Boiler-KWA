// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Home, Upload, Search } from 'lucide-react';

// function Navbar() {
//   return (
//     <nav className="bg-blue-600 p-4 text-white shadow-md">
//       <div className="container mx-auto flex items-center justify-between">
//         <Link to="/" className="flex items-center text-lg font-semibold">
//           <Home className="mr-2" size={20} />
//           ATS Resume Reviewer
//         </Link>
//         <div className="flex items-center space-x-4">
//           <Link to="/resume-analysis" className="hover:text-blue-200">
//             <Upload className="mr-1 inline-block" size={16} />
//             Resume Analysis
//           </Link>
//           <Link to="/job-matching" className="hover:text-blue-200">
//             <Search className="mr-1 inline-block" size={16} />
//             Job Matching
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// // Navbar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Home, Upload, Search } from 'lucide-react';
// import { useAuth0 } from '@auth0/auth0-react';

// function Navbar() {
//   const { isAuthenticated, logout } = useAuth0();

//   return (
//     <nav className="bg-black-600 p-4 text-yellow shadow-md">
//       <div className="container mx-auto flex items-center justify-between">
//         <Link to="/" className="flex items-center text-lg font-semibold">
//           <Home className="mr-2" size={20} />
//           ATS Resume Reviewer
//         </Link>
//         <div className="flex items-center space-x-4">
//           <Link to="/resume-analysis" className="hover:text-blue-200">
//             <Upload className="mr-1 inline-block" size={16} />
//             Resume Analysis
//           </Link>
//           <Link to="/job-matching" className="hover:text-blue-200">
//             <Search className="mr-1 inline-block" size={16} />
//             Job Matching
//           </Link>
//           {isAuthenticated && (
//             <button
//               onClick={() => logout({ returnTo: window.location.origin + '/login' })}
//               className="hover:text-blue-200 font-semibold"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Upload, Search } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

function Navbar() {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <nav className="p-4 shadow-md" style={{ backgroundColor: '#ddb945' }}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <Link to="/" className="flex items-center text-xl font-bold" style={{ color: '#000000' }}>
          <Home className="mr-2" size={24} />
          ATS Resume Reviewer
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/resume-analysis"
            className="flex items-center font-semibold transition-colors"
            style={{ color: '#000000' }}
          >
            <Upload className="mr-1" size={20} />
            ATS Scanner
          </Link>
          <Link
            to="/job-matching"
            className="flex items-center font-semibold transition-colors"
            style={{ color: '#000000' }}
          >
            <Search className="mr-1" size={20} />
            Job Matching
          </Link>

          {isAuthenticated && (
            <button
              onClick={() => logout({ returnTo: window.location.origin + '/login' })}
              className="font-bold transition-colors"
              style={{ color: '#000000' }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
