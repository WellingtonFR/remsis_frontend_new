import React from "react";
import ReactDOM from "react-dom";
import "./css/normalize.css";
import "./css/classes.scss";
import "./css/patterns.scss";
import Routes from "./routes/routes";

ReactDOM.render(
  <React.StrictMode>
    <Routes />;
  </React.StrictMode>,
  document.getElementById("root")
);
