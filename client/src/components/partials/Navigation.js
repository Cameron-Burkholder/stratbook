/* client/components/partials/Navigation.js */

import React from "react";
import { Link } from "react-router-dom";

import UserDropdown from "./UserDropdown.js";

/*
  @func: Navigation
  @desc: render dynamic navigation bar
  @prop loggedIn: Boolean
*/
class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      active: false,
      loggedIn: this.props.loggedIn
    };
  }
  /*
    @func: toggleMenu
    @desc: toggle state of menu
  */
  toggleMenu() {
    this.setState({
      active: !this.state.active,
      loggedIn: this.props.loggedIn
    });
  }
  /*
    @desc: update loggedIn state if App changes
  */
  componentDidUpdate(prevProps) {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      this.setState({
        loggedIn: this.props.loggedIn
      });
    }
  }
  render() {
    return (
      <nav className={"nav " + (this.state.active ? "nav--active" : "nav--inactive")}>
        <ul className="nav__head">
          <img className="nav__image" alt="Logo" src=""/>
          <h3 className="nav__heading">Stratbook</h3>
        </ul>
        <ul className="nav__body">
          <li className="nav__item">
            <Link onClick={this.toggleMenu} className="nav__link" to="/">{this.state.loggedIn ? "Dashboard" : "Home"}</Link>
          </li>
          {
            this.state.loggedIn ? "" : (
              <li className="nav__item">
                <Link onClick={this.toggleMenu} className="nav__link" to="/login">Login</Link>
              </li>
            )
          }
          {
            this.state.loggedIn ? "" : (
              <li className="nav__item">
                <Link onClick={this.toggleMenu} className="nav__link" to="/register">Register</Link>
              </li>
            )
          }
          {
            this.state.loggedIn ? (
              <li className="nav__item">
                <Link onClick={this.toggleMenu} className="nav__link" to="/team">Team</Link>
              </li>
            ) : ( "" )
          }
          {
            this.state.loggedIn ? (
              <li className="nav__item">
                <Link onClick={this.toggleMenu} className="nav__link" to="/strategies">Strategies</Link>
              </li>
            ) : ( "" )
          }
          {
            this.state.loggedIn ? (
              <li className="nav__item">
                <Link onClick={this.toggleMenu} className="nav__link" to="/chat">Chat</Link>
              </li>
            ) : ( "" )
          }
          {
            this.state.loggedIn ? (
              <UserDropdown username={this.props.username}/>
            ) : ( "" )
          }
        </ul>
        <button className="nav__button" onClick={this.toggleMenu}></button>
      </nav>
    );
  }
}

export default Navigation;
