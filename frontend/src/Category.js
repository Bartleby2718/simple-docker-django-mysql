import React from "react";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: "",
    };
  }

  componentDidMount() {
    const id = this.state.id;
    fetch(`http://localhost:8000/api/categories/${id}/`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            name: result.name,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            name: "Error fetching name.",
          });
        }
      );
  }

  render() {
    const id = this.state.id;
    const name = this.state.name;
    return (
      <div>
        Category ID {id}: {name}
      </div>
    );
  }
}

export default Category;
