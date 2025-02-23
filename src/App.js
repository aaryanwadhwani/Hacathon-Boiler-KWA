// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import ResumeAnalysisPage from './components/ResumeAnalysisPage';
// import JobMatchingPage from './components/JobMatchingPage';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen bg-gray-50">
//         <Navbar />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
//             <Route path="/job-matching" element={<JobMatchingPage />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import ResumeAnalysisPage from './components/ResumeAnalysisPage';
// import JobMatchingPage from './components/JobMatchingPage';
// import LoginPage from './components/LoginPage'; // Import the login page
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen bg-gray-50">
//         <Navbar />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/resume-analysis" element={<ResumeAnalysisPage />} />
//             <Route path="/job-matching" element={<JobMatchingPage />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import HomePage from './components/HomePage';
import ResumeAnalysisPage from './components/ResumeAnalysisPage';
import JobMatchingPage from './components/JobMatchingPage';
import AnalysisHistory from './components/AnalysisHistory';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/resume-analysis" element={<ProtectedRoute><ResumeAnalysisPage /></ProtectedRoute>} />
            <Route path="/job-matching" element={<ProtectedRoute><JobMatchingPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><AnalysisHistory /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
