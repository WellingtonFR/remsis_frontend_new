import React from "react";
import ReactDOM from "react-dom/client";
import "./css/normalize.css";
import "./css/classes.scss";
import "./css/patterns.scss";
import "./css/forms.scss";
import "./css/buttons.scss";
import "./css/modal.scss";
import "./css/search.scss";
import "./css/table.scss";
import App from "./routes/routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />;
  </React.StrictMode>
);
