/* client/components/api/ViewTeamAPI.js */

import React from "react";
import axios from "axios";

import LoadingModal from "../partials/LoadingModal.js";
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
  render() {
    let contents;
    if (!this.state.loading) {
      if (this.state.error) {
        contents = <p>An error occurred while fetching the team. Please try again in a bit.</p>;
      } else {
        let teamMembers = [];
        let index = 0;
        this.state.team.admins.map((admin) => {
          teamMembers.push(<TeamMember username={admin.username} status={admin.status} attacker_role={admin.attacker_role} attackers={admin.attackers} defender_role={admin.defender_role} defenders={admin.defenders} key={index++}/>);
        });
        this.state.team.editors.map((editor) => {
          teamMembers.push(<TeamMember username={editor.username} status={editor.status} attacker_role={editor.attacker_role} attackers={editor.attackers} defender_role={editor.defender_role} defenders={editor.defenders} key={index++}/>);
        });
        this.state.team.members.map((member) => {
          teamMembers.push(<TeamMember username={member.username} status={member.status} attacker_role={member.attacker_role} attackers={member.attackers} defender_role={member.defender_role} defenders={member.defenders} key={index++}/>);
        })
        contents = (
          <div className="team">
            <h2 className="team-name">{this.state.team.name}</h2>
            <h3 className="team-description">{this.state.team.platform} - {this.state.team.join_code}</h3>
            <div className="roster">
              <h3>Roster</h3>
              <div className="team-member-accent">
                <h4 className="member-username">Username</h4>
                <p className="member-status">Status</p>
                <p className="member-quality">Attacking Role</p>
                <p className="member-quality">Defending Role</p>
              </div>
              { teamMembers }
            </div>
          </div>
        );
      }
    }
    return (
      <div id="ViewTeamAPI">
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

export default ViewTeamAPI;
