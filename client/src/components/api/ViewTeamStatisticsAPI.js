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
        loading: false
      });
      component.props.alert("An error has occurred while attempting to view team statistics.", "ERROR");
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
        if (this.state.stats.team) {
          const teamMembers = this.state.stats.team.map((member) => {
            return (
              <TeamMemberStats username={member.username} kd={member.kd} wl={member.wl} mmr={member.mmr} mmrchange={member.mmrchange} level={member.level}/>
            )
          });
          contents = (
            <div className="team-statistics">
              <h3>Statistics</h3>
              <div className="overview">
                <p className="overview-label">Team Performance</p>
                <p className="team-stat"><span className="stat-label">Avg K/D</span>{this.state.stats.kd}</p>
                <p className="team-stat"><span className="stat-label">Avg W/L</span>{this.state.stats.wl}</p>
                <p className="team-stat"><span className="stat-label">Avg MMR</span>{this.state.stats.mmr}</p>
                <p className="team-stat"><span className="stat-label">Avg MMR Change</span>{this.state.stats.mmrchange}</p>
                <p className="team-stat"><span className="stat-label">Avg Level</span>{this.state.stats.level}</p>
              </div>
              <div className="member-statistics">
                <div className="team-member-stats--accent">
                  <h4 className="team-member-stats__username">Username</h4>
                  <p className="team-member-stats__stat">K/D</p>
                  <p className="team-member-stats__stat">W/L</p>
                  <p className="team-member-stats__stat">MMR</p>
                  <p className="team-member-stats__stat">MMR Change</p>
                  <p className="team-member-stats__stat">Level</p>
                </div>
                { teamMembers }
              </div>
            </div>
          );
        } else {
          contents = <p>An error has occurred</p>
        }
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
