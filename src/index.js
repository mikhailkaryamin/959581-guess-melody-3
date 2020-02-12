import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import questions from "./mocks/questions.js";

const Settings = {
  ERROR_COUNT: 3
};

ReactDOM.render(
    <App
      errorsCount = {
        Settings.ERROR_COUNT
      }
      questions = {
        questions
      }
    />,
    document.querySelector(`#root`)
);
