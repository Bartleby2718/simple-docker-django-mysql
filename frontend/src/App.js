import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Category from "./Category";
import CategoryCreateForm from "./CategoryCreateForm";
import CategoryList from "./CategoryList";
import Post from "./Post";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/categories">
            <CategoryList />
          </Route>
          <Route path="/">
            <CategoryList></CategoryList>
            <CategoryCreateForm />
            <Category id={1} />
            <Category id={2} />
            <Post id={1} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
