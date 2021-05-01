/* client/components/api/ViewTeamAPI.js */

import React from "react";
import axios from "axios";
import { TEAM_FOUND } from "../../messages/messages.js";
import { ERROR_VIEW_TEAM } from "../../messages/errors.js";

import Loading from "../partials/Loading.js";
import ErrorLoading from "../partials/ErrorLoading.js";
import TeamMember from "../partials/TeamMember.js";

/*
  @func: ViewTeamAPI
  @desc: manage state of team data
  @prop getAuthToken: function
  @prop updateAuthToken: function

*/
class ViewTeamAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchTeamData = this.fetchTeamData.bind(this);

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
            loading: false
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
      component.props.alert(ERROR_VIEW_TEAM.message, ERROR_VIEW_TEAM.status);
    });
  }
  componentDidMount() {
    if (!this.state.team.name) {
      this.fetchTeamData();
    }
  }
  render() {
    let contents;
    if (!this.state.loading) {
      if (this.state.error) {
        contents = <ErrorLoading/>
      } else {
        let teamMembers = [];
        let index = 0;
        if (this.state.team) {
          this.state.team.admins.map((admin) => {
            teamMembers.push(<TeamMember username={admin.username} status={admin.status} attacker_role={admin.attacker_role} attackers={admin.attackers} defender_role={admin.defender_role} defenders={admin.defenders} key={index++} premium={admin.premium}/>);
          });
          this.state.team.editors.map((editor) => {
            teamMembers.push(<TeamMember username={editor.username} status={editor.status} attacker_role={editor.attacker_role} attackers={editor.attackers} defender_role={editor.defender_role} defenders={editor.defenders} key={index++} premium={editor.premium}/>);
          });
          this.state.team.members.map((member) => {
            teamMembers.push(<TeamMember username={member.username} status={member.status} attacker_role={member.attacker_role} attackers={member.attackers} defender_role={member.defender_role} defenders={member.defenders} key={index++} premium={member.premium}/>);
          })
          contents = (
            <div className="team">
              <h2 className="team-name">{this.state.team.name}</h2>
              <h3 className="team-description">{this.state.team.platform} - {this.state.team.join_code}</h3>
              <div className="roster">
                <h3>Roster</h3>
                { teamMembers }
              </div>
            </div>
          );
        } else {
          contents = <ErrorLoading/>
        }
      }
    }
    return (
      <div id="ViewTeamAPI">
        { this.state.loading ? (
          <Loading/>
        ) : (
          <div>
            { contents }
          </div>
        )}
      </div>
    )
  }
}

export default ViewTeamAPI;
