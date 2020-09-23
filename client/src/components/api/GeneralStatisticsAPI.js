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
          break;
        case "USER_NOT_FOUND":
        default:
          component.setState({
            loading: false,
            hasLoaded: true
          });
          break;
      }
    }).catch((error) => {
      console.log(error);
      alert("An error has occurred. Please try again shortly.");
      component.setState({
        loading: false,
        hasLoaded: true
      });
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
            <div className="statistics">
              <h3 className="username">{this.state.stats.username}</h3>
              <img className="user-image" alt="User Image" src={this.state.stats.avatar_url_256}/>
              <p className="level">Level {this.state.stats.progression.level}</p>
              <p className="ranked-kd">{this.state.stats.stats.queue.ranked.kd} KD</p>
              <p className="ranked-kills">{this.state.stats.stats.queue.ranked.kills} Kills</p>
              <p className="ranked-deaths">{this.state.stats.stats.queue.ranked.deaths} Deaths</p>
              <p className="ranked-games">{this.state.stats.stats.queue.ranked.games_played} Games Played</p>
              <p className="ranked-wl">{this.state.stats.stats.queue.ranked.wl} WL Ratio</p>
              <p className="ranked-wins">{this.state.stats.stats.queue.ranked.wins} Wins</p>
              <p className="ranked-losses">{this.state.stats.stats.queue.ranked.losses} Losses</p>
              <p className="ranked-playtime">{Math.floor(this.state.stats.stats.queue.ranked.playtime / 3600)} Hours</p>

              <p className="general-kd">{this.state.stats.stats.general.kd} KD</p>
              <p className="general-kills">{this.state.stats.stats.general.kills} Kills</p>
              <p className="general-deaths">{this.state.stats.stats.general.deaths} Deaths</p>
              <p className="general-games">{this.state.stats.stats.general.games_played} Games Played</p>
              <p className="general-headshots">{this.state.stats.stats.general.headshots} Headshot</p>
              <p className="general-playtime">{Math.floor(this.state.stats.stats.general.playtime / 3600)} Hours</p>
              <p className="general-wl">{this.state.stats.stats.general.wl} WL Ratio</p>
              <p className="general-wins">{this.state.stats.stats.general.wins} Wins</p>
              <p className="general-losses">{this.state.stats.stats.general.losses} Losses</p>
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
