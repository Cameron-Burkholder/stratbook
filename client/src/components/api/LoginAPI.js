/* client/components/api/LoginAPI.js */

import React from "react";
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
        case "INVALID_LOGIN":
          component.setState({
            errors: response.data.errors,
            loading: false
          });
          break;
        case "USER_NOT_FOUND":
          component.setState({
            errors: {
              user: "User not found."
            },
            loading: false
          });
          break;
        case "INCORRECT_PASSWORD":
          component.setState({
            errors: {
              password: "Incorrect password."
            },
            loading: false
          });
          break;
        case "TOKEN_ISSUED":
          component.setState({
            loading: false
          })
          component.props.login(response.data.token, response.data.expiresIn);
          break;
      }
    }).catch((error) => {
      console.log(error);
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
