import React, { Component } from "react";
import { Card, Rating, Label } from "semantic-ui-react";
import DateFormatter from "../../utils/DateFormatter";
import ApiClient from "../../API/ApiClient";
import { withRouter } from "react-router-dom";

class HomeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddedWishlist: false
    };
  }

  handleFavButtonPress() {
    const wishListData = ApiClient.addAdToWishList(
      this.props.homeProducts.id,
      window.localStorage.getItem("userEmail")
    );
    wishListData.then(wishListData => {
      console.log("wishlist---", wishListData);
      if (wishListData) {
        this.setState({
          isAddedWishlist: !this.state.isAddedWishlist
        });
      }
    });
  }

  navigateToDetails() {
    console.log("homeItem", this.props.homeProducts.id);
    this.props.onItemSelected(this.props.homeProducts);
  }

  componentDidMount() {
    if (this.props.homeProducts.wishlisted !== 0) {
      this.setState({
        isAddedWishlist: true
      });
    }
  }

  render() {
    return (
      <Card
        style={{ cursor: "pointer", height: "fit-content", width: "270px" }}
      >
        <img
          style={{ height: "150px" }}
          alt="img not available"
          src={this.props.homeProducts.image_url}
        />
        <Card.Content onClick={this.navigateToDetails.bind(this)}>
          <Card.Header style={{ textAlign: "left" }}>
            {this.props.homeProducts.product_name}
          </Card.Header>
          <Card.Meta floated="left">
            <span style={{ float: "right", color: "black" }}>
              Posted On:
              {DateFormatter.getDateTime(this.props.homeProducts.time_stamp)}
            </span>
          </Card.Meta>
          <Label
            style={{
              float: "left",
              backgroundColor: "#37475A",
              color: "white",
              marginTop: "7px"
            }}
            icon="buysellads"
            content={this.props.homeProducts.action_name}
          />
        </Card.Content>
        <Card.Content extra style={{ textAlign: "left" }}>
          <Rating icon="star" defaultRating={3} maxRating={5} />
          <button
            onClick={this.handleFavButtonPress.bind(this)}
            style={{ float: "right" }}
            className="ui icon button"
          >
            <i
              aria-hidden="true"
              className={
                "heart icon " + (this.state.isAddedWishlist ? "red" : "")
              }
            />
          </button>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(HomeItem);
