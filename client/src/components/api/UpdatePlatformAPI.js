/* client/components/api/UpdatePlatformAPI.js */

import React from "react";
import { Redirect } from "react-router";
import axios from "axios";

import UpdatePlatformForm from "../partials/UpdatePlatformForm.js";

/*
  @func: UpdatePlatformAPI
  @desc: manage state of update platform form and requests to server
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @prop platform: String
  @state:
    platform: String
*/
class UpdatePlatformAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      platform: this.props.platform,
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
    axios.patch("/api/users/update-platform", {
      platform: this.state.platform
    }).then((response) => {
      switch (response.data.status) {
        case "PLATFORM_UPDATED":
          component.setState({
            loading: false,
          });
          alert("Success! Your platform has been updated.");
          this.props.updateAuthToken();
          break;
        case "ERROR_WHILE_UPDATING_PLATFORM":
          component.setState({
            loading: false,
            errors: {}
          });
          alert("An error occurred while updating platform. Please try again.");
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
        <UpdatePlatformForm onSubmit={this.onSubmit} onChange={this.onChange} platform={this.state.platform} errors={this.state.errors} loading={this.state.loading}/>
      </div>
    )
  }
}

export default UpdatePlatformAPI;
