/* client/components/partials/Navigation.js */

import React from "react";
import { NavLink } from "react-router-dom";

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
          { /*<img className="nav__image" alt="Logo" src="../../media/min/Stratbook_Logo.png"/>*/ }
          <h3 className="nav__heading">Stratbook</h3>
          <span className="nav__subtitle">[Beta]</span>
        </ul>
        <ul className="nav__body">
          <li className="nav__item">
            <NavLink exact activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/"><i className="fa fa-home"></i>Home</NavLink>
          </li>
          { this.state.loggedIn ? (
            <li className="nav__item">
              <NavLink exact activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/dashboard"><i className="fa fa-tachometer-alt"></i>Dashboard</NavLink>
            </li>
          ) : ( "" )
          }
          {
            this.state.loggedIn ? "" : (
              <li className="nav__item">
                <NavLink activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/login"><i className="fa fa-sign-in-alt"></i>Login</NavLink>
              </li>
            )
          }
          {
            this.state.loggedIn ? "" : (
              <li className="nav__item">
                <NavLink activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/register"><i className="fa fa-plus-square"></i>Register</NavLink>
              </li>
            )
          }
          {
            this.state.loggedIn ? (
              <li className="nav__item">
                <NavLink activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/team"><i className="fa fa-users"></i>Team</NavLink>
              </li>
            ) : ( "" )
          }
          {
            this.state.loggedIn && this.props.team ? (
              <li className="nav__item">
                <NavLink activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/strategies"><i className="fa fa-chess-knight"></i>Strategies</NavLink>
              </li>
            ) : ( "" )
          }
          <li className="nav__item">
            <NavLink activeClassName="nav__link--active" onClick={this.toggleMenu} className="nav__link" to="/community"><i className="fa fa-project-diagram"></i>Community</NavLink>
          </li>
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
