import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

class CategoryUpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const data = { name: this.state.name };
    fetch(`http://localhost:8000/api/categories/${this.props.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(
        (response) => {
          this.setState({ name: response.name }, () => {
            window.location.reload();
          });
        },
        (error) => {
          console.log(error);
        }
      )
      .then(this.props.handleClose);
  };

  render() {
    return (
      <Modal show={this.props.showingModal} onHide={this.props.handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Update category name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>How would you rename this category?</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
              maxLength="50"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button type="submit" onClick={this.handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default CategoryUpdateModal;
