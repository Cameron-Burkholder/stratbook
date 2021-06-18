/* client/components/api/ViewTeamAPI.js */

import React from "react";
import axios from "axios";
import { TEAM_FOUND } from "../../messages/messages.js";
import { ERROR_VIEW_TEAM } from "../../messages/errors.js";
import { TEAM_STATS_FOUND } from "../../messages/messages.js";
import { ERROR_TEAM_STATS } from "../../messages/errors.js";

import Loading from "../partials/Loading.js";
import ErrorLoading from "../partials/ErrorLoading.js";
import TeamMember from "../partials/TeamMember.js";
import ProgressCircle from "../partials/ProgressCircle.js";

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
    this.fetchTeamStats = this.fetchTeamStats.bind(this);

    this.state = {
      team: {},
      stats: undefined,
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
      loading: true,
      stats_loaded: false
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
          this.fetchTeamStats();
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
  fetchTeamStats() {
    const component = this;
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get("/api/statistics/team")
      .then((response) => {
      switch (response.data.status) {
        case TEAM_STATS_FOUND.status:
          component.setState({
            stats: {
              individual_stats: response.data.team,
              kd: response.data.kd,
              wl: response.data.wl,
              mmr: response.data.mmr,
              mmrchange: response.data.mmrchange,
              level: response.data.level
            },
            stats_loaded: true
          });
          break;
        default:
          component.setState({
            loading: false,
            stats: {
              kd: "Not found",
              wl: "Not found",
              mmr: "Not found",
              individual_stats: []
            }
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
      component.props.alert(ERROR_TEAM_STATS.message, ERROR_TEAM_STATS.status);
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
        let stats = (this.state.stats_loaded ? (
          {
            level: "Not found",
            kd: "Not found",
            wl: "Not found",
            mmr: "Not found",
            mmrchange: "Not found"
          }
        ) : (
          {
            level: "Loading",
            kd: "Loading",
            wl: "Loading",
            mmr: "Loading",
            mmrchange: "Loading"
          }
        ));
        if (this.state.team) {
          this.state.team.admins.map((admin, index) => {
            if (this.state.stats) {
              this.state.stats.individual_stats.map((stat) => {
                if (stat && stat.username === admin.username) {
                  return stats = stat;
                }
              })
            }
            teamMembers.push(<TeamMember username={admin.username} status={admin.status} attacker_role={admin.attacker_role} attackers={admin.attackers} defender_role={admin.defender_role} defenders={admin.defenders} key={index++} premium={admin.premium} stats={stats}/>);
          });
          this.state.team.editors.map((editor, index) => {
            if (this.state.stats) {
              this.state.stats.individual_stats.map((stat) => {
                if (stat && stat.username === editor.username) {
                  return stats = stat;
                }
              })
            }
            teamMembers.push(<TeamMember username={editor.username} status={editor.status} attacker_role={editor.attacker_role} attackers={editor.attackers} defender_role={editor.defender_role} defenders={editor.defenders} key={index++} premium={editor.premium} stats={stats}/>);
          });
          this.state.team.members.map((member, index) => {
            if (this.state.stats) {
              this.state.stats.individual_stats.map((stat) => {
                if (stat && stat.username === member.username) {
                  return stats = stat;
                }
              })
            }
            teamMembers.push(<TeamMember username={member.username} status={member.status} attacker_role={member.attacker_role} attackers={member.attackers} defender_role={member.defender_role} defenders={member.defenders} key={index++} premium={member.premium} stats={stats}/>);
          })
          contents = (
            <div className="team">
              <h2 className="team-name">{this.state.team.name}</h2>
              <h3 className="team-description">{this.state.team.platform} - {this.state.team.join_code}
                <button className="toggle__button" onClick={() => {
                  const temp = document.createElement("textarea");
                  temp.value = this.state.team.join_code;
                  document.body.appendChild(temp);
                  temp.select();
                  temp.setSelectionRange(0, 99999);
                  document.execCommand("copy");
                  document.body.removeChild(temp);
                  this.props.alert("The join code for your team has been copied to your clipboard.", "Team Code Copied");
                }}>&#128203;</button>
              </h3>
              { this.state.stats ? (
                <div className="overview">
                  <ProgressCircle value={this.state.stats.kd} icon={"fa-user-ninja"} label="K/D"/>
                  <ProgressCircle value={this.state.stats.wl} icon={"fa-crown"} label="W/L"/>
                  <ProgressCircle value={this.state.stats.mmr} icon={"fa-signal"} label="MMR"/>
                </div>
              ) : ""}
              <div className="roster">
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
