import React, { Component } from "react";
import {
  Item,
  Label,
  Header,
  Image,
  Card,
  Icon,
  Dropdown,
  Button
} from "semantic-ui-react";
import DateFormatter from "../../utils/DateFormatter";
import ApiClient from  "../../API/ApiClient";
import {withRouter} from "react-router-dom";

const durationArray = [
  {
    key: '1',
    text: 'Less than 1 week',
    value: 'Less than 1 week'
  },
  {
    key: '2',
    text: '1 Week',
    value: '1 Week'
  },
  {
    key: '3',
    text: '3 Weeks',
    value: '3 Weeks'
  },
  {
    key: '4',
    text: '4 Weeks',
    value: '4 Weeks'
  },
  {
    key: '5',
    text: 'More than 1 month',
    value: 'More than 1 month'
  }
]

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advertSelected: {},
      isContactDetails: false,
      isBarterVisible: false,
      contactDetails:[],
      availableBarterItems: [],
      raiseBarter: {
        barterAdvertId: "",
        durationSelected: "" 
      } 
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
      justifyContent: "flex-start",
      flex: "none",
      padding: "20px"
    }
  };

  componentDidMount() {
    console.log("nav params", this.props.location.state.detail)
    var productState = this.state;
    productState.advertSelected = this.props.location.state.detail
     this.setState(productState);
     this.getContactDetails();
     
  }

  getContactDetails(){
    const userData = ApiClient.getUserProfile(this.state.advertSelected.posted_by)
    userData.then(userData => { 
      var contactData = this.state;
      contactData.contactDetails= userData[0]
      this.setState(contactData);
    });
  }

  handleContactPress() {
    this.setState({ isContactDetails: !this.state.isContactDetails });
  }

  handleBarterPress(){
    const userAddData = ApiClient.getUserAds(window.localStorage.getItem("userEmail"))
    userAddData.then(userAddData => { 
      userAddData.forEach(addElement => {
        this.state.availableBarterItems.push({ "key": addElement.id, "text":  addElement.product_name,  "value": addElement.product_name});
      });
      this.setState({ isBarterVisible: !this.state.isBarterVisible });
    });
  }


  handleDuration = (e, data) => {  
    var raiseBarter = this.state.raiseBarter
    raiseBarter.durationSelected = data.value;
    this.setState(raiseBarter)
  }

  handleItemSelected =(e, data) =>{
    var advert_id = data.options.find(o => o.value ===  data.value).key
    var raiseBarter = this.state.raiseBarter
    raiseBarter.barterAdvertId = advert_id;
    this.setState(raiseBarter)
  }

  barterSubmit(){
  const barterAdData = ApiClient.createBarter(this.state.advertSelected.id,
                                            this.state.raiseBarter.barterAdvertId,
                                            window.localStorage.getItem("userEmail"),
                                            this.state.advertSelected.posted_by,
                                            "Pending",
                                            this.state.raiseBarter.durationSelected)
    barterAdData.then(barterData => {
      console.log("barter submit success", barterData);
    })
  }


  render() {
    return (
        <div style={{ position: "relative", flex: 1 }}>
        <div style={this.style.main}>
            <Header  style={{ textAlign: "center", marginTop: "20px" }} color="orange" as="h1">
              Product Details
            </Header>
            <div style={{height: "90%", overflowY: "scroll", overflowX: "hidden", padding: "20px"}}>
          <Item.Group divided>
            <Item>
              <Image
                style={{ width: "500px", height: "350px" }}
                src={this.state.advertSelected.image_url}
                alt = "buysellads"
              />
              <Item.Content>
                <Item.Header as="a" style={{ color: "white" }}>
                  {this.state.advertSelected.product_name}
                </Item.Header>
                <Item.Meta>
                  <span  style={{ fontWeight: "bold", color: "white" }} className="cinema">
                    Posted on: {DateFormatter.getDateTime(
                      this.state.advertSelected.time_stamp
                    )}
                  </span>
                </Item.Meta>
                <Item.Meta>
                  <span  style={{ fontWeight: "bold",  color: "white" }}  className="cinema">Quantity: {this.state.advertSelected.quantity}</span>
                </Item.Meta>
                <Item.Description color="white" style={{ color: "white" }}>
                  {this.state.advertSelected.product_description}
                </Item.Description>
                <Item.Extra style={{width: "40%"}}> 
                {this.state.advertSelected.posted_by === window.localStorage.getItem("userEmail") ? 
                  <Label style={{cursor: "pointer", textAlign: "center", width: "40%"}} 
                  color="orange"
                  icon="remove circle"
                  content = "Delete Ad"
                  
                  /> :
                    [ (this.state.advertSelected.action_name === "Barter" ?
                    <Label style={{cursor: "pointer", textAlign: "center", width: "40%"}} 
                          color="orange"
                          icon="exchange"
                          content = "Barter"
                          onClick={this.handleBarterPress.bind(this)}/> :
                  <Label style={{cursor: "pointer", textAlign: "center", width: "40%"}}
                          icon="handshake"
                          content="Contact User"
                          color="green"
                          onClick={this.handleContactPress.bind(this)}
                      />  
                        )    ]
                }
                  
                </Item.Extra>
                {this.state.isContactDetails  ? (
                  <Card>
                    <Card.Content>
                      <Icon name="user" size="huge" color="orange" />
                      <Card.Header style={{marginTop: "5px"}}>
                      {this.state.contactDetails.first_name} {" "}
                      {this.state.contactDetails.last_name}
                      </Card.Header>
                      <Card.Description>
                        Authorized reliable party based on reviews
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name="mail" />{this.state.contactDetails.email}
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name="phone" />{this.state.contactDetails.phone_number}
                    </Card.Content>
                  </Card>

                 
                ) :  null}
                {this.state.isBarterVisible ? 
                <Card>
                <Card.Content>
                  <Icon name="exchange" size="huge" color="orange" />
                  <Card.Header style={{marginTop: "5px"}}>
                      Raise barter request
                  </Card.Header>
                  <Dropdown  style={{marginTop: "5px"}}
                  placeholder='Please select duration'
                  fluid
                  selection
                  options={durationArray}
                  onChange={this.handleDuration.bind(this)}
                />
                  <Dropdown style={{marginTop: "5px"}}
                  placeholder='Please select your item'
                  fluid
                  selection
                  options={this.state.availableBarterItems}
                  onChange={this.handleItemSelected.bind(this)}
                />
                </Card.Content>
                <Card.Content extra>
                <Button
                  onClick = {this.barterSubmit.bind(this)}
                  style={{width: "100%"}} 
                  className="ui positive button">Submit</Button>
                </Card.Content>
               
              </Card>: null} 
              </Item.Content>
            </Item>
          </Item.Group>
        </div>
        </div>   
        </div>
    );
  }
}


export default withRouter(ProductDescription);
