/* client/components/api/ViewTeamStatisticsAPI.js */

import React from "react";
import axios from "axios";

import LoadingModal from "../partials/LoadingModal.js";
import TeamMemberStats from "../partials/TeamMemberStats.js";

/*
  @func: ViewTeamStatisticsAPI
  @desc: view team stats
  @prop getAuthToken: function
  @prop updateAuthToken: function

*/
class ViewTeamStatisticsAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchTeamData = this.fetchTeamStats.bind(this);

    this.state = {
      stats: undefined,
      loading: true
    }
  }
  /*
    @func: fetchTeamData
    @desc: get team data from server
  */
  fetchTeamStats() {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get("/api/statistics/team")
      .then((response) => {
      switch (response.data.status) {
        case "TEAM_STATS_FOUND":
          component.setState({
            loading: false,
            stats: {
              team: response.data.team,
              kd: response.data.kd,
              wl: response.data.wl,
              mmr: response.data.mmr,
              mmrchange: response.data.mmrchange,
              level: response.data.level
            }
          });
          break;
        case "ERROR_WHILE_GETTING_TEAM_STATS":
          component.setState({
            loading: false,
          });
          alert("An error occurred while getting team statistics.");
          break;
        case "USER_HAS_NO_TEAM":
          component.setState({
            loading: false
          });
          alert("You do not have a team. You must have a team to view statistics.");
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
        default:
          component.setState({
            loading: false,
            error: true
          });
          alert("An unknown error has occurred.");
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
    if (!this.state.stats) {
      this.fetchTeamStats();
    }
  }
  render() {
    let contents;
    if (!this.state.loading) {
      if (this.state.error) {
        contents = <p>An error occurred while fetching the team statistics. Please try again in a bit.</p>;
      } else {
        let index = 0;
        const teamMembers = this.state.stats.team.map((member) => {
          return (
            <TeamMemberStats username={member.username} kd={member.kd} wl={member.wl} mmr={member.mmr} mmrchange={member.mmrchange} level={member.level}/>
          )
        });
        contents = (
          <div className="team-statistics">
            <h3>Statistics</h3>
            <div className="overview">
              <p>Team Performance</p>
              <p className="team-stat">{this.state.stats.kd} KD</p>
              <p className="team-stat">{this.state.stats.wl} WL</p>
              <p className="team-stat">{this.state.stats.mmr} MMR</p>
              <p className="team-stat">{this.state.stats.mmrchange} MMR Change</p>
              <p className="team-stat">Level {this.state.stats.level}</p>
            </div>
            <div className="member-statistics">
              { teamMembers }
            </div>
          </div>
        );
      }
    }
    return (
      <div id="ViewTeamStatisticsAPI">
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

export default ViewTeamStatisticsAPI;
