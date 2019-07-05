import React, { Component } from "react";
import { Icon, Header } from "semantic-ui-react";
import {withRouter} from "react-router-dom";

class MenuItems extends Component {

  state ={
    username: localStorage.getItem("userEmail")
  }

  style = {
    container: {
      borderColor: "#000000",
      backgroundColor: "transparent",
      position: "relative",
      top: "auto",
      bottom: "auto",
      right: "auto",
      left: "auto",
      display: "flex",
      flexDirection: "row",
      flex: "none",
      alignItems: "stretch",
      justifyContent: "flex-start",
      cursor: "default",
      height: "100%"
    },
    menuItems: {
      background: "#232f3e",
      display: "flex",
      flex: "none",
      alignItems: "stretch",
      justifyContent: "flex-start",
      flexDirection: "column",
      minWidth: "300px",
      height: "100%",
      padding: "25px"
    },
    menuUserIcon: {
      alignSelf: "center"
    },
    menuOptions: {
      alignSelf: "flex-start",
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      cursor: "pointer"
    }
  };

  handleLogoutPress() {
    localStorage.clear();
    this.props.history.push({
      pathname: '/signin'
    })
  }

  goToProfile(){
    this.props.history.push({
      pathname: '/userprofile'
    })
  }

  goToBarter(){
    this.props.history.push({
      pathname: '/barter'
    })
  }

  goToCreateAd(){
    this.props.history.push({
      pathname: '/createAd'
    })
  }

  goToWishList(){
    this.props.history.push({
      pathname: '/wishlist'
    })
  }

  goToMyAds(){
    this.props.history.push({
      pathname: '/myads'
    })
  }

  render() {
    return (
      <div style={this.style.container}>
        <div style={this.style.menuItems}>
          <Icon
            style={this.style.menuUserIcon}
            name="user"
            size="huge"
            color="orange"
          />
          <Header style={this.style.menuUserIcon} color="orange" as="h3">
            {this.state.username}
          </Header>
          <div style={this.style.menuOptions}
               onClick={this.goToProfile.bind(this)}>
            <Icon size="large" name="id card outline" color="orange" />
            <Header color="orange" as="h3">
              Edit Profile
            </Header>
          </div>
          <div style={this.style.menuOptions}
               onClick={this.goToMyAds.bind(this)}>
            <Icon size="large" name="buysellads" color="orange" />
            <Header color="orange" as="h3">
               My Ads
            </Header>
          </div>
          <div style={this.style.menuOptions}
               onClick={this.goToBarter.bind(this)}>
            <Icon size="large" name="exchange" color="orange" />
            <Header color="orange" as="h3">
              Barter
            </Header>
          </div>
          <div style={this.style.menuOptions}
               onClick={this.goToCreateAd.bind(this)}>
            <Icon size="large" name="add square" color="orange" />
            <Header color="orange" as="h3">
              CreateAd
            </Header>
          </div>
          <div style={this.style.menuOptions}
               onClick={this.goToWishList.bind(this)}>
            <Icon size="large" name="heart" color="orange" />
            <Header color="orange" as="h3">
              WishList
            </Header>
          </div>
          <div
            style={this.style.menuOptions}
            onClick={this.handleLogoutPress.bind(this)}
          >
            <Icon size="large" name="sign-out" color="orange" />
            <Header color="orange" as="h3">
              Logout
            </Header>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MenuItems);
