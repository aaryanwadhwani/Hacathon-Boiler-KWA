import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedAPIButton = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const callProtectedEndpoint = async () => {
        try {
            const token = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH0_AUDIENCE,
            });

            const response = await fetch('http://localhost:4999/api/protected', { // Use port 4999
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log('Protected API Response:', data);
            alert(`Response from API: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error('Error accessing protected API:', error);
            alert('Failed to fetch protected API.');
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <button onClick={callProtectedEndpoint}>Call Protected API</button>
            ) : (
                <p>You need to log in to access this feature.</p>
            )}
        </div>
    );
};

export default ProtectedAPIButton;
