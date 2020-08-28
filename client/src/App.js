/* client/App.js */

import React from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

// import pages
import Home from "./components/pages/Home.js";
import Login from "./components/pages/Login.js";
import Logout from "./components/pages/Logout.js";
import Register from "./components/pages/Register.js";

// import presentational components
import Navigation from "./components/partials/Navigation.js";
import Header from "./components/partials/Header.js";
import Footer from "./components/partials/Footer.js";

/*
  @func: App
  @desc: Manage client-side auth and routing
*/
class App extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateState = this.updateState.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);

    this.state = {
      loggedIn: Date.now() < new Date(localStorage.getItem("expires")) ? true : false
    }
  }
  /*
    @func: login
    @desc: login a user on the client side
    @param token: String
    @param expiresIn: Integer
  */
  login(token, expiresIn) {
    this.setLocalStorage(token, expiresIn);
    axios.defaults.headers.common["Authorization"] = this.state.token;
    this.updateState();
  }
  /*
    @func: logout
    @desc: logout a user on the client side
  */
  logout() {
    this.clearLocalStorage();
    axios.defaults.headers.common["Authorization"] = null;
    this.updateState();
  }
  /*
    @func: updateState
    @desc: refresh application state of client-side authentication
  */
  updateState() {
    this.setState({
      loggedIn: Date.now() < new Date(localStorage.getItem("expires")) ? true : false
    });
  }
  /*
    @func: setLocalStorage
    @desc: store token and expiration date in local storage
    @param token: Object
    @param expires: Date.String
  */
  setLocalStorage(token, expiresIn) {
    localStorage.setItem("token", token);
    localStorage.setItem("expires", new Date(Date.now() + expiresIn).toDateString());
  }
  /*
    @func: clearLocalStorage
    @desc: clear token and expiration date in local storage
  */
  clearLocalStorage() {
    localStorage.clear();
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Navigation loggedIn={this.state.loggedIn}/>
          <Switch>
            <Route exact path="/">
              <div className="page-wrapper">
                <Header title="Home" subtitle="Subtitle"/>
                <Home/>
              </div>
            </Route>
            <Route exact path="/login">
              { this.state.loggedIn ? ( <Redirect to="/"/> )
              : (
                <div className="page-wrapper">
                  <Header title="Login"/>
                  <Login login={this.login}/>
                </div>
                )
              }
            </Route>
            <Route exact path="/logout">
              { this.state.loggedIn ? (
                <Logout logout={this.logout}/>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            <Route exact path="/register">
              { this.state.loggedIn ? ( <Redirect to="/"/> )
              : (
                <div className="page-wrapper">
                  <Header title="Register"/>
                  <Register/>
                </div>
                )
              }
            </Route>
          </Switch>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App;
