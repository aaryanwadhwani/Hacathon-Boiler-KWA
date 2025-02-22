import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
// index.js
//import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./styles.css";

// Configure Auth0Provider using your environment variables.
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}  // Redirects back to HomePage after login
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
