import React, { Component } from "react";
import ApiClient from "../../API/ApiClient";
import { withRouter } from "react-router-dom";
import { Header, Card, Button, Rating, Icon } from "semantic-ui-react";
import DateFormatter from "../../utils/DateFormatter";
import Loader from  "../ui-components/uiloader"


class BarterDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barterAdDesc: [],
      isLoading: true
    };
  }

  style = {
    main: {
      height: "calc(100% - 110px)",
      width: "100vw",
      position: "fixed",
      background: "#37475A",
      display: "flex",
      alignItems: "stretch",
      flexDirection: "column",
      justifyContent: "center",
      flex: "none",
      padding: "20px"
    },

    barterDiv: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      padding: "25px",
      justifyContent: "center"
    }
  };

  componentDidMount() {
    const barterAds = ApiClient.getBarterAdsDetail(
      this.props.location.state.detail.barter_adv_id,
      this.props.location.state.detail.barter_adv_with_id
    );
    barterAds.then(barterAds => {
      this.setState({ barterAdDesc: barterAds, isLoading: false});
      console.log("barterDescription", this.state.barterAdDesc);
    });
  }
  
  approveBarter(){
    const updateBarterStatus = ApiClient.updateBarterStatus(
      this.props.location.state.detail.id, 1
    );
    updateBarterStatus.then(updateBarterStatus => {
      console.log("barterStatus", updateBarterStatus);
    });
  }

  render() {
    return (
      <div style={{ position: "relative", flex: 1 }}>
        <div style={this.style.main}>
          <div>
            <Header
              style={{ textAlign: "center", marginTop: "20px" }}
              color="orange"
              as="h1"
            >
              Barter Details
            </Header>
          </div>
          {this.state.barterAdDesc.length > 0 ?
          
          <div style={this.style.barterDiv}>
          <div id="left">
            <Card
              style={{
                cursor: "pointer",
                height: "fit-content",
                width: "400px"
              }}
            >
              <img
                style={{ height: "200px" }}
                alt="img not available"
                src={this.state.barterAdDesc[0].image_url}
              />
              <Card.Content>
                <Card.Header style={{ textAlign: "left" }}>
                  {this.state.barterAdDesc[0].product_name}
                </Card.Header>
                <Card.Meta floated="left">
                  <span style={{ float: "right", color: "black" }}>
                    Posted On:
                    {DateFormatter.getDateTime(
                      this.state.barterAdDesc[0].time_stamp
                    )}
                  </span>
                </Card.Meta>
              </Card.Content>
              <Card.Description>
                {this.state.barterAdDesc[0].product_description}
              </Card.Description>
              <Card.Content extra style={{ textAlign: "left" }}>
                <Rating icon="star" defaultRating={3} maxRating={5} />
              </Card.Content>
            </Card>
          </div>
          <div id="center" style={{ margin: "25px" }}>
            <Icon name="exchange" size="huge" color="orange" />
          </div>
         
          <div id="right">
            <Card
              style={{
                cursor: "pointer",
                height: "fit-content",
                width: "400px"
              }}
            >
              <img
                style={{ height: "200px" }}
                alt="img not available"
                src={this.state.barterAdDesc[1].image_url}
              />
              <Card.Content>
                <Card.Header style={{ textAlign: "left" }}>
                  {this.state.barterAdDesc[1].product_name}
                </Card.Header>
                <Card.Meta floated="left">
                  <span style={{ float: "right", color: "black" }}>
                    Posted On:
                    {DateFormatter.getDateTime(
                      this.state.barterAdDesc[1].time_stamp
                    )}
                  </span>
                </Card.Meta>
                <Card.Description>
                  {this.state.barterAdDesc[1].product_description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra style={{ textAlign: "left" }}>
                <Rating icon="star" defaultRating={3} maxRating={5} />
              </Card.Content>
            </Card>
          </div>
        </div>
        : 
        <div style ={{zIndex: "10", display: this.state.isLoading ? "" : "none"}}>
        <Loader/>
        </div>
        }
          <div/>
          <div style={{ alignSelf: "center" }}>
            <Button onClick={this.approveBarter.bind(this)} positive>Approve Barter</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BarterDescription);
