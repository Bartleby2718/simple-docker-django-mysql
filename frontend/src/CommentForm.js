import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = { post: this.props.postId, text: this.state.text };
    fetch("http://localhost:8000/api/comments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(
        (response) => {
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <Form style={{ width: "100%" }} onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Control
            as="textarea"
            placeholder="What do you think?"
            onChange={this.handleTextChange}
            value={this.state.text}
            rows="3"
          ></Form.Control>
        </Form.Group>
        <Button style={{ float: "right" }} type="submit">
          Post Comment
        </Button>
      </Form>
    );
  }
}
export default CommentForm;
