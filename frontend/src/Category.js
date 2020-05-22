import React from "react";
import Button from "react-bootstrap/Button";
import CategoryUpdateModal from "./CategoryUpdateModal";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingModal: false,
    };
  }

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
    const id = this.props.id;
    const name = this.props.name;
    return (
      <div>
        Category ID {id}: {name}
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
      </div>
    );
  }
}

export default Category;
