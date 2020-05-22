import React from "react";
import Button from "react-bootstrap/Button";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
    };
  }

  handleDelete = (id) => {
    fetch(`http://localhost:8000/api/categories/${id}/`, {
      method: "DELETE",
    }).then(window.location.reload());
  };

  render() {
    const id = this.state.id;
    const name = this.state.name;
    return (
      <div>
        Category ID {id}: {name}
        <Button
          variant="danger"
          onClick={(e) => {
            this.handleDelete(id);
          }}
        >
          Delete
        </Button>
      </div>
    );
  }
}

export default Category;
