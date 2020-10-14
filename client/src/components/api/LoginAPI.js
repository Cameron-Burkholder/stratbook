/* client/components/api/LoginAPI.js */

import React from "react";
import { Redirect } from "react-router";
import axios from "axios";

import LoginForm from "../partials/LoginForm.js";

/*
  @func: LoginAPI
  @desc: manage state of login form and login requests to server
  @prop login: function
  @state:
    email: String
    password: String
    errors: Object
    loading: Boolean
*/
class LoginAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      password: "",
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
    axios.post("/api/users/login", {
      email: this.state.email,
      password: this.state.password
    }).then((response) => {
      switch (response.data.status) {
        case "TOKEN_ISSUED":
          component.setState({
            loading: false,
          });
          component.props.login(response.data.token, response.data.expiresIn, response.data.user);
          break;
        default:
          component.setState({
            loading: false,
            errors: response.data.errors
          });
          component.props.alert(response.message.status, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.props.alert("An error has occurred while attempting to log in.", "ERROR");
    });
  }
  render() {
    return (
      <div id="LoginAPI">
        <LoginForm onSubmit={this.onSubmit} onChange={this.onChange} email={this.state.email} password={this.state.password} errors={this.state.errors} loading={this.state.loading}/>
      </div>
    )
  }
}

export default LoginAPI;
