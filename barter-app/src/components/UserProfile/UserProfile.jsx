import React, { Component } from "react";
import { Form, Button, Header} from "semantic-ui-react";
import ApiClient from "../../API/ApiClient";
import "./UserProfile.css";
import {withRouter} from "react-router-dom";

class UserProfile extends Component {

  state = {
    userProfile: {
      firsName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: ""
    }
  }

  componentDidMount(){
    console.log("called componentDidMount", this.state.userProfile);
    const profileData = ApiClient.getUserProfile(localStorage.getItem("userEmail"))
    profileData.then(profileData => { 
      console.log("profileData---", profileData);
      this.setState({
        firsName: profileData[0].first_name,
        lastName: profileData[0].last_name,
        email: profileData[0].email,
        password: profileData[0].password,
        phoneNumber: profileData[0].phone_number
      })
    });
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

  render() {
    return (
        <div style={{ position: "relative", flex: 1 }}>
        <div style ={this.style.main}>
        <Header color="orange" as='h1'>Edit User Profile</Header>
        <div style={{ width: "40%" }}>
            <Form>
            <label style={{color: "white"}} htmlFor="formGroupExampleInput">First name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      id="formGroupExampleInput"
                      value={this.state.firsName}
                    />
                    <div style ={{marginTop: "10px"}}>
             <label style={{color: "white"}} htmlFor="formGroupExampleInput">Last name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                      id="formGroupExampleInput"
                      value={this.state.lastName}
                    />
                    </div>
                    <div style ={{marginTop: "10px"}}>
              <label style={{color: "white"}} htmlFor="formGroupExampleInput">Email</label>
                    <input
                      type="email"
                      placeholder="E-mail"
                      className="form-control"
                      id="formGroupExampleInput"
                      value={this.state.email}
                    />
                    </div>
                    <div style ={{marginTop: "10px"}}>
                <label style={{color: "white"}} htmlFor="formGroupExampleInput">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      className="form-control"
                      id="formGroupExampleInput"
                      value={this.state.phoneNumber}
                    />
                    </div>
                    <div style ={{marginTop: "10px"}}>
                 <label style={{color: "white"}} htmlFor="formGroupExampleInput">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="formGroupExampleInput"
                      value={this.state.password}
                    />
                    </div>
            </Form>
           <div style ={{display: "flex", flexDirection: "column", marginTop: "30px"}}>
           <Button center>Update</Button>
           </div>
        </div>
        </div>
        </div>   
    );
  }
}

export default withRouter(UserProfile);
