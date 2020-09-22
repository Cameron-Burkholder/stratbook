/* client/components/api/LeaveTeamAPI.js */

import React from "react";
import axios from "axios";

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
          case "USER_LEFT_TEAM":
            component.setState({
              loading: false,
            });
            alert("Success! You have left the team.");
            this.props.updateAuthToken();
            break;
          case "ERROR_WHILE_LEAVING_TEAM":
            component.setState({
              loading: false,
              errors: {}
            });
            alert("An error occurred while creating your team. Please try again.");
            break;
          case "USER_NOT_VERIFIED":
            component.setState({
              loading: false
            });
            alert("You have not verified your account. You must verify your account in order to leave a team.");
            break;
          case "USER_HAS_NO_TEAM":
            component.setState({
              loading: false
            });
            alert("You do not have a team. You must be a part of a team to leave.");
            break;
          case "USER_DOES_NOT_EXIST":
            component.setState({
              loading: false
            });
            alert("No user with your account exists.");
            break;
          case "TEAM_DOES_NOT_EXIST":
            component.setState({
              loading: false
            });
            alert("The team you requested to leave does not exist.");
            break;
          default:
            component.setState({
              loading: false
            });
            alert("An unknown error has occurred");
            break;
        }
      }).catch((error) => {
        console.log(error);
        alert("An error has occurred. Please try again shortly.");
      });
    }
  }
  render() {
    return (
      <div id="LeaveTeamAPI">
        <button onClick={this.onSubmit}>Leave Team</button>
      </div>
    )
  }
}

export default LeaveTeamAPI;
