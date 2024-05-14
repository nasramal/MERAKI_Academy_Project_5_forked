import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./Service/Redux/auth/Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider Store={Store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
