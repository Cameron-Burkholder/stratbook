/* client/src/components/api/TeamAnnouncementAPI.js */

import React from "react";
import axios from "axios";
import Loading from "../partials/Loading.js";
import { ANNOUNCEMENT_SENT } from "../../messages/messages.js";
import { ERROR_ANNOUNCE } from "../../messages/errors.js";

class TeamAnnouncementAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: false,
      message: ""
    }
  }
  onChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.post("/api/teams/announce", {
      announcement: this.state.message
    })
      .then((response) => {
      switch (response.data.status) {
        case ANNOUNCEMENT_SENT.status:
          component.setState({
            loading: false,
            message: ""
          });
          component.props.alert(ANNOUNCEMENT_SENT.message, "SUCCESS");
          break;
        default:
          component.setState({
            loading: false
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.setState({
        loading: false
      });
      component.props.alert(ERROR_ANNOUNCE.message, ERROR_ANNOUNCE.status);
    });
  }
  render() {
    return (
      <div id="TeamAnnouncementAPI">
      { this.state.loading ? (
        <Loading/>
      ) : (
        <div>
          <h3>Make Announcement</h3>
          <div className="announcement-input">
            <textarea onChange={this.onChange} type="text" value={this.state.message} rows={5}/>
            <button onClick={this.onSubmit}>Send</button>
          </div>
        </div>
      )}
      </div>
    )
  }
}

export default TeamAnnouncementAPI;
