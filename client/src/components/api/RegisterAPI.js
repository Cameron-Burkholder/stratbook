/* client/components/api/RegisterAPI.js */

import React from "react";
import axios from "axios";

import RegisterForm from "../partials/RegisterForm.js";

/*
  @func: RegisterAPI
  @desc: manage state of register form and register requests to server
  @state:
    name: String
    email: String
    password1: String
    password2: String
    errors: Object
    loading: Boolean
*/
class RegisterAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
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
      name: this.state.name,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2
    }).then((response) => {
      switch (response.data.status) {
        case "INVALID_REGISTRATION":
          component.setState({
            errors: response.data.errors,
            loading: false
          });
          break;
        case "EXISTING_USER":
          component.setState({
            errors: {
              user: "An account with that email already exists."
            },
            loading: false
          });
          break;
        case "UNABLE_TO_REGISTER":
          component.setState({
            errors: {
              user: "Unable to register. Try again later."
            },
            loading: false
          });
          break;
        case "USER_REGISTERED":
          component.setState({
            loading: false
          });
          break;
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div id="RegisterAPI">
        <RegisterForm onSubmit={this.onSubmit} onChange={this.onChange} email={this.state.email} password={this.state.password} errors={this.state.errors} loading={this.state.loading}/>
      </div>
    )
  }
}

export default RegisterAPI;
