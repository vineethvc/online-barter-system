import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import MenuItems from "../../components/MenuItems/MenuItems";

class MenuContainer extends Component {
  state = {
    isMenuVisible: false
  };

  style = {
    menuIcon: {
      height: "fit-content",
      alignSelf: "flex-end",
      margin: "32px",
      padding: "12px"
    },
    container: {
      borderColor: "#000000",
      backgroundColor: "transparent",
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      flex: "none",
      alignItems: "stretch",
      justifyContent: "flex-start",
      cursor: "default",
      height: "100%"
    }
  };

  handleMenuButtonPress() {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  }

  render() {
    return (
      <div style={this.style.container}>
        {this.state.isMenuVisible ? <MenuItems /> : null}
        <Icon
          style={this.style.menuIcon}
          name={this.state.isMenuVisible ? "outdent" : "indent"}
          size="big"
          color="orange"
          onClick={this.handleMenuButtonPress.bind(this)}
        />
      </div>
    );
  }
}

export default MenuContainer;
