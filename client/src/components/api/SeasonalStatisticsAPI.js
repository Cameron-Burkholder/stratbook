/* client/components/api/SeasonalStatisticsAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";

/*
  @func: SeasonalStatisticsAPI
  @desc: get seasonal stats about a user
  @prop getAuthToken: function
  @state:
    stats: Object
    loading: Boolean
*/
class SeasonalStatisticsAPI extends React.Component {
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
    axios.get("/api/statistics/seasonal")
      .then((response) => {
      switch (response.data.status) {
        case "SEASONAL_STATS_FOUND":
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
      <div id="SeasonalStatisticsAPI">
        <h2 className="statistics-title">Seasonal Performance</h2>
        { this.state.loading ? (
          <Loading/>
        ) : (
          <div>
          { this.state.stats ? (
            <div className="statistics">
              <p className="season-mmr">{this.state.stats.seasons.shadow_legacy.regions.ncsa[0].mmr} MMR</p>
              <p className="season-rank">{this.state.stats.seasons.shadow_legacy.regions.ncsa[0].rank_text}</p>
              <p className="season-kills">{this.state.stats.seasons.shadow_legacy.regions.ncsa[0].kills} Kills</p>
              <p className="season-deaths">{this.state.stats.seasons.shadow_legacy.regions.ncsa[0].deaths} Deaths</p>
              <p className="last-mmr-change">MMR Change: {this.state.stats.seasons.shadow_legacy.regions.ncsa[0].last_match_mmr_change}</p>
              <p className="season-wins">{this.state.stats.seasons.shadow_legacy.regions.ncsa[0].wins} Wins</p>
              <p className="season-losses">{this.state.stats.seasons.shadow_legacy.regions.ncsa[0].losses} Losses</p>
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

export default SeasonalStatisticsAPI;
