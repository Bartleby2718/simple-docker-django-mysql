import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      passwordsMatch: false,
      startedTypingPassword: false,
      startedTypingPassword2: false,
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
      passwordsMatch: e.target.value === this.state.password2,
      startedTypingPassword: true,
    });
  };

  handlePassword2Change = (e) => {
    this.setState({
      password2: e.target.value,
      passwordsMatch: this.state.password === e.target.value,
      startedTypingPassword2: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    fetch("http://localhost:8000/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  render() {
    let confirmPasswordMessage = this.state.passwordsMatch ? (
      <Form.Text style={{ color: "green" }}>The two passwords match.</Form.Text>
    ) : (
      <Form.Text style={{ color: "red" }}>
        The two passwords don't match.
      </Form.Text>
    );

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h2>Sign up with email</h2>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email..."
              value={this.state.email}
              onChange={this.handleEmailChange}
              maxLength={254}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password..."
              value={this.state.password}
              onChange={this.handlePasswordChange}
              maxLength={100}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password again..."
              value={this.state.password2}
              onChange={this.handlePassword2Change}
              maxLength={100}
              required
            />
            {this.state.startedTypingPassword &&
            this.state.startedTypingPassword2
              ? confirmPasswordMessage
              : null}
          </Form.Group>
          <Button type="submit">Sign up</Button>
        </Form>
      </Container>
    );
  }
}

export default SignUpForm;
