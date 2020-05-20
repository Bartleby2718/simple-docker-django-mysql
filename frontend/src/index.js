import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Category from "./Category";
import Post from "./Post";
import Comment from "./Comment";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Category id="1" />
    <Category id="2" />
    <Post id="1" />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
