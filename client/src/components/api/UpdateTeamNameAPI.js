/* client/src/components/api/UpdateTeamNameAPI.js */

import React from "react";
import axios from "axios";
import Loading from "../partials/Loading.js";

class UpdateTeamNameAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchTeamName = this.fetchTeamName.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      loading: true,
      currentName: "",
      newName: ""
    }
  }
  fetchTeamName() {
    const component = this;
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get("/api/teams/view-team")
      .then((response) => {
      switch (response.data.status) {
        case "TEAM_FOUND":
          component.setState({
            loading: false,
            currentName: response.data.team.name
          });
          break;
        case "ERROR_WHILE_GETTING_TEAM":
          component.setState({
            loading: false,
            team: {},
            error: true
          });
          break;
        case "USER_NOT_VERIFIED":
          component.setState({
            loading: false
          });
          alert("You have not verified your account. You must verify your account in order to view team.");
          break;
        case "USER_HAS_NO_TEAM":
          component.setState({
            loading: false
          });
          alert("You do not have a team. You must have a team to view team.");
          break;
        case "TEAM_DOES_NOT_EXIST":
          component.setState({
            loading: false
          });
          alert("The team you requested to view does not exist.");
          break;
        case "USER_NOT_QUALIFIED":
          component.setState({
            loading: false
          });
          alert("You are not qualified to view the team you have requested.");
          break;
        default:
          component.setState({
            loading: false,
            error: true
          });
          break;
      }
    }).catch((error) => {
      console.log(error);
      alert("An error has occurred. Please try again shortly.");
      component.setState({
        loading: false
      });
    });
  }
  onChange(e) {
    this.setState({
      newName: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const component = this;
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch("/api/teams/update-name", {
      name: this.state.newName
    })
      .then((response) => {
      switch (response.data.status) {
        case "TEAM_NAME_UPDATED":
          component.setState({
            loading: false,
            currentName: component.state.newName
          });
          break;
        case "ERROR_WHILE_UPDATING_TEAM_NAME":
          component.setState({
            loading: false,
          });
          alert("An error occurred while updating the team name.");
          break;
        case "USER_NOT_VERIFIED":
          component.setState({
            loading: false
          });
          alert("You have not verified your account. You must verify your account in order to change the team name.");
          break;
        case "USER_HAS_NO_TEAM":
          component.setState({
            loading: false
          });
          alert("You do not have a team. You must have a team to change the team name.");
          break;
        case "TEAM_DOES_NOT_EXIST":
          component.setState({
            loading: false
          });
          alert("The team you requested to update does not exist.");
          break;
        case "USER_NOT_QUALIFIED":
          component.setState({
            loading: false
          });
          alert("You are not qualified to update the team name.");
          break;
        case "INVALID_TEAM_INPUT":
        case "PROFANE_TEAM_INPUT":
        default:
          component.setState({
            loading: false,
          });
          alert("The name input is invalid or inappropriate.");
          break;
      }
    }).catch((error) => {
      console.log(error);
      alert("An error has occurred. Please try again shortly.");
      component.setState({
        loading: false
      });
    });
  }
  componentDidMount() {
    if (this.state.loading) {
      this.fetchTeamName();
    }
  }
  render() {
    return (
      <div id="UpdateTeamNameAPI">
      { this.state.loading ? (
        <Loading/>
      ) : (
        <div>
          <h2 className="current-name">Current Name: {this.state.currentName}</h2>
          <div id="update-name-group">
            <input className="team-name-input" onChange={this.onChange} id="newName" type="text" value={this.state.newName} placeholder={this.state.currentName}/>
            <button className="team-name-button" onClick={this.onSubmit}>Update Name</button>
          </div>
        </div>
      )}
      </div>
    )
  }
}

export default UpdateTeamNameAPI;
