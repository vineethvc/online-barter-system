import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import "./Product_table.css";

class Product_table extends Component {
  render() {
    return (
      <>
        <div className="tbl">
          <table border="1px">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>....</td>
                <td>...</td>
                <td>....</td>
                <td>
                  <Button>Delete</Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>....</td>
                <td>...</td>
                <td>....</td>
                <td>
                  <Button>Delete</Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>....</td>
                <td>...</td>
                <td>....</td>
                <td>
                  <Button>Delete</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Product_table;
