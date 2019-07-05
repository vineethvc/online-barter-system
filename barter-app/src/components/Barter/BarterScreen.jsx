import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Header, Grid} from "semantic-ui-react";
import ApiClient from "../../API/ApiClient";
import BarterItem from './BarterItem';
import showToast from '../../components/ui-components/showToast';

class BarterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBarterAds: []
    };
  }

  style = {
    main: {
      height: "calc(100% - 110px)",
      width: "100vw",
      position: "fixed",
      background: "#37475A",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      flex: "none",
      padding: "10px"
    }
  };

  componentDidMount() {
    const allBarterData = ApiClient.getBarterAds(window.localStorage.getItem("userEmail"));
    allBarterData.then(allBarterData => {
      this.setState({ allBarterAds: allBarterData });
      if(!(this.state.allBarterAds.length > 0)){
        showToast("No Barter requests found", "bottom")
      }
    });
    
  }

  handleOnAdSelected = (item) => {
    this.props.history.push({
      pathname: '/barterdescription',
      state: { detail:item }
    })
  }

  render() {
    return (
      <div style={{ position: "relative", flex: 1 }}>
        <div style={this.style.main}>
          <Header
            style={{
              alignSelf: "center",
              position: "absolute",
              marginTop: "10px",
              top: "0"
            }}
            color="orange"
            as="h1">
            Your Barter Requests
          </Header>
          <div
            style={{
              height: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
              padding: "35px",
              marginTop: "25px",
              width: "100%"
            }}>
            <Grid columns={4} relaxed>
             {this.state.allBarterAds.map((item, i) => (
             <Grid.Column key= {i}>
             <BarterItem onItemSelected={this.handleOnAdSelected.bind(this)} key= {i} barterAd = {item}/>
             </Grid.Column>
            ))}
         </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BarterScreen);
