import React, { Component } from "react";
import { Grid } from 'semantic-ui-react';
import HomeItem from "../../components/HomeItem/HomeItem";
import ApiClient from "../../API/ApiClient";
import showToast from '../../components/ui-components/showToast';

class WishListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allAds: []
    }
  }

  style = {
    main:{
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


componentDidMount(){
  const allAdData = ApiClient.getWishLisItems(window.localStorage.getItem("userEmail"))
  allAdData.then(allAdData => { 
    console.log("length---", allAdData)
    if(allAdData === "No items wishlisted"){
      showToast("Wishlist is empty", 'bottom')
    }else{
      this.setState({allAds: allAdData})
    }});
}

  render() {
    return (
      <div style={this.style.main}>
        <div style={{height: "90%", overflowY: "scroll", padding: "20px", overflowX: "hidden"}}>
        
          <Grid columns={4} relaxed>
          {this.state.allAds.map((item, i) => (
               <Grid.Column>
               <HomeItem key= {i} homeProducts = {item}/>
               </Grid.Column>
           ))}
           </Grid> 
         
         </div>
    </div>
    );
  }
}

export default WishListContainer;
