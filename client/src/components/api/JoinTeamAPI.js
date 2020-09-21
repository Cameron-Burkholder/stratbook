/* client/components/api/JoinTeamAPI.js */

import React from "react";
import axios from "axios";

import JoinTeamForm from "../partials/JoinTeamForm.js";

/*
  @func: JoinTeamAPI
  @desc: manage state of team name and make requests to server
  @prop getAuthToken: function
  @prop updateAuthToken: function
  @state:
    join_code: String
*/
class JoinTeamAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      join_code: "",
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
    axios.patch("/api/teams/join-team", {
      join_code: this.state.join_code
    }).then((response) => {
      switch (response.data.status) {
        case "TEAM_JOINED":
          component.setState({
            loading: false,
          });
          alert("Success! You have joined the team.");
          this.props.updateAuthToken();
          break;
        case "ERROR_WHILE_JOINING_TEAM":
          component.setState({
            loading: false,
            errors: {}
          });
          alert("An error occurred while joining the team. Please try again.");
          break;
        case "USER_NOT_VERIFIED":
          component.setState({
            loading: false
          });
          alert("You have not verified your account. You must verify your account in order to join a team.");
          break;
        case "USER_HAS_TEAM":
          component.setState({
            loading: false
          });
          alert("You already have a team. You cannot join a team if you already belong to one.");
          break;
        case "PLATFORM_DOES_NOT_MATCH":
          component.setState({
            loading: false
          });
          alert("The team you requested to join is for players that play on a different platform than you. Update your platform to join.");
          break;
        case "TEAM_DOES_NOT_EXIST":
          component.setState({
            loading: false
          });
          alert("The team you requested to join does not exist.");
          break;
        case "UNABLE_TO_JOIN_TEAM":
          component.setState({
            loading: false
          });
          alert("The attempt to join the team was unable to be completed.");
          break;
        case "INVALID_JOIN_CODE":
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
      <div id="JoinTeamAPI">
        <h3>Join a Team</h3>
        <JoinTeamForm onSubmit={this.onSubmit} onChange={this.onChange} errors={this.state.errors} loading={this.state.loading} join_code={this.state.join_code}/>
      </div>
    )
  }
}

export default JoinTeamAPI;
