import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FakeStackOverflow from "./components/fakestackoverflow.js";
import Model from "./models/model";

ReactDOM.render(
  <FakeStackOverflow data={new Model().data} />,
  document.getElementById("root")
);
