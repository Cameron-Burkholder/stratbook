/* client/components/api/LeaveTeamAPI.js */

import React from "react";
import axios from "axios";
import { TEAM_LEFT } from "../../messages/messages.js";
import { ERROR_LEAVE_TEAM } from "../../messages/errors.js";

/*
  @func: LeaveTeamAPI
  @desc: make request to server to leave team
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @state:
    name: String
*/
class LeaveTeamAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: false
    }
  }
  /*
    @func: onSubmit
    @desc: submit form data to server, rerender page depending on response
    @param e: Object.Event
  */
  onSubmit(e) {
    e.preventDefault();
    if (window.confirm("Are you sure you want to leave the team?")) {
      const component = this;
      this.setState({
        loading: true
      });
      axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
      axios.patch("/api/teams/leave-team")
        .then((response) => {
        switch (response.data.status) {
          case TEAM_LEFT.status:
            component.setState({
              loading: false,
            });
            component.props.alert("You have left the team.", "SUCCESS");
            this.props.updateAuthToken();
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
        component.props.alert(ERROR_LEAVE_TEAM.message, ERROR_LEAVE_TEAM.status);
      });
    }
  }
  render() {
    return (
      <div id="LeaveTeamAPI">
        <button onClick={this.onSubmit} className="button--danger">Leave Team</button>
      </div>
    )
  }
}

export default LeaveTeamAPI;
