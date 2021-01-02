/* client/components/api/UpdatePasswordAPI.js */

import React from "react";
import axios from "axios";
import { PASSWORD_UPDATED } from "../../messages/emails.js";
import { ERROR_UPDATE_PASSWORD } from "../../messages/errors.js";

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
        case PASSWORD_UPDATED.status:
          component.setState({
            loading: false,
          });
          component.props.alert("Your password has been updated.", "SUCCESS");
          this.props.updateAuthToken();
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
      component.props.alert(ERROR_UPDATE_PASSWORD.message, ERROR_UPDATE_PASSWORD.status);
    });
  }
  render() {
    return (
      <div className="update" id="UpdateUsernameAPI">
        <UpdatePasswordForm onSubmit={this.onSubmit} onChange={this.onChange} errors={this.state.errors} loading={this.state.loading}/>
      </div>
    )
  }
}

export default UpdatePasswordAPI;
