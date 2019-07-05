import React, { Component } from "react";
import { Grid, Form, Segment, Button, Message, Icon } from "semantic-ui-react";
import "./Signin.css";
import LoginBg from "../../assets/LoginBg.jpg";
import ApiClient from "../../API/ApiClient";
import {withRouter} from "react-router-dom";
import showToast from '../ui-components/showToast';


class SignInComponent extends Component {
  
  constructor(props) {
    super(props);
      this.state = {
      username: "",
      password: "",
      errors: [],
      loading: false
    };
  }

  style = {
    main: {
      height: "100%",
      backgroundImage: `url(${LoginBg})`,
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
      const userData = ApiClient.login(this.state.username, this.state.password)
      userData.then(userData => {
        if(userData.code === 200){
          console.log("userdata---", userData);
          localStorage.setItem("userEmail", this.state.username)
          localStorage.setItem("x-access-token", userData.token)
          showToast("Welcome" + this.state.username, 'bottom')
          this.setState({loading: false})
          this.props.history.push({
          pathname: '/home'
          })
        }else if(userData.code === 204) {
          this.setState({loading: false})
          showToast(userData.success, 'bottom')
        }else{
          this.setState({loading: false})
          showToast("Wrong Username or Password", 'bottom')
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
    } else if (!this.isValidPassword(this.state.password)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error), loading: false });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, password }) => {
    return !username.length || !password.length;
  };

  isValidPassword = password => {
    // check password with database
    // default return true
    return true;
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleInputError = (errors, inputName) => {
    errors.some(error => {
      return error.message.toLowerCase().includes(inputName) ? "error" : "";
    });
  };

  render() {
    const {errors } = this.state;

    return (
      <div style={this.style.main}>
        <Grid textAlign="center" verticalAlign="middle" className="signin">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Icon name="user circle" size="huge" color="orange" />

            <Form
              style={{ marginTop: "10px" }}
              size="large"
              onSubmit={this.handleSubmit}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={this.handleChange}
                  type="text"
                />
                <Form.Input
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={this.handleChange}
                  type="password"
                  className={this.handleInputError(errors, "password")}
                />
                <Button
                  disabled={this.state.loading}
                  className={this.state.loading ? "loading" : ""}
                  color="orange"
                  fluid
                  size="large"
                >
                  Log In
                </Button>
                <span>
                  New User? <a href="./Signup">Register</a>
                </span>
                {errors.length > 0 && (
                  <Message>
                    <Message.Header>Error</Message.Header>
                    {this.displayErrors(errors)}
                  </Message>
                )}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        
      </div>
    );
  }
}

export default withRouter(SignInComponent);
