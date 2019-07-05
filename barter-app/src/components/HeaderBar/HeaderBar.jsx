import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import HeaderIcon from "../../assets/HeaderIcon.jpg";

class HeaderBar extends Component {
  style = {
    main: {
      height: "110px",
      background: "#232f3e",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "stretch"
    },
    headerIconDiv:{
      width: "75%"
    },
    headerIcon:{
      width: "90%",
      height: "100%",
      opacity: "0.7"
    }
  };
  render() {
    return (
      <div style={this.style.main}>
        <div style={this.style.headerIconDiv}>
        <img style={this.style.headerIcon} src={HeaderIcon} alt =""/>
        </div>
        <div style={{alignSelf: "center"}}>
        <Header color="orange" as="h1">
          Barter, Buy and Sell
        </Header>
        </div>
      </div>
    );
  }
}

export default HeaderBar;
