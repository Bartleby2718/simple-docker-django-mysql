import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CommentForm from "./CommentForm";
import Post from "./Post";

class PostPage extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Post id={this.props.id} />
        </Row>
        <Row>
          <CommentForm postId={this.props.id} />
        </Row>
      </Container>
    );
  }
}

export default PostPage;
