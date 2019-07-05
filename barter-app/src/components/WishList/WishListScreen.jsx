import React, { Component } from "react";
import WishListContainer from "../../containers/WishListContainer/WishListContainer";
import {withRouter} from "react-router-dom";

class WishListScreen extends Component {

  style = {
    main: {
      display: "flex",
      height: "100%",
      alignItems: "stretch",
      flexDirection: "column",
      justifyContent: "flex-start",
      flex: "none"
    }
  };

  componentDidMount(){
    
  }
  
  render() {
    return (
        <div style={{ position: "relative", flex: 1 }}>
          <WishListContainer/>
        </div>
    );
  }
}

export default withRouter(WishListScreen);
