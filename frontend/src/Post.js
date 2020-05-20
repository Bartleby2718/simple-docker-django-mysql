import React from "react";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: "",
      text: "",
      category: null,
    };
  }

  componentDidMount() {
    const id = this.state.id;
    fetch(`http://localhost:8000/api/posts/${id}/`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            title: result.title,
            text: result.text,
            category: result.category,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            title: "Error fetching title.",
            text: "Error fetching text.",
            category: null,
          });
        }
      );
  }

  render() {
    const id = this.state.id;
    const title = this.state.title;
    const text = this.state.text;
    const category = this.state.category;
    return (
      <div>
        <div>In category {category}</div>
        <div>ID: {id}</div>
        <div>Title: {title}</div>
        <div>Text: {text}</div>
      </div>
    );
  }
}

export default Post;
