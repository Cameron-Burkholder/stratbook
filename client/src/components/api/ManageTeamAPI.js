/* client/src/components/api/ManageTeamAPI.js */

import React from "react";
import axios from "axios";
import { TEAM_FOUND } from "../../messages/messages.js";
import { USER_STATUS_UPDATED } from "../../messages/messages.js";
import { USER_BLOCKED } from "../../messages/messages.js";
import { ERROR_TEAM } from"../../messages/errors.js";
import { ERROR_UPDATE_USER_STATUS } from "../../messages/errors.js";
import { ERROR_BLOCK_USER } from "../../messages/errors.js";

import Loading from "../partials/Loading.js";
import ErrorLoading from "../partials/ErrorLoading.js";
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
        case TEAM_FOUND.status:
          component.setState({
            loading: false,
            team: response.data.team_data
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
        loading: false,
        error: true
      });
      component.props.alert(ERROR_TEAM.message, ERROR_TEAM.status);
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
        case USER_STATUS_UPDATED.status:
          component.setState({
            loading: false
          });
          component.fetchTeamData();
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
      component.props.alert(ERROR_UPDATE_USER_STATUS.message, ERROR_UPDATE_USER_STATUS.status);
    });
  }
  blockUser(username) {
    if (window.confirm(`You are about to block ${username} from the team. Are you sure?`)) {
      const component = this;
      this.setState({
        loading: true
      });
      axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
      axios.patch("/api/teams/block-user", {
        username: username
      })
        .then((response) => {
        switch (response.data.status) {
          case USER_BLOCKED.status:
            component.setState({
              loading: false
            });
            component.props.alert("SUCCESS", "User has been blocked successfully.");
            component.fetchTeamData();
            break;
          default:
            component.setState({
              loading: false,
            });
            component.props.alert(response.data.message, response.data.status);
            break;
        }
        setTimeout(() => {
          window.location.reload(false);
        }, 500);
      }).catch((error) => {
        console.log(error);
        component.setState({
          loading: false
        });
        component.props.alert(ERROR_BLOCK_USER.message, ERROR_BLOCK_USER.status);
      });
    }
  }
  render() {
    let contents = <Loading/>;
    if (!this.state.loading) {
      if (this.state.error) {
        contents = <ErrorLoading/>
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
          <Loading/>
        ) : (
          <div>
            <h3>Roster</h3>
            { contents }
          </div>
        )}
      </div>
    )
  }
}

export default ManageTeamAPI;
