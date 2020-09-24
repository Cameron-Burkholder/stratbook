/* client/components/api/UpdatePasswordAPI.js */

import React from "react";
import axios from "axios";

import UpdatePasswordForm from "../partials/UpdatePasswordForm.js";

/*
  @func: UpdatePasswordAPI
  @desc: manage state of update password form and requests to server
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @state:
    password1: String
    password2: String
*/
class UpdatePasswordAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      password1: "",
      password2: "",
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
    axios.patch("/api/users/update-password", {
      password1: this.state.password1,
      password2: this.state.password2
    }).then((response) => {
      switch (response.data.status) {
        case "PASSWORD_UPDATED":
          component.setState({
            loading: false,
          });
          alert("Success! Your password has been updated.");
          this.props.updateAuthToken();
          break;
        case "ERROR_WHILE_UPDATING_PASSWORD":
          component.setState({
            loading: false,
            errors: {}
          });
          alert("An error occurred while updating password. Please try again.");
        case "INVALID_PASSWORD_INPUT":
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
      <div id="UpdateUsernameAPI">
        <UpdatePasswordForm onSubmit={this.onSubmit} onChange={this.onChange} errors={this.state.errors} loading={this.state.loading}/>
      </div>
    )
  }
}

export default UpdatePasswordAPI;