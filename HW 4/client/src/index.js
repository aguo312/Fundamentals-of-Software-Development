// import React from "react";
// import ReactDOM, { render } from "react-dom";
// import "./index.css";
// import FakeStackOverflow from "./components/fakestackoverflow.js";

// ReactDOM.render(
//   <FakeStackOverflow />,
//   document.getElementById('root')
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import FakeStackOverflow from "./components/fakestackoverflow.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FakeStackOverflow />
  </React.StrictMode>
);
