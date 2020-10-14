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
        default:
          component.setState({
            loading: false,
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.setState({
        loading: false
      });
      component.props.alert("An error occurred while fetching team.", "ERROR");
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
        default:
          component.setState({
            loading: false,
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.setState({
        loading: false
      });
      component.props.alert("An error has occurred while attempting to update user status.", "ERROR");
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
