import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  ERROR_COUNT: 6
};

ReactDOM.render(
    <App
      errorsCount = {Settings.ERROR_COUNT}
    />,
    document.querySelector(`#root`)
);
