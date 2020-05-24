import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleEmailChagne = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChagne = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    fetch("http://localhost:8000/api/auth-token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (response) => {
          Cookies.set("token", response.token);
          window.location = "/";
        },
        (error) => {
          console(error);
        }
      );
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email..."
            value={this.state.email}
            onChange={this.handleEmailChagne}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password..."
            value={this.state.password}
            onChange={this.handlePasswordChagne}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Log in</Button>
      </Form>
    );
  }
}
export default LoginForm;
