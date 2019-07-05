import React, { Component } from "react";
import {Grid, Form, Segment,Button, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Signup.css";
import SignUp from "../../assets/SignUp.jpg";
import ApiClient from "../../API/ApiClient";
import { withRouter } from "react-router-dom";
import showToast from '../../components/ui-components/showToast';

class SignUpComponent extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber:"",
    password: "",
    errors: [],
    loading: false
  };

  style = {
    main: {
      height: "100%",
      backgroundImage: `url(${SignUp})`,
      opacity: "2.5"
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ errors: [], loading: true });
    if (this.isFormValid()) {
      const registerData = ApiClient.registerUser(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.phoneNumber)
      registerData.then(registerData => { 
        console.log("registerData---", registerData);
        if(registerData.affectedRows === 1){
          this.setState({ errors: [], loading: false });
          showToast("User created successfully", "bottom")
          this.props.history.push({
            pathname: '/signin'
            })
        }else{
          this.setState({ errors: [], loading: false });
          showToast("Something went wrong, Try again", "bottom")
        }
        
      });
    }
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error), loading: false });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ firstName, lastName, email, password}) => {
    return (
      !firstName.length ||
      !email.length ||
      !password.length ||
      !lastName.length
    );
  };


  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleInputError = (errors, inputName) => {
    errors.some(error => {
      return error.message.toLowerCase().includes(inputName) ? "error" : "";
    });
  };

  render() {
    const {
      firstName,
      email,
      phoneNumber,
      password,
      lastName,
      errors,
      loading
    } = this.state;

    return (
      <div style={this.style.main}>
        <Grid textAlign="center" verticalAlign="middle" className="signup">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Icon size="huge" name="user circle outline" color="orange" />
            <Form
              style={{ marginTop: "10px" }}
              size="large"
              onSubmit={this.handleSubmit}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  name="firstName"
                  icon="user"
                  iconPosition="left"
                  placeholder="firstName"
                  onChange={this.handleChange}
                  value={firstName}
                  type="text"
                />
                 <Form.Input
                  fluid
                  name="lastName"
                  icon="user"
                  iconPosition="left"
                  placeholder="lastName"
                  onChange={this.handleChange}
                  value={lastName}
                  type="text"
                />
                <Form.Input
                  fluid
                  name="email"
                  icon="mail"
                  iconPosition="left"
                  placeholder="Email Address"
                  onChange={this.handleChange}
                  value={email}
                  type="email"
                  className={this.handleInputError(errors, "email")}
                />
                <Form.Input
                  fluid
                  name="phoneNumber"
                  icon="phone"
                  iconPosition="left"
                  placeholder="Phone Number"
                  onChange={this.handleChange}
                  value={phoneNumber}
                  type="text"
                  className={this.handleInputError(errors, "phoneNumber")}
                />
                <Form.Input
                  fluid
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                  type="password"
                  className={this.handleInputError(errors, "password")}
                />
                <Button
                  disabled={loading}
                  className={loading ? "loading" : ""}
                  color="orange"
                  fluid
                  size="large"
                >
                  Sign Up
                </Button>
                {errors.length > 0 && (
                  <Message>
                    <Message.Header>Error</Message.Header>
                    {this.displayErrors(errors)}
                  </Message>
                )}
                <Message>
                  Already a user? <Link to="/signin">Signin</Link>
                </Message>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(SignUpComponent);
