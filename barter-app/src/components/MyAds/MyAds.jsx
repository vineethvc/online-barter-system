import React, { Component } from "react";
import MyAdsContainer from "../../containers/MyAdsContainer/MyAdsContainer";
import {withRouter} from "react-router-dom";

class MyAds extends Component {

  render() {
    return (
        <div style={{ position: "relative", flex: 1 }}>
          <MyAdsContainer/>
        </div>
    );
  }
}

export default withRouter(MyAds);
