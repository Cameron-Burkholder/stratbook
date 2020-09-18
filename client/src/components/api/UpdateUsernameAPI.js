/* client/components/api/UpdateUsernameAPI.js */

import React from "react";
import { Redirect } from "react-router";
import axios from "axios";

import UpdateUsernameForm from "../partials/UpdateUsernameForm.js";

/*
  @func: UpdateUsernameAPI
  @desc: manage state of update platform form and requests to server
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @prop username: String
  @state:
    platform: String
*/
class UpdateUsernameAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: this.props.username,
      errors: {}
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
    });
  }
  /*
    @func: onSubmit
    @desc: submit form data to server, rerender page depending on response
    @param e: Object.Event
  */
  onSubmit(e) {
    e.preventDefault();
    const component = this;
    this.setState({
      errors: {},
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch("/api/users/update-username", {
      username: this.state.username
    }).then((response) => {
      switch (response.data.status) {
        case "USERNAME_UPDATED":
          component.setState({
            loading: false,
          });
          alert("Success! Your username has been updated.");
          this.props.updateAuthToken();
          break;
        case "ERROR_WHILE_UPDATING_USERNAME":
          component.setState({
            loading: false,
            errors: {}
          });
          alert("An error occurred while updating username. Please try again.");
        default:
          component.setState({
            loading: false,
            errors: response.data.errors,
            status: response.data.status
          });
          break;
      }
    }).catch((error) => {
      console.log(error);
      alert("An error has occurred. Please try again shortly.");
    });
  }
  render() {
    return (
      <div id="UpdatePlatformAPI">
        <UpdateUsernameForm onSubmit={this.onSubmit} onChange={this.onChange} username={this.state.username} errors={this.state.errors} loading={this.state.loading}/>
      </div>
    )
  }
}

export default UpdateUsernameAPI;
