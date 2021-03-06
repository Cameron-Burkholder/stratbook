/* client/src/components/api/ManageTeamAPI.js */

import React from "react";
import axios from "axios";
import { TEAM_FOUND } from "../../messages/messages.js";
import { USER_STATUS_UPDATED } from "../../messages/emails.js";
import { USER_BLOCKED } from "../../messages/messages.js";
import { TEAM_STATUS_UPDATED } from "../../messages/emails.js";
import { TEAM_PLATFORM_UPDATED } from "../../messages/messages.js";
import { TEAM_MMR_UPDATED } from "../../messages/messages.js";
import { ERROR_TEAM } from"../../messages/errors.js";
import { ERROR_UPDATE_USER_STATUS } from "../../messages/errors.js";
import { ERROR_BLOCK_USER } from "../../messages/errors.js";
import { ERROR_UPDATE_TEAM_STATUS } from "../../messages/errors.js";
import { ERROR_UPDATE_TEAM_PLATFORM } from "../../messages/errors.js";
import { ERROR_UPDATE_TEAM_MMR } from "../../messages/errors.js";
import { RANKS, MMR_THRESHOLDS } from "../../data.js";

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
    this.updateTeamStatus = this.updateTeamStatus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeTeamPlatform = this.changeTeamPlatform.bind(this);
    this.changeTeamMMR = this.changeTeamMMR.bind(this);

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
            team: response.data.team_data,
            status: (response.data.team_data.open ? "Allow New Members" : "No New Members"),
            platform: response.data.team_data.platform,
            mmr: response.data.team_data.mmr
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
        console.log(response.data);
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
  updateTeamStatus() {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch("/api/teams/update-team-status", {
      status: (component.state.status === "Allow New Members" ? true : false)
    })
      .then((response) => {
      switch (response.data.status) {
        case TEAM_STATUS_UPDATED.status:
          component.setState({
            loading: false,
            status: (response.data.open ? "Allow New Members" : "No New Members")
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
      component.props.alert(ERROR_UPDATE_TEAM_STATUS.message, ERROR_UPDATE_TEAM_STATUS.status);
    });
  }
  onChange(e) {
    this.setState({
      status: e.target.value
    }, this.updateTeamStatus);
  }
  changeTeamPlatform(e) {
    const component = this;
    this.setState({
      loading: true,
      platform: e.target.value
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch("/api/teams/update-team-platform", {
      platform: e.target.value
    })
      .then((response) => {
      switch (response.data.status) {
        case TEAM_PLATFORM_UPDATED.status:
          component.setState({
            loading: false,
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
      component.props.alert(ERROR_UPDATE_TEAM_PLATFORM.message, ERROR_UPDATE_TEAM_PLATFORM.status);
    });
  }
  changeTeamMMR(e) {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch("/api/teams/update-team-mmr", {
      mmr: RANKS[e.target.value]
    })
      .then((response) => {
      switch (response.data.status) {
        case TEAM_MMR_UPDATED.status:
          component.setState({
            loading: false,
          });
          component.props.alert("Your team MMR threshold has been updated.", "SUCCESS");
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
        loading: false,
        error: true
      });
      component.props.alert(ERROR_UPDATE_TEAM_MMR.message, ERROR_UPDATE_TEAM_MMR.status);
    });
  }
  render() {
    let contents = <Loading/>;
    if (!this.state.loading) {
      if (this.state.error) {
        contents = <ErrorLoading/>
      } else {
        let teamMembers = [];
        let index = 0;
        this.state.team.admins.forEach((admin) => {
          teamMembers.push(<ManageTeamMember username={admin.username} status={admin.status} updateUserStatus={this.updateUserStatus} blockUser={this.blockUser} key={index++}/>);
        });
        this.state.team.editors.forEach((editor) => {
          teamMembers.push(<ManageTeamMember username={editor.username} status={editor.status} updateUserStatus={this.updateUserStatus} blockUser={this.blockUser} key={index++}/>);
        });
        this.state.team.members.forEach((member) => {
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
            { contents }
            <div className="team-controls">
              <div className="team-status">
                <p>Team Status</p>
                <select onChange={this.onChange} value={this.state.status}>
                  <option>Allow New Members</option>
                  <option>No New Members</option>
                </select>
              </div>
              <div className="team-platform">
                <p>Team Platform</p>
                <select onChange={this.changeTeamPlatform} value={this.state.platform}>
                  <option>XBOX</option>
                  <option>PC</option>
                  <option>PS4</option>
                </select>
              </div>
              <div className="team-mmr">
                <p>MMR Threshold</p>
                <select onChange={this.changeTeamMMR} value={MMR_THRESHOLDS[this.state.mmr]}>
                  <option>None</option>
                  <option>Silver III</option>
                  <option>Silver II</option>
                  <option>Silver I</option>
                  <option>Gold III</option>
                  <option>Gold II</option>
                  <option>Gold I</option>
                  <option>Platinum III</option>
                  <option>Platinum II</option>
                  <option>Platinum I</option>
                  <option>Diamond</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ManageTeamAPI;
