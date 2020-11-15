/* client/components/api/GeneralStatisticsAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";

/*
  @func: GetGeneralStatisticsAPI
  @desc: get general stats about a user
  @prop getAuthToken: function
  @state:
    stats: Object
    loading: Boolean
*/
class GeneralStatisticsAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchStats = this.fetchStats.bind(this);

    this.state = {
      stats: undefined,
      loading: true,
      hasLoaded: false
    }
  }
  fetchStats() {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get("/api/statistics/general")
      .then((response) => {
      switch (response.data.status) {
        case "GENERAL_STATS_FOUND":
          component.setState({
            loading: false,
            hasLoaded: true,
            stats: response.data.stats
          });
          console.log(response.data.stats);
          break;
        default:
          component.setState({
            loading: false,
            hasLoaded: true
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.setState({
        loading: false,
        hasLoaded: true
      });
      component.props.alert("An error has occurred while attempting to get general statistics", "ERROR");
    });
  }
  componentDidMount() {
    if (!this.state.hasLoaded) {
      this.fetchStats();
    }
  }
  render() {
    return (
      <div id="GeneralStatisticsAPI">
        <h2 className="statistics-title">Overview</h2>
        { this.state.loading ? (
          <Loading/>
        ) : (
          <div>
          { this.state.stats ? (
            <div className="statistics-container">
              <img className="user-image" alt="User Image" src={this.state.stats.avatar_url_256}/>
              <h3 className="stats-grid__heading">General</h3>
              <div className="stats-grid">
                <div className="stats-box">
                  <h4 className="stats__heading">Progression</h4>
                  <div className="stat stat--main">
                    <p className="stat__label">Level</p>
                    <span className="stat__value">{this.state.stats.progression.level}</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Playtime</p>
                    <span className="stat__value">{Math.floor(this.state.stats.stats.general.playtime / 3600)} Hrs</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Games Played</p>
                    <span className="stat__value">{this.state.stats.stats.general.games_played}</span>
                  </div>
                </div>
                <div className="stats-box">
                  <h4 className="stats__heading">Personal Performance</h4>
                  <div className="stat stat--main">
                    <p className="stat__label">K/D</p>
                    <span className="stat__value">{this.state.stats.stats.general.kd}</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Kills</p>
                    <span className="stat__value">{this.state.stats.stats.general.kills}</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Deaths</p>
                    <span className="stat-__alue">{this.state.stats.stats.general.deaths}</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Headshot %</p>
                    <span className="stat__value">{Math.round((this.state.stats.stats.general.headshots / this.state.stats.stats.general.kills) * 100)}%</span>
                  </div>
                </div>
                <div className="stats-box">
                  <h4 className="stats__heading">Team Performance</h4>
                  <div className="stat stat--main">
                    <p className="stat__label">W/L</p>
                    <span className="stat__value">{this.state.stats.stats.general.wl}</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Wins</p>
                    <span className="stat__value">{this.state.stats.stats.general.wins}</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Losses</p>
                    <span className="stat__value">{this.state.stats.stats.general.losses}</span>
                  </div>
                </div>
              </div>
              <h3 className="stats-grid__heading">Ranked</h3>
              <div className="stats-grid">
                <div className="stats-box">
                  <h4 className="stats__heading">Progression</h4>
                  <div className="stat">
                    <p className="stat__label">Playtime</p>
                    <span className="stat__value">{Math.floor(this.state.stats.stats.queue.ranked.playtime / 3600)} Hrs</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Games Played</p>
                    <span className="stat__value">{this.state.stats.stats.queue.ranked.games_played}</span>
                  </div>
                </div>
                <div className="stats-box">
                  <h4 className="stats__heading">Personal Performance</h4>
                  <div className="stat stat--main">
                    <p className="stat__label">K/D</p>
                    <span className="stat__value">{this.state.stats.stats.queue.ranked.kd}</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Kills</p>
                    <span className="stat__value">{this.state.stats.stats.queue.ranked.kills}</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Deaths</p>
                    <span className="stat__value">{this.state.stats.stats.queue.ranked.deaths}</span>
                  </div>
                </div>
                <div className="stats-box">
                  <h4 className="stats__heading">Team Performance</h4>
                  <div className="stat stat--main">
                    <p className="stat__label">W/L</p>
                    <span className="stat__value">{this.state.stats.stats.queue.ranked.wl}</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Wins</p>
                    <span className="stat__value">{this.state.stats.stats.queue.ranked.wins}</span>
                  </div>
                  <div className="stat">
                    <p className="stat__label">Losses</p>
                    <span className="stat__value">{this.state.stats.stats.queue.ranked.losses}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Unable to load statistics. Make sure your username matches the account for the platform you signed up with.</p>
          )}
          </div>
        )}
      </div>
    )
  }
}

export default GeneralStatisticsAPI;
