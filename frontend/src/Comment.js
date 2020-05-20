import React from "react";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      text: "",
    };
  }

  componentDidMount() {
    const id = this.state.id;
    fetch(`http://localhost:8000/api/comments/${id}/`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            text: result.text,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            text: "Error fetching text.",
          });
        }
      );
  }

  render() {
    const text = this.state.text;
    return (
      <div>
        {this.state.id}: {text}
      </div>
    );
  }
}

export default Comment;
