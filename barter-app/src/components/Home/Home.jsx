import React, { Component } from "react";
import MenuContainer from "../../containers/MenuContainer/MenuContainer";
import HomeContainer from "../../containers/HomeContainer/HomeContainer";
import {withRouter} from "react-router-dom";

class Home extends Component {

  handleOnItemSelected = (item) => {
      this.props.history.push({
        pathname: '/productdescription',
        state: { detail:item }
      })
  }


  render() {
    return (
        <div style={{ position: "relative", flex: 1 }}>
          <HomeContainer onHomeItemSelected={this.handleOnItemSelected.bind(this)}/>
          
          <MenuContainer />
        </div>
    );
  }
}

export default withRouter(Home);
