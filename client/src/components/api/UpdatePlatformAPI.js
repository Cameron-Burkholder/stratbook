/* client/components/api/UpdatePlatformAPI.js */

import React from "react";
import axios from "axios";
import { PLATFORM_UPDATED } from "../../messages/messages.js";
import { ERROR_PLATFORM } from "../../messages/errors.js";

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
    }, this.onSubmit);
  }
  /*
    @func: onSubmit
    @desc: submit form data to server, rerender page depending on response
    @param e: Object.Event
  */
  onSubmit() {
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
        case PLATFORM_UPDATED.status:
          component.setState({
            loading: false,
          });
          component.props.alert("Your platform has been updated.", "SUCCESS");
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
      component.props.alert(ERROR_PLATFORM.message, ERROR_PLATFORM.status);
    });
  }
  render() {
    return (
      <div className="update" id="UpdatePlatformAPI">
        <UpdatePlatformForm onChange={this.onChange} platform={this.state.platform} errors={this.state.errors} loading={this.state.loading}/>
      </div>
    )
  }
}

export default UpdatePlatformAPI;
