/* client/src/App.js */

import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

// import pages
import Home from "./components/pages/Home.js";
import Login from "./components/pages/Login.js";
import Logout from "./components/pages/Logout.js";
import Register from "./components/pages/Register.js";
import User from "./components/pages/User.js";
import Dashboard from "./components/pages/Dashboard.js";
import Team from "./components/pages/Team.js";
import ManageTeam from "./components/pages/ManageTeam.js";
import Strategies from "./components/pages/Strategies.js";
import EditStrategies from "./components/pages/EditStrategies.js";
import NotFound from "./components/pages/NotFound.js";
import ForgotPassword from "./components/pages/ForgotPassword.js";
import ResetPassword from "./components/pages/ResetPassword.js";

// import presentational components
import Navigation from "./components/partials/Navigation.js";
import Alert from "./components/partials/Alert.js";
import Header from "./components/partials/Header.js";
import Footer from "./components/partials/Footer.js";

import "./css/style.css";

import { TOKEN_ISSUED } from "./messages/messages.js";

/*
  App: root component, used to manage client-side auth and routing
*/
class App extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateState = this.updateState.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
    this.getAuthToken = this.getAuthToken.bind(this);
    this.updateAuthToken = this.updateAuthToken.bind(this);
    this.alert = this.alert.bind(this);
    this.clearAlert = this.clearAlert.bind(this);

    this.state = {
      loggedIn: Date.now() < new Date(localStorage.getItem("expires")) ? true : false,
      user: JSON.parse(localStorage.getItem("user")),
      alerts: []
    }
  }
  /*
    login: login a user on the client side

    token {String}: JWT
    expiresIn {Int}: expiry time for JWT
    user {Object}: user data object to store in localStorage
  */
  login(token, expiresIn, user) {
    this.setLocalStorage(token, expiresIn, user, this.updateState);
    axios.defaults.headers.common["Authorization"] = this.state.token;
  }
  /*
    logout: logout a user on the client side
  */
  logout() {
    this.clearLocalStorage();
    axios.defaults.headers.common["Authorization"] = null;
    this.updateState();
  }
  /*
    updateState: refresh application state of client-side authentication
  */
  updateState() {
    this.setState({
      loggedIn: Date.now() < new Date(localStorage.getItem("expires")) ? true : false,
      user: JSON.parse(localStorage.getItem("user"))
    });
  }
  /*
    setLocalStorage: store token and expiration date in local storage

    token {String}: JWT
    expiresIn {Int}: expiry time for JWT
    user {Object}: user data object
    callback {function}: function to call after local storage set
  */
  setLocalStorage(token, expiresIn, user, callback) {
    localStorage.setItem("token", token);
    localStorage.setItem("expires", new Date(Date.now() + expiresIn).toDateString());
    localStorage.setItem("user", JSON.stringify(user));
    callback();
  }
  /*
    clearLocalStorage: clear token and expiration date in local storage
  */
  clearLocalStorage() {
    localStorage.clear();
  }
  /*
    getAuthToken: get the auth token stored in localStorage
  */
  getAuthToken() {
    return localStorage.getItem("token");
  }
  /*
    updateAuthToken: update the state of client-side auth and data
  */
  updateAuthToken() {
    if (this.state.loggedIn) {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
      axios.get("/api/users/update-token")
        .then((response) => {
        switch (response.data.status) {
          case TOKEN_ISSUED.status:
            const user = response.data.user;
            this.login(response.data.token, response.data.expiresIn, user);
            break;
          default:
            this.alert("An error has occurred whil attempting to authenticate your login.");
            break;
        }
      }).catch((error) => {
        console.log(error);
        this.alert("Your login has expired or become invalid.");
        this.logout();
      });
    }
  }
  /*
    alert: write a message to the screen

    msg {String}: msg to display
  */
  alert(msg, status) {
    let newAlerts = [...this.state.alerts];
    newAlerts.push({ message: msg, status: status });
    this.setState({
      alerts: newAlerts
    });
  }
  /*
    clearAlert: clear an alert from the screen
    index {Int}: index of alert to clear
  */
  clearAlert(index) {
    let newAlerts = [...this.state.alerts];
    newAlerts.splice(index, 1);
    this.setState({
      alerts: newAlerts
    });
  }
  componentDidMount() {
    this.updateAuthToken();
  }
  render() {
    const alerts = this.state.alerts.map((alert, index) => {
      return <Alert clearAlert={this.clearAlert} index={index} message={alert.message} status={alert.status}/>
    });
    return (
      <Router>
        <div className="container">
          <Navigation loggedIn={this.state.loggedIn} username={(this.state.user ? this.state.user.username : "")} status={this.state.user ? this.state.user.status : ""} team={(this.state.user ? this.state.user.team_code : undefined)}/>
          <Switch>
            <Route exact path="/">
              { this.state.loggedIn ? ( <Redirect to="/dashboard"/> )
              : (
                <div className="page-wrapper">
                  <Home/>
                </div>
              )}
            </Route>
            <Route exact path="/user">
              { this.state.loggedIn ? (
                <div className="page-wrapper">
                  <User getAuthToken={this.getAuthToken} updateAuthToken={this.updateAuthToken}
                        logout={this.logout} username={this.state.user.username} email={this.state.user.email}
                        platform={this.state.user.platform} attacker_role={this.state.user.attacker_role}
                        attackers={this.state.user.attackers} defenders={this.state.user.defenders}
                        defender_role={this.state.user.defender_role} alert={this.alert}
                        subscription={this.state.user.subscription}/>
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            <Route exact path="/dashboard">
              { this.state.loggedIn ? (
                <div className="page-wrapper">
                  <Dashboard getAuthToken={this.getAuthToken} alert={this.alert}/>
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            <Route exact path="/team">
              { this.state.loggedIn ? (
                <div className="page-wrapper">
                  <Team getAuthToken={this.getAuthToken} updateAuthToken={this.updateAuthToken}
                        team_code={this.state.user.team_code} alert={this.alert} status={this.state.user.status}/>
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            <Route exact path="/team/manage">
              { this.state.loggedIn && this.state.user.status === "ADMIN" ? (
                <div className="page-wrapper">
                  <ManageTeam getAuthToken={this.getAuthToken} updateAuthToken={this.updateAuthToken} alert={this.alert}/>
                </div>
              )
              : ( <Redirect to="/team"/> )
              }
            </Route>
            <Route exact path="/strategies">
              { this.state.loggedIn && this.state.user.team_code ? (
                <div className="page-wrapper">
                  <Strategies team_code={this.state.user.team_code} status={this.state.user.status} getAuthToken={this.getAuthToken} alert={this.alert}/>
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            <Route exact path="/strategies/edit">
              { this.state.loggedIn && (this.state.user.status === "ADMIN" || this.state.user.status === "EDITOR") ? (
                <div className="page-wrapper">
                  <EditStrategies getAuthToken={this.getAuthToken} alert={this.alert}/>
                </div>
              )
              : ( <Redirect to="/strategies"/> )
              }
            </Route>
            <Route exact path="/chat">
              { this.state.loggedIn && this.state.user.team_code ? (
                <div className="page-wrapper">
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            <Route exact path="/login">
              { this.state.loggedIn ? ( <Redirect to="/"/> )
              : (
                <div className="page-wrapper">
                  <Login login={this.login} alert={this.alert}/>
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
                  <Register alert={this.alert}/>
                </div>
                )
              }
            </Route>
            <Route exact path="/forgot-password">
              { this.state.loggedIn ? ( <Redirect to="/"/> )
              : (
                <div className="page-wrapper">
                  <ForgotPassword alert={this.alert}/>
                </div>
              )}
            </Route>
            <Route path="/reset-password/:token"
              render={(props) => (<ResetPassword {...props} alert={this.alert}/>)}/>
            <Route>
              <div className="page-wrapper">
                <Header title="Error: 404"/>
                <NotFound/>
              </div>
            </Route>
          </Switch>
          <Footer/>
          <div className="alert-container">
            { alerts }
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
