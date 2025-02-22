import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-8">
      <p className="text-gray-600">© {new Date().getFullYear()} ATS Resume Reviewer. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
