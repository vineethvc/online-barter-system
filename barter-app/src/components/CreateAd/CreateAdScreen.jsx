import React, { Component } from "react";
import { Header, Form, Button, TextArea, Dropdown} from "semantic-ui-react";
import {storage} from '../../firebase/index';
import ApiClient from "../../API/ApiClient";
import showToast from '../ui-components/showToast';

const appFilters = [
  {
    key: '1',
    text: 'Electronics',
    value: 'Electronics'
  },
  {
    key: '2',
    text: 'Home Utilities',
    value: 'Home Utilities'
  },
  {
    key: '3',
    text: 'Car and Motorbike',
    value: 'Car and Motorbike'
  },
  {
    key: '4',
    text: 'Musical Instruments',
    value: 'Musical Instruments'
  },
  {
    key: '5',
    text: 'Sports and Leisure',
    value: 'Sports and Leisure'
  },
  {
    key: '6',
    text: 'Clothing',
    value: 'Clothing'
  }
];

const optionsArray = [
  {
    key: '1',
    text: 'Barter',
    value: 'Barter'
  },
  {
    key: '2',
    text: 'Sell',
    value: 'Sell'
  },
  {
    key: '3',
    text: 'Buy',
    value: 'Buy'
  }
]

class CreateAdScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      adData: {
          productName: "",
          productDesc: "",
          catId: "",
          userId: "",
          action: "",
          quantity: "",
          imageUrl: "",
      },
      loading: false
    }
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
    },
    formHeader: {
      marginTop: "20px"
    }
  };

  componentDidMount(){
    var adData = {...this.state.adData}
    adData.userId = localStorage.getItem("userEmail")
    this.setState({adData})
  }


  handleSubmit = () => {
    const {image} = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    }, 
    (error) => {
      console.log(error);
    }, () => {
      storage.ref('images').child(image.name).getDownloadURL().then((url) => {
        this.setState({url})
        this.postData(url);
      })
    });
    //console.log("createAd state-----", this.state)
  }

  postData =(url)=>{
    this.setState({loading: true});
    var adData = {...this.state.adData}
    adData.imageUrl = url
    this.setState({adData})
    console.log("createAd state-----", this.state.adData)
    const postAdData = ApiClient.postAd(this.state.adData.userId, 
      this.state.adData.productName, this.state.adData.productDesc, this.state.adData.catId, 
      this.state.adData.action, this.state.adData.quantity, this.state.adData.imageUrl)
      postAdData.then(postAdData => { 
        console.log("postAdData---", postAdData);
        showToast("Ad posted successfully", 'bottom')
        this.setState({loading: false});
        this.props.history.push({
          pathname: '/home'
          })
      });
  }

  handleFileInput = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }

  handleAction = (e, data) => {  
    var result = optionsArray.find(obj => {
      return obj.value === data.value
    })
    var adData = {...this.state.adData}
    adData.action = result.key
    this.setState({adData})
  }

  handleFilter = (e, data) => {
    var result = appFilters.find(obj => {
      return obj.value === data.value
    })
    var adData = {...this.state.adData}
    adData.catId = result.key
    this.setState({adData})
  }

  handleNameChange(event) {
    var adData = {...this.state.adData}
    adData.productName = event.target.value
    this.setState({adData})
  }

  handleDescriptionChange(event) {
    var adData = {...this.state.adData}
    adData.productDesc = event.target.value
    this.setState({adData})
  }

  handleQuantityChange(event){
    var adData = {...this.state.adData}
    adData.quantity = event.target.value
    this.setState({adData})
  }

  render() {
    return (
      <div style={{ position: "relative", flex: 1 }}>
      <div style ={this.style.main}>
          <Header color="orange" as='h1'>Create Your Ad</Header>
          <div style={{ width: "40%" }}>
              <Form onSubmit={this.handleSubmit}>
               
                  <label style={{color: "white"}}  htmlFor="formGroupExampleInput">Product name</label>
                  <input
                      type="text"
                      name="productName"
                      placeholder="Product Name"
                      className="form-control"
                      id="formGroupExampleInput"
                      value={this.state.adData.productName}
                      onChange={ this.handleNameChange.bind(this) } 
                    />

                    <div style ={{marginTop: "10px"}}>
                    <label style={{color: "white"}}  htmlFor="formGroupExampleInput">Category</label>
                    <Dropdown
                      placeholder='Select category'
                      fluid
                      selection
                      options={appFilters}
                      onChange={this.handleFilter.bind(this)}
                    />
                  </div>
                    <div style={{marginTop: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between"}} >
                    <div style={{display: "flex", flexDirection: "column"}} >
                    <label style={{color: "white"}}  htmlFor="formGroupExampleInput">Action</label>
                    <Dropdown
                      placeholder='Please select action'
                      fluid
                      selection
                      options={optionsArray}
                      onChange={this.handleAction.bind(this)}
                    />
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}} >
                    <label style={{color: "white"}}  htmlFor="formGroupExampleInput">Quantity</label>
                  <input
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      className="form-control"
                      id="formGroupExampleInput"
                      value={this.state.adData.quantity}
                      onChange={ this.handleQuantityChange.bind(this) } 
                    />
                    </div>
                   </div>

                   <div style ={{marginTop: "10px"}}>
                    <label style={{color: "white", marginTop: "5px"}}  htmlFor="formGroupExampleInput">Description</label>
                    <TextArea onChange={ this.handleDescriptionChange.bind(this) }   value={this.state.adData.productDesc} placeholder='Tell us more' />
                  
                    <div style ={{marginTop: "10px"}}>
                    <label  style={{color: "white", marginTop: "5px"}} htmlFor="formGroupExampleInput">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="formGroupExampleInput"
                      onChange={this.handleFileInput.bind(this)}
                    />
                    </div>
                  </div>
                  <div style ={{display: "flex", flexDirection: "column", marginTop: "30px"}}>
              <Button
                disabled={this.state.loading}
                className={this.state.loading ? "loading" : ""}
              >Post Ad</Button>
           </div>
              </Form>
              
              </div>
            </div>
      </div>
    );
  }
}

export default CreateAdScreen;
