import React from "react";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
    };
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
