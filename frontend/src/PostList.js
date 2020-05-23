import React from "react";
import Button from "react-bootstrap/Button";
import Post from "./Post";

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: props.categoryId,
      page: props.page,
      hasPrevious: false,
      hasNext: false,
      posts: [],
    };
  }

  getPosts = () => {
    let url = new URL("http://localhost:8000/api/posts/");
    let params = { category: this.props.categoryId, page: this.state.page };
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then((response) => response.json())
      .then(
        (response) => {
          this.setState({
            hasPrevious: response.previous !== null,
            hasNext: response.next !== null,
            posts: Array.isArray(response.results) ? response.results : [],
          });
        },
        (error) => {
          this.setState({ posts: [] });
        }
      );
  };

  componentDidMount = () => {
    this.getPosts();
  };

  goToPreviousPage = (e) => {
    this.setState({ page: this.state.page - 1 }, () => {
      this.getPosts();
    });
  };

  goToNextPage = (e) => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.getPosts();
    });
  };

  render() {
    let previousButton = this.state.hasPrevious ? (
      <Button variant="outline-primary" onClick={this.goToPreviousPage}>
        Go to the previous page
      </Button>
    ) : null;
    let nextButton = this.state.hasNext ? (
      <Button variant="outline-primary" onClick={this.goToNextPage}>
        Go to the next page
      </Button>
    ) : null;
    let posts = this.state.posts.map((post) => (
      <Post key={post.id} id={post.id} />
    ));
    return (
      <div>
        {posts}
        {previousButton}
        {nextButton}
      </div>
    );
  }
}
