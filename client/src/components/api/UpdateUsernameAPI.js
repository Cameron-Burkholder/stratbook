/* client/components/api/UpdateUsernameAPI.js */

import React from "react";
import axios from "axios";
import { USERNAME_UPDATED } from "../../messages/emails.js";
import { ERROR_USERNAME } from "../../messages/errors.js";

import UpdateUsernameForm from "../partials/UpdateUsernameForm.js";

/*
  @func: UpdateUsernameAPI
  @desc: manage state of update platform form and requests to server
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @prop username: String
  @state:
    username: String
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
        case USERNAME_UPDATED.status:
          component.setState({
            loading: false,
          });
          component.props.alert("Your username has been updated.", "SUCCESS");
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
      component.props.alert(ERROR_USERNAME.message, ERROR_USERNAME.status);
    });
  }
  render() {
    return (
      <div className="update" id="UpdateUsernameAPI">
        <UpdateUsernameForm onSubmit={this.onSubmit} onChange={this.onChange} username={this.state.username} errors={this.state.errors} loading={this.state.loading}/>
      </div>
    )
  }
}

export default UpdateUsernameAPI;
