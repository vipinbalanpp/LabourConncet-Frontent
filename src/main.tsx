import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="710962240336-jgfc85vv8csduluafpmjtu1nqsnckpfh.apps.googleusercontent.com">
        <Router>
          <App />
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
