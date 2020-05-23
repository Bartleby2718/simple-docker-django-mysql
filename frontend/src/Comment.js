import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

class Comment extends React.Component {
  render() {
    return <ListGroup.Item>{this.props.text}</ListGroup.Item>;
  }
}

export default Comment;
