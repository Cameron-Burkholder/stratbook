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
        component.props.alert("An error has occurred while attempting to leave team.", "ERROR");
      });
    }
  }
  render() {
    return (
      <div id="LeaveTeamAPI">
        <button onClick={this.onSubmit} className="form__button form__button--submit">Leave Team</button>
      </div>
    )
  }
}

export default LeaveTeamAPI;
