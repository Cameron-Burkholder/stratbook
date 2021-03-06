/* client/components/api/RegisterAPI.js */

import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { USER_REGISTERED } from "../../messages/emails.js";
import { ERROR_REGISTER } from "../../messages/errors.js";

import RegisterForm from "../partials/RegisterForm.js";

/*
  @func: RegisterAPI
  @desc: manage state of register form and register requests to server
  @state:
    username: String
    email: String
    password1: String
    password2: String
    platform: String
    errors: Object
    loading: Boolean
*/
class RegisterAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      platform: "XBOX",
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
    axios.post("/api/users/register", {
      username: this.state.username,
      email: this.state.email,
      platform: this.state.platform,
      password1: this.state.password1,
      password2: this.state.password2
    }).then((response) => {
      switch (response.data.status) {
        case USER_REGISTERED.status:
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
      component.props.alert(ERROR_REGISTER.message, ERROR_REGISTER.status);
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
    } else {
      return (
        <div id="RegisterAPI">
          <RegisterForm onSubmit={this.onSubmit} onChange={this.onChange} email={this.state.email} password1={this.state.password1} password2={this.state.platform2} platform={this.state.platform} errors={this.state.errors} loading={this.state.loading}/>
        </div>
      )
    }
  }
}

export default RegisterAPI;
