/* client/components/api/SetAttackerRoleAPI.js */

import React from "react";
import axios from "axios";
import { ATTACKER_ROLE_SET } from "../../messages/messages.js";
import { ERROR_ATTACKER_ROLE } from "../../messages/errors.js";

import Loading from "../partials/Loading.js";
import AttackerRoleForm from "../partials/AttackerRoleForm.js";

/*
  @func: SetAttackerRoleAPI
  @desc: make a request to server to set attacker role
  @prop attacker_role: String
  @prop getAuthToken: function
  @prop logout: function

*/
class SetAttackerRoleAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: false,
      attacker_role: this.props.attacker_role
    }

  }
  /*
    @func: onChange
    @desc: update state of platform field
    @param e: Object.Event
  */
  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    }, this.onSubmit);
  }
  /*
    @func: onSubmit
    @desc: submit form data to server, rerender page depending on response
    @prop getAuthToken: function
    @prop updateAuthToken: function
  */
  onSubmit() {
    const component = this;
    this.setState({
      errors: {},
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch("/api/users/set-attacker-role", {
      role: this.state.attacker_role
    }).then((response) => {
      switch (response.data.status) {
        case ATTACKER_ROLE_SET.status:
          component.setState({
            loading: false,
          });
          component.props.updateAuthToken();
          break;
        default:
          component.setState({
            loading: false,
            errors: response.data.errors
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.props.alert(ERROR_ATTACKER_ROLE.message, ERROR_ATTACKER_ROLE.status);
    });
  }
  render() {
    return (
      <div id="SetAttackerRoleAPI">
        { this.state.loading ? (
          <Loading/>
        ) : (
          <AttackerRoleForm attacker_role={this.state.attacker_role} onChange={this.onChange} onSubmit={this.onSubmit} errors={this.state.errors}/>
        )}
      </div>
    )
  }
}

export default SetAttackerRoleAPI;
