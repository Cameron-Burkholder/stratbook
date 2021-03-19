/* client/components/api/SeasonalStatisticsAPI.js */

import React from "react";
import axios from "axios";
import { SEASONAL_STATS_FOUND } from "../../messages/messages.js";

import Loading from "../partials/Loading.js";
import { CURRENT_SEASON } from "../../data.js";

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
      hasLoaded: false,
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
        case SEASONAL_STATS_FOUND.status:
          component.setState({
            loading: false,
            hasLoaded: true,
            stats: response.data.stats
          });
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
      component.props.alert("An error has occurred while attempting to get seasonal statistics.", "ERROR");
    });
  }
  componentDidMount() {
    if (!this.state.hasLoaded) {
      this.fetchStats();
    }
  }
  render() {
    const season_arr = CURRENT_SEASON.split("_");
    const season = season_arr[0].charAt(0).toUpperCase() + season_arr[0].slice(1) + " " + season_arr[1].charAt(0).toUpperCase() + season_arr[1].slice(1);
    console.log(this.state.stats);
    return (
      <div id="SeasonalStatisticsAPI" className="statistics-api">
        <h2 className="statistics-title">Operation {season}</h2>
        <h3 className="statistics-title">Seasonal Performance</h3>
        { this.state.loading ? (
          <Loading/>
        ) : (
          <div>
          { this.state.stats ? (
            <div className="statistics">
              <div className="stat--main">
                <h3 className="stat__value">{this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].rank_text}</h3>
                <p className="stat__label">{this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].mmr} MMR</p>
                <p className="stat__label stat__label--secondary">MMR Change: {this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].last_match_mmr_change}</p>
              </div>
              <div className="stat">
                <h3 className="stat__value--main">{Math.floor(100 * (this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].kills / this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].deaths)) / 100} KD</h3>
                <p className="stat__label">Kills</p>
                <h4 className="stat__value">{this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].kills}</h4>
                <p className="stat__label">Deaths</p>
                <h4 className="stat__value">{this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].deaths}</h4>
                <p className="stat__label">K/D Spread</p>
                <h4 className="stat__value">{this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].kills - this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].deaths}</h4>
              </div>
              <div className="stat">
                <h3 className="stat__value--main">{Math.floor(100 * (this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].wins / this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].losses)) / 100} WL</h3>
                <p className="stat__label">Wins</p>
                <h4 className="stat__value">{this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].wins}</h4>
                <p className="stat__label">Losses</p>
                <h4 className="stat__value">{this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].losses}</h4>
                <p className="stat__label">W/L Spread</p>
                <h4 className="stat__value">{this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].wins - this.state.stats.seasons[CURRENT_SEASON].regions.ncsa[0].losses}</h4>
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

export default SeasonalStatisticsAPI;
