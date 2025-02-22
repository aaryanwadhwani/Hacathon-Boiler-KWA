import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Upload, Search } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center text-lg font-semibold">
          <Home className="mr-2" size={20} />
          ATS Resume Reviewer
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/resume-analysis" className="hover:text-blue-200">
            <Upload className="mr-1 inline-block" size={16} />
            Resume Analysis
          </Link>
          <Link to="/job-matching" className="hover:text-blue-200">
            <Search className="mr-1 inline-block" size={16} />
            Job Matching
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
