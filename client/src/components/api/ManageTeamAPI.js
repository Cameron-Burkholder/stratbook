/* client/src/components/api/ManageTeamAPI.js */
/* client/components/api/ViewTeamAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";
import LoadingModal from "../partials/LoadingModal.js";
import ManageTeamMember from "../partials/ManageTeamMember.js";

/*
  @func: ManageTeamAPI
  @desc: manage state of team data
  @prop getAuthToken: function
  @prop updateAuthToken: function

*/
class ManageTeamAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchTeamData = this.fetchTeamData.bind(this);
    this.updateUserStatus = this.updateUserStatus.bind(this);
    this.blockUser = this.blockUser.bind(this);

    this.state = {
      team: {},
      loading: true
    }
  }
  /*
    @func: fetchTeamData
    @desc: get team data from server
  */
  fetchTeamData() {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get("/api/teams/view-team")
      .then((response) => {
      switch (response.data.status) {
        case "TEAM_FOUND":
          component.setState({
            loading: false,
            team: response.data.team
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
  componentDidMount() {
    if (!this.state.team.name) {
      this.fetchTeamData();
    }
  }
  updateUserStatus(username, status) {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch("/api/users/update-user-status", {
      username: username,
      status: status
    })
      .then((response) => {
      switch (response.data.status) {
        case "USER_STATUS_UPDATED":
          component.setState({
            loading: false
          });
          break;
        case "ERROR_WHILE_UPDATING_USER_STATUS":
          component.setState({
            loading: false,
          });
          alert("An error occurred while updating the user status.");
          break;
        case "USER_NOT_VERIFIED":
          component.setState({
            loading: false
          });
          alert("You have not verified your account. You must verify your account in order to update the status of a user.");
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
          alert("You are not qualified to update the status of a user.");
          break;
        case "USER_NOT_FOUND":
          component.setState({
            loading: false
          });
          alert("The user you requested to update does not exist.");
          break;
        case "PERMISSION_DENIED":
          component.setState({
            loading: false
          });
          alert("You do not have permission to update the status of this user.");
          break;
        case "USER_HAS_NO_TEAM":
          component.setState({
            loading: false
          });
          alert("The user you requested to update is not on a team.");
          break;
        case "INVALID_STATUS_INPUT":
        default:
          component.setState({
            loading: false,
          });
          alert("The input was invalid for updating the user status.");
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
  blockUser(username) {

  }
  render() {
    let contents = <Loading/>;
    if (!this.state.loading) {
      if (this.state.error) {
        contents = <p>An error occurred while fetching the team. Please try again in a bit.</p>;
      } else {
        let teamMembers = [];
        let index = 0;
        this.state.team.admins.map((admin) => {
          teamMembers.push(<ManageTeamMember username={admin.username} status={admin.status} updateUserStatus={this.updateUserStatus} blockUser={this.blockUser} key={index++}/>);
        });
        this.state.team.editors.map((editor) => {
          teamMembers.push(<ManageTeamMember username={editor.username} status={editor.status} updateUserStatus={this.updateUserStatus} blockUser={this.blockUser} key={index++}/>);
        });
        this.state.team.members.map((member) => {
          teamMembers.push(<ManageTeamMember username={member.username} status={member.status} updateUserStatus={this.updateUserStatus} blockUser={this.blockUser} key={index++}/>);
        })
        contents = (
          <div className="team">
            { teamMembers }
          </div>
        );
      }
    }
    return (
      <div id="ManageTeamAPI">
        { this.state.loading ? (
          <LoadingModal/>
        ) : (
          <div>
            { contents }
          </div>
        )}
      </div>
    )
  }
}

export default ManageTeamAPI;
