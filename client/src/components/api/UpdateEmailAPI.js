/* client/components/api/UpdateEmailAPI.js */

import React from "react";
import axios from "axios";
import { EMAIL_UPDATED } from "../../messages/messages.js";
import { ERROR_EMAIL } from "../../messages/errors.js";

import UpdateEmailForm from "../partials/UpdateEmailForm.js";

/*
  @func: UpdateEmailAPI
  @desc: manage state of update email form and requests to server
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @prop email: String
  @state:
    email: String
*/
class UpdateEmailAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: this.props.email,
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
    axios.patch("/api/users/update-email", {
      email: this.state.email
    }).then((response) => {
      switch (response.data.status) {
        case EMAIL_UPDATED.status:
          component.setState({
            loading: false,
          });
          component.props.alert("Your email has been updated.", "SUCCESS");
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
      component.props.alert(ERROR_EMAIL.message, ERROR_EMAIL.status);
    });
  }
  render() {
    return (
      <div className="update" id="UpdateEmailAPI">
        <UpdateEmailForm onSubmit={this.onSubmit} onChange={this.onChange} email={this.state.email} errors={this.state.errors} loading={this.state.loading}/>
      </div>
    )
  }
}

export default UpdateEmailAPI;
