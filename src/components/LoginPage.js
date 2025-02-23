// // src/components/LoginPage.js
// import React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

// const LoginPage = () => {
//   const { loginWithRedirect } = useAuth0();

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="p-8 bg-white rounded shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Login</h1>
//         <button
//           onClick={() => loginWithRedirect()}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Log In
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#000000' }}>
      <div className="p-8 rounded shadow-md" style={{ backgroundColor: '#6f727b' }}>
        <h1 className="text-2xl font-bold mb-4" style={{ color: '#daaa00' }}>
          Login
        </h1>
        <button
          onClick={() => loginWithRedirect()}
          className="py-2 px-4 rounded font-bold"
          style={{ backgroundColor: '#daaa00', color: '#000000' }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

