import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CategoryCreateForm from "./CategoryCreateForm";
import CategoryList from "./CategoryList";
import PostPage from "./PostPage";
import PostForm from "./PostForm";
import PostList from "./PostList";

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
        <CategoryList />
        <Switch>
          <Route
            path="/categories/:id"
            component={(props) => (
              <PostList
                key={props.match.params.id}
                categoryId={props.match.params.id}
                page={1}
              />
            )}
          />
          <Route path="/categories/">
            <h3>Please select a category.</h3>
          </Route>
          <Route path="/posts/new">
            <PostForm />
          </Route>
          <Route
            path="/posts/:id"
            component={(props) => (
              <PostPage
                key={props.match.params.id}
                id={props.match.params.id}
              />
            )}
          />
          <Route path="/">
            <CategoryCreateForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
