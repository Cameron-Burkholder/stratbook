/* client/App.js */

import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

// import pages
import Home from "./components/pages/Home.js";
import Login from "./components/pages/Login.js";
import Logout from "./components/pages/Logout.js";
import Register from "./components/pages/Register.js";
import Dashboard from "./components/pages/Dashboard.js";
import NotFound from "./components/pages/NotFound.js";

// import presentational components
import Navigation from "./components/partials/Navigation.js";
import MainNavigation from "./components/partials/MainNavigation.js";
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
      loggedIn: Date.now() < new Date(localStorage.getItem("expires")) ? true : false,
      user: JSON.parse(localStorage.getItem("user")),
    }
  }
  /*
    @func: login
    @desc: login a user on the client side
    @param token: String
    @param expiresIn: Integer
    @param user: Object
  */
  login(token, expiresIn, user) {
    this.setLocalStorage(token, expiresIn, user);
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
  setLocalStorage(token, expiresIn, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("expires", new Date(Date.now() + expiresIn).toDateString());
    localStorage.setItem("user", JSON.stringify(user));
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
          <Navigation loggedIn={this.state.loggedIn} username={this.state.user.username}/>
          <Switch>
            /* / */
            <Route exact path="/">
              { this.state.loggedIn ? ( <Redirect to="/dashboard"/> )
              : (
                <div className="page-wrapper">
                  <Header title="Home" subtitle="Subtitle"/>
                  <Home/>
                </div>
              )}
            </Route>
            /* /user */
            <Route exact path="/user">
              { this.state.loggedIn ? (
                <div className="page-wrapper">
                  <Header title={this.state.user.username}/>
                  <MainNavigation page="USER" user={this.state.user.status}/>
                  user
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            /* /dashboard */
            <Route exact path="/dashboard">
              { this.state.loggedIn ? (
                <div className="page-wrapper">
                  <Header title="Dashboard"/>
                  <MainNavigation page="DASHBOARD" user={this.state.user.status}/>
                  <Dashboard/>
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            /* /team */
            <Route exact path="/team">
              { this.state.loggedIn ? (
                <div className="page-wrapper">
                  <Header title="View Team"/>
                  <MainNavigation page="TEAM" user={this.state.user.stats}/>
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            /* /team/manage */
            <Route exact path="/team/manage">
              { this.state.loggedIn && this.state.user.status === "ADMIN" ? (
                <div className="page-wrapper">
                  <Header title="Manage Team"/>
                  <MainNavigation page="TEAM" user={this.state.user.status}/>
                </div>
              )
              : ( <Redirect to="/team"/> )
              }
            </Route>
            /* /strategies */
            <Route exact path="/strategies">
              { this.state.loggedIn ? (
                <div className="page-wrapper">
                  <Header title="View Strategies"/>
                  <MainNavigation page="STRATEGIES" user={this.state.user.status}/>
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            /* /strategies/edit */
            <Route exact path="/strategies/edit">
              { this.state.loggedIn && (this.state.user.status === "ADMIN" || this.state.user.status === "EDITOR") ? (
                <div className="page-wrapper">
                  <Header title="Edit Strategies"/>
                  <MainNavigation page="USER" user={this.state.user.status}/>
                  user
                </div>
              )
              : ( <Redirect to="/strategies"/> )
              }
            </Route>
            /* /maps */
            <Route exact path="/maps">
              { this.state.loggedIn ? (
                <div className="page-wrapper">
                  <Header title="View Maps"/>
                  <MainNavigation page="MAPS" user={this.state.user.status}/>
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            /* /maps/edit */
            <Route exact path="/maps/edit">
              { this.state.loggedIn && (this.state.user.status === "ADMIN" || this.state.user.status === "EDITOR") ? (
                <div className="page-wrapper">
                  <Header title="Edit Maps"/>
                  <MainNavigation page="MAPS" user={this.state.user.status}/>
                </div>
              )
              : ( <Redirect to="/maps"/> )
              }
            </Route>
            /* /chat */
            <Route exact path="/chat">
              { this.state.loggedIn ? (
                <div className="page-wrapper">
                  <Header title="Chat"/>
                  <MainNavigation page="CHAT" user={this.state.user.status}/>
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            /* /meta */
            <Route exact path="/meta">
              { this.state.loggedIn ? (
                <div className="page-wrapper">
                  <Header title="Meta"/>
                  <MainNavigation page="META" user={this.state.user.status}/>
                </div>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            /* /login */
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
            /* /logout */
            <Route exact path="/logout">
              { this.state.loggedIn ? (
                <Logout logout={this.logout}/>
              )
              : ( <Redirect to="/"/> )
              }
            </Route>
            /* /register */
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
            /* /* */
            <Route>
              <div className="page-wrapper">
                <Header title="Error 404"/>
                <NotFound/>
              </div>
            </Route>
          </Switch>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App;
