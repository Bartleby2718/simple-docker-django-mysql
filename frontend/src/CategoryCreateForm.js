import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class CategoryCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();
    const data = { name: this.state.name };
    fetch("http://localhost:8000/api/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState(
            {
              name: result.name,
            },
            () => {
              window.location.reload();
            }
          );
        },
        (error) => {
          console.log(error);
          this.setState({
            name: "Error fetching name.",
          });
        }
      );
  };

  render() {
    return (
      <Form>
        <Form.Group controlId="formNewCategory">
          <Form.Label>New category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the name of a new category..."
            maxLength="50"
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted">50 characters max</Form.Text>
        </Form.Group>
        <Button type="submit" onClick={this.handleClick}>
          Create
        </Button>
      </Form>
    );
  }
}

export default CategoryCreateForm;
