import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

import App from "./App";
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import SignIn from './components/Auth/SignInComponent';
import SignUp from "./components/Auth/SignUpComponent";
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import BarterScreen from "./components/Barter/BarterScreen";
import CreateAdScreen from "./components/CreateAd/CreateAdScreen";
import WishListScreen from "./components/WishList/WishListScreen";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import BarterDescription from "./components/BarterDescription/BarterDescription";
import MyAds from "./components/MyAds/MyAds";
import HeaderBar from "./components/HeaderBar/HeaderBar";

const Root = () => (
  <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
    <Router >
      <HeaderBar/>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/userprofile" component={UserProfile}/>
      <Route exact path="/barter" component={BarterScreen}/>
      <Route exact path="/createAd" component={CreateAdScreen}/>
      <Route exact path="/wishlist" component={WishListScreen}/>
      <Route exact path='/productdescription' component={ProductDescription}/>
      <Route exact path="/myads" component={MyAds}/>
      <Route exact path="/barterdescription" component={BarterDescription}/>
      </Switch>
  </Router>
  </div>
  );


ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();