import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import CategoryUpdateModal from "./CategoryUpdateModal";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      showingModal: false,
    };
  }

  getCategoryData = () => {
    fetch(`http://localhost:8000/api/categories/${this.state.id}/`)
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          id: response.id,
          name: response.name,
        });
      });
  };

  componentDidMount = () => {
    this.getCategoryData();
  };

  handleShow = (e) => {
    this.setState({ showingModal: true });
  };

  handleClose = (e) => {
    this.setState({ showingModal: false });
  };

  handleDelete = () => {
    fetch(`http://localhost:8000/api/categories/${this.state.id}/`, {
      method: "DELETE",
    }).then(window.location.reload());
  };

  render() {
    const id = this.state.id;
    const name = this.state.name;
    return (
      <ListGroup.Item style={{ width: "30rem" }}>
        <Link to={`/categories/${id}`}>
          <Button variant="Light" style={{ width: "25rem" }}>
            <h5>{name}</h5>
          </Button>
        </Link>

        <DropdownButton
          title=""
          variant="outline-primary"
          style={{ display: "inline-block" }}
        >
          <Dropdown.Item onClick={this.handleShow}>Rename</Dropdown.Item>
          <Dropdown.Item onClick={this.handleDelete}>Delete</Dropdown.Item>
        </DropdownButton>

        <CategoryUpdateModal
          id={id}
          name={name}
          showingModal={this.state.showingModal}
          handleClose={this.handleClose}
        ></CategoryUpdateModal>
      </ListGroup.Item>
    );
  }
}

export default Category;
