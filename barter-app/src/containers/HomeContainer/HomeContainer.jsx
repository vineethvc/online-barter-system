import React, { Component } from "react";
import { Grid, Dropdown } from 'semantic-ui-react';
import HomeItem from "../../components/HomeItem/HomeItem";
import ApiClient from "../../API/ApiClient";
import Loader from "../../components/ui-components/uiloader";
class HomeContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allAds: [],
      homeItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      categories: [
        { key: 1, text: "Electronics", value: 1 },
        { key: 2, text: "Home Utilities", value: 2 },
        { key: 3, text: "Car and Motorbike", value: 3 },
        { key: 4, text: "Musical Instruments", value: 4 },
        { key: 6, text: "Sports and Leisure", value: 6 },
        { key: 5, text: "Clothing", value: 5 }
      ],
      isLoading: false
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
    },
    dropdownCustom: {
        width: "25%"
    }
  };


handleDropdownChange = (event, {value}) =>{
  console.log("selected value", value.length);
  if(value.length > 0){
 const filteredProducts = ApiClient.filterAllAds(value)
  filteredProducts.then(filterAds => {
    this.setState({allAds: filterAds})
  })
  }else{
   this.getAllAdvertData();
  }
  }

  getAllAdvertData(){
    const allAdData = ApiClient.getAllAds()
    allAdData.then(allAdData => { 
        this.setState({allAds: allAdData})
      });
  }

componentDidMount(){
  this.getAllAdvertData();
}

handleOnItemSelected = (item) => {
  console.log("homeContainer", item);
  this.props.onHomeItemSelected(item)
}

  render() {
    return (
      <div style={this.style.main}>
        <div  style={{height: "10%"}}>
        <Dropdown
          placeholder='Select your category'
          fluid
          multiple
          search
          selection
          options={this.state.categories}
          background="red"
          onChange = {this.handleDropdownChange.bind(this)}
        />
      </div>
      <div style ={{zIndex: "10", display: !this.state.isLoading ? "none" : ""}}>
          <Loader/>
      </div>
        <div style={{height: "90%", overflowY: "scroll", overflowX: "hidden", padding: "20px"}}>
        <Grid columns={4} relaxed>
        {this.state.allAds.map((item, i) => (
             <Grid.Column key= {i}>
             <HomeItem onItemSelected={this.handleOnItemSelected.bind(this)} key= {i} homeProducts = {item}/>
             </Grid.Column>
         ))}
         </Grid>
         </div>
    </div>
    );
  }
}

export default HomeContainer;
