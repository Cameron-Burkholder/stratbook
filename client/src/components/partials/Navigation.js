/* client/components/partials/Navigation.js */

import React from "react";
import { Link, NavLink } from "react-router-dom";

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
      first: true,
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
      first: false,
      active: !this.state.active,
      loggedIn: this.props.loggedIn
    });
    if (this.state.active) {
      setTimeout(() => {
        document.querySelector("nav.nav").style.zIndex = 4;
      }, 300);
    } else {
      document.querySelector("nav.nav").style.zIndex = 5;
    }
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
    const inactiveClass = (this.state.first ? "" : "nav--inactive");
    return (
      <nav className={"nav " + (this.state.active ? "nav--active" : inactiveClass)}>
        <ul className="nav__head">
          <img className="nav__image" alt="Logo" src=""/>
          <h3 className="nav__heading">Stratbook</h3>
          <span className="nav__subtitle">[Beta]</span>
        </ul>
        <ul className="nav__body">
          { this.state.loggedIn ? (
            <li className="nav__item">
              <NavLink exact activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/dashboard">Dashboard</NavLink>
            </li>
          ) : (
            <li className="nav__item">
              <NavLink exact activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/">Home</NavLink>
            </li>
          )}
          {
            this.state.loggedIn ? "" : (
              <li className="nav__item">
                <NavLink activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/login">Login</NavLink>
              </li>
            )
          }
          {
            this.state.loggedIn ? "" : (
              <li className="nav__item">
                <NavLink activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/register">Register</NavLink>
              </li>
            )
          }
          {
            this.state.loggedIn ? (
              <li className="nav__item">
                <NavLink activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/team">Team</NavLink>
              </li>
            ) : ( "" )
          }
          {
            this.state.loggedIn && this.props.team ? (
              <li className="nav__item">
                <NavLink activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/strategies">Strategies</NavLink>
              </li>
            ) : ( "" )
          }
          {
            this.state.loggedIn && this.props.team ? (
              <li className="nav__item">
                <NavLink activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/chat">Chat</NavLink>
              </li>
            ) : ( "" )
          }
          {
            this.state.loggedIn ? (
              <UserDropdown username={this.props.username} toggleMenu={this.toggleMenu}/>
            ) : ( "" )
          }
        </ul>
        <button id="nav__button" onClick={this.toggleMenu}>&#9776;</button>
      </nav>
    );
  }
}

export default Navigation;
