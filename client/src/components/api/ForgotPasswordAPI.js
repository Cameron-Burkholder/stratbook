/* client/components/api/ForgotPasswordAPI.js */

import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { PASSWORD_RESET_LINK_SENT } from "../../messages/messages.js";
import { ERROR_RESET_PASSWORD } from "../../messages/errors.js";

import ForgotPasswordForm from "../partials/ForgotPasswordForm.js";

/*
  @func: ForgotPasswordAPI
  @desc: manage state of ForgotPassword form and ForgotPassword requests to server
  @state:
    username: String
    email: String
    password1: String
    password2: String
    platform: String
    errors: Object
    loading: Boolean
*/
class ForgotPasswordAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      errors: {}
    }
  }
  /*
    @func: onChange
    @desc: update state of login field
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
    axios.patch("/api/users/forgot-password", {
      email: this.state.email
    }).then((response) => {
      switch (response.data.status) {
        case PASSWORD_RESET_LINK_SENT.status:
          component.setState({
            loading: false,
            redirect: "/login"
          });
          break;
        default:
          component.setState({
            loading: false,
            errors: response.data.errors,
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.props.alert(ERROR_RESET_PASSWORD.message, ERROR_RESET_PASSWORD.status);
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
    } else {
      return (
        <div id="ForgotPasswordAPI">
          <ForgotPasswordForm onSubmit={this.onSubmit} onChange={this.onChange} email={this.state.email} errors={this.state.errors} loading={this.state.loading}/>
        </div>
      )
    }
  }
}

export default ForgotPasswordAPI;
