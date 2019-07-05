import React, { Component } from "react";
import { Form} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Product.css";

class Product extends Component {
  render() {
    return (
      <div className="Header">
        <h1>Land zone</h1>
        <div className="FormCenter">
          <Form onSubmit={this.handleSubmit}>
            <h1>Product ID</h1>
            <Form.Input
              className="input-field"
              name="Product ID"
              placeholder="product ID"
              type="text"
            />
          </Form>
        </div>

        <div className="FormCenter">
          <Form onSubmit={this.handleSubmit}>
            <h1>Product Name</h1>
            <Form.Input
              className="input-field"
              name="Product Name"
              placeholder="product name"
              type="text"
            />
          </Form>
        </div>
        <div className="FormCenter">
          <Form onSubmit={this.handleSubmit}>
            <h1>Product Category</h1>
            <Form.Input
              className="input-field"
              name="Product Category"
              placeholder="product category"
              type="text"
            />
          </Form>
        </div>
        <div className="FormCenter">
          <Form onSubmit={this.handleSubmit}>
            <h1>Product Discription</h1>
            <Form.Input
              className="input-field"
              name="Product Discription"
              placeholder="product discription"
              type="text"
            />
          </Form>
        </div>
        <div className="btn">
          <Link to="/submit">
            <h3>Submit</h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default Product;
