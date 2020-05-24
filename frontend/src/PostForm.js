import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageToLoad: 1,
      hasNext: true,
      categories: [],
      category: "",
      title: "",
      text: "",
    };
  }

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  loadMoreCategories = () => {
    if (!this.state.hasNext) return;
    const page = this.state.pageToLoad;
    fetch(`http://localhost:8000/api/categories/?page=${page}`)
      .then((response) => response.json())
      .then(
        (response) => {
          const additional = response.results;
          const concatenated = this.state.categories.concat(additional);
          this.setState(
            {
              pageToLoad: page + 1,
              hasNext: response.next !== null,
              categories: concatenated,
            },
            () => {
              this.loadMoreCategories();
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      category_id: this.state.category,
      title: this.state.title,
      text: this.state.text,
    };
    fetch("http://localhost:8000/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (response) => {
          window.location = `http://localhost:3000/posts/${response.id}/`;
        },
        (error) => {
          console.log(error);
        }
      );
  };

  componentDidMount = () => {
    this.loadMoreCategories();
  };

  render() {
    let options = this.state.categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
    return (
      <Form style={{ width: "20rem" }} onSubmit={this.handleSubmit}>
        <h2>Write a Post</h2>
        <Form.Group>
          <Form.Control
            as="select"
            name="category"
            value={this.state.category}
            onChange={this.handleCategoryChange}
            required
          >
            <option value="" hidden>
              Choose category
            </option>
            {options}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="text"
            as="textarea"
            placeholder="What's on your mind?"
            value={this.state.text}
            onChange={this.handleTextChange}
            required
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Post</Button>
      </Form>
    );
  }
}

export default PostForm;
