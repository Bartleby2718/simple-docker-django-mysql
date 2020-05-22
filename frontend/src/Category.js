import React from "react";
import Button from "react-bootstrap/Button";
import CategoryUpdateModal from "./CategoryUpdateModal";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: "",
      showingModal: false,
    };
  }
  getCategoryData = (id) => {
    fetch(`http://localhost:8000/api/categories/${id}/`)
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          id: response.id,
          name: response.name,
        });
      });
  };
  componentWillReceiveProps(newProps) {
    this.getCategoryData(newProps.id);
  }

  componentDidMount = () => {
    this.getCategoryData(this.state.id);
  };

  handleShow = (e) => {
    this.setState({ showingModal: true });
  };

  handleClose = (e) => {
    this.setState({ showingModal: false });
  };

  handleDelete = (id) => {
    fetch(`http://localhost:8000/api/categories/${id}/`, {
      method: "DELETE",
    }).then(window.location.reload());
  };

  render() {
    const id = this.state.id;
    const name = this.state.name;
    return (
      <ListGroup.Item style={{ width: "40rem" }}>
        <Link to={`/categories/${this.state.id}`}>
          <Button variant="Light" style={{ width: "20rem" }}>
            <h5>{name}</h5>
          </Button>
        </Link>
        <Button variant="info" onClick={this.handleShow}>
          Update name
        </Button>
        <Button
          variant="danger"
          onClick={(e) => {
            this.handleDelete(id);
          }}
        >
          Delete
        </Button>
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
