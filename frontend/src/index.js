import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const auth0Audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const RootComponent = () => {
  if (!auth0Domain || !auth0ClientId || !auth0Audience) {
    console.error("Missing Auth0 environment variables!");
    return <h1>Error: Missing Auth0 configuration.</h1>;
  }

  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: auth0Audience,
      }}
    >
      <App />
    </Auth0Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);
