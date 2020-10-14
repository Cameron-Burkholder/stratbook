/* client/components/api/SetDefenderRoleAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";
import DefenderRoleForm from "../partials/DefenderRoleForm.js";

/*
  @func: SetDefenderRoleAPI
  @desc: make a request to server to set attacker role
  @prop getAuthToken: function
  @prop logout: function

*/
class SetDefenderRoleAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: false,
      defender_role: this.props.defender_role
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
    @prop defender_role: String
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
    axios.patch("/api/users/set-defender-role", {
      role: this.state.defender_role
    }).then((response) => {
      switch (response.data.status) {
        case "DEFENDER_ROLE_SET":
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
      component.props.alert("An error has occurred while attempting to set defender role.", "ERROR");
    });
  }
  render() {
    return (
      <div id="SetDefenderRoleAPI">
        { this.state.loading ? (
          <Loading/>
        ) : (
          <DefenderRoleForm defender_role={this.state.defender_role} onChange={this.onChange} onSubmit={this.onSubmit} errors={this.state.errors}/>
        )}
      </div>
    )
  }
}

export default SetDefenderRoleAPI;
