import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedAPIButton from './components/ProtectedAPIButton'; // Import the API button

const App = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>ATS Resume Reviewer</h1>
            
            {!isAuthenticated ? (
                <button onClick={() => loginWithRedirect()}>Log In</button>
            ) : (
                <>
                    <h2>Welcome, {user?.name}</h2>
                    <button onClick={() => logout({ returnTo: window.location.origin })}>
                        Log Out
                    </button>
                    <ProtectedAPIButton /> {/* Add the Protected API Button */}
                </>
            )}
        </div>
    );
};

export default App;
