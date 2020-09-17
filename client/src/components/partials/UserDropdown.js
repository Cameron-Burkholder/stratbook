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
        <img className="dropdown-icon" onClick={this.toggleDropdown} alt="User Icon" src=""/>
        <div className="dropdown-body">
          <span id="user-dropdown-title">{this.props.username}</span>
          <Link className="dropdown-link" to="/user">Account</Link>
          <Link className="dropdown-link" to="/logout">Logout</Link>
        </div>
      </div>
    )
  }
}

export default UserDropdown;
