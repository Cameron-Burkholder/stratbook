/* client/components/partials/UserDropdown.js */

import React from "react";
import { Link } from "react-router-dom";

/*
  @func: UserDropdown
  @desc: render user dropdown in navigation bar
  @prop username: String
*/
class UserDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.state = {
      active: false
    }
  }
  toggleDropdown() {
    this.setState({
      active: !this.state.active
    })
  }
  render() {
    return (
      <div className={"user-dropdown " + (this.state.active ? "user-dropdown--active" : "user-dropdown--inactive")}>
        <i className="user-dropdown__icon fa fa-user" onClick={this.toggleDropdown} alt="User Icon"><span>{this.props.username}</span></i>
        <div className="user-dropdown__body">
          <span id="user-dropdown-title">Quick Access</span>
          <Link onClick={() => { this.toggleDropdown(); this.props.toggleMenu(); }} className="user-dropdown__link" to="/user"><i className="fa fa-user-circle"></i>Account</Link>
          <Link onClick={() => { this.toggleDropdown(); this.props.toggleMenu(); }} className="user-dropdown__link" to="/support" id="support-link"><i className="fa fa-hands-helping"></i>Support</Link>
          <Link onClick={() => { this.toggleDropdown(); this.props.toggleMenu(); }} className="user-dropdown__link" to="/logout" id="logout-link"><i className="fa fa-sign-out-alt"></i>Logout</Link>
        </div>
      </div>
    )
  }
}

export default UserDropdown;
