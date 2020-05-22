import React from "react";
import Category from "./Category";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      previousLink: null,
      nextLink: null,
      categories: [],
    };
  }

  handlePreviousClick = (e) => {
    this.setState({ currentPage: this.state.currentPage - 1 }, this.update);
  };

  handleNextClick = (e) => {
    this.setState({ currentPage: this.state.currentPage + 1 }, this.update);
  };

  update() {
    const page = this.state.currentPage;
    fetch(`http://localhost:8000/api/categories/?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(
        (response) => {
          this.setState({
            previousLink: response.previous,
            nextLink: response.next,
            categories: response.results,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  componentDidMount() {
    this.update();
  }

  render() {
    // previous page
    let previousButton;
    if (this.state.previousLink === null) {
      previousButton = null;
    } else {
      previousButton = (
        <Button onClick={this.handlePreviousClick}>
          {this.state.currentPage - 1}
        </Button>
      );
    }
    // next page
    let nextButton;
    if (this.state.nextLink === null) {
      nextButton = null;
    } else {
      nextButton = (
        <Button onClick={this.handleNextClick}>
          {this.state.currentPage + 1}
        </Button>
      );
    }
    const categories = this.state.categories;
    let categoryComponents;
    if (Array.isArray(categories) && categories.length) {
      categoryComponents = this.state.categories.map((category) => (
        <Category key={category.id} id={category.id} name={category.name} />
      ));
    }
    return (
      <div>
        <h2>Categories</h2>
        <ListGroup>{categoryComponents}</ListGroup>
        {previousButton}
        <Button disabled>{this.state.currentPage}</Button>
        {nextButton}
      </div>
    );
  }
}

export default CategoryList;
