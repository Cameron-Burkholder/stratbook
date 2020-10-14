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
          component.props.alert("Success! You have joined the team.");
          this.props.updateAuthToken();
          break;
        default:
          component.setState({
            loading: false,
            errors: response.data.errors,
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.props.alert("An error has occurred while attempting to join team.", "ERROR");
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
