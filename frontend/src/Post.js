import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Comment from "./Comment";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: "",
      text: "",
      categoryId: null,
      categoryName: null,
      comments: [],
    };
  }

  componentDidMount() {
    const id = this.state.id;
    fetch(`http://localhost:8000/api/posts/${id}/`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            title: result.title,
            text: result.text,
            categoryId: result.category.id,
            categoryName: result.category.name,
            comments: result.comments,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            title: "Error fetching title.",
            text: "Error fetching text.",
            category: null,
          });
        }
      );
  }

  render() {
    let comments = this.state.comments.map((comment) => (
      <Comment key={comment.id} id={comment.id} text={comment.text} />
    ));
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          {"In "}
          <Link to={`/categories/${this.state.categoryId}`}>
            <i>{this.state.categoryName}</i>
          </Link>
          {this.state.category}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Link to={`/posts/${this.state.id}`}>{this.state.title}</Link>
          </Card.Title>
          <Card.Text>{this.state.text}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">{comments}</ListGroup>
      </Card>
    );
  }
}

export default Post;
