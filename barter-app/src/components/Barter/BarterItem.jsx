import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, Label } from "semantic-ui-react";
import DateFormatter from "../../utils/DateFormatter";

class BarterItem extends Component {
  
  navigateToDetails() {
    if(this.props.barterAd.barter_status === 0){
      this.props.onItemSelected(this.props.barterAd);
    }else{
      alert("Approved already")
    }
    
  }

  render() {
    return (
      <Card onClick ={this.navigateToDetails.bind(this)}
        style={{
          cursor: "pointer",
          height: "fit-content",
          width: "270px"
        }}
      >
        <Card.Content>
          <Card.Header style={{ textAlign: "left" }}>
            {this.props.barterAd.barter_duration}
          </Card.Header>
          <Card.Meta style={{ color: "black" }} floated="left">
            Raised By: {this.props.barterAd.barteree}
          </Card.Meta>
          <Card.Meta style={{ color: "black" }} floated="left">
            Raised On:{" "}
            {DateFormatter.getDateTime(this.props.barterAd.time_stamp)}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra style={{ textAlign: "left" }}>
          <Label
            color={this.props.barterAd.barter_status === 0 ? "red" : "green"}
            icon={
              this.props.barterAd.barter_status === 0
                ? "exclamation"
                : "buysellads"
            }
            content={
              this.props.barterAd.barter_status === 0 ? "Pending" : "Approved"
            }
          />
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(BarterItem);
