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
      hasLoaded: false,
      season: "shadow_legacy"
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
          console.log(response.data);
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
    return (
      <div id="SeasonalStatisticsAPI">
        <h2 className="statistics-title">Seasonal Performance</h2>
        { this.state.loading ? (
          <Loading/>
        ) : (
          <div>
          { this.state.stats ? (
            <div className="statistics">
              <div className="stat stat--main">
                <h3 className="stat__value">{this.state.stats.seasons[this.state.season].regions.ncsa[0].rank_text}</h3>
                <p className="stat__label">{this.state.stats.seasons[this.state.season].regions.ncsa[0].mmr} MMR</p>
                <p className="stat__label stat__label--secondary">MMR Change: {this.state.stats.seasons[this.state.season].regions.ncsa[0].last_match_mmr_change}</p>
              </div>
              <div className="stat">
                <h3 className="stat__value--main">{Math.floor(100 * (this.state.stats.seasons[this.state.season].regions.ncsa[0].kills / this.state.stats.seasons[this.state.season].regions.ncsa[0].deaths)) / 100} KD</h3>
                <p className="stat__label">Kills</p>
                <h4 className="stat__value">{this.state.stats.seasons[this.state.season].regions.ncsa[0].kills}</h4>
                <p className="stat__label">Deaths</p>
                <h4 className="stat__value">{this.state.stats.seasons[this.state.season].regions.ncsa[0].deaths}</h4>
              </div>
              <div className="stat">
                <h3 className="stat__value--main">{Math.floor(100 * (this.state.stats.seasons[this.state.season].regions.ncsa[0].wins / this.state.stats.seasons[this.state.season].regions.ncsa[0].losses)) / 100} WL</h3>
                <p className="stat__label">Wins</p>
                <h4 className="stat__value">{this.state.stats.seasons[this.state.season].regions.ncsa[0].wins}</h4>
                <p className="stat__label">Losses</p>
                <h4 className="stat__value">{this.state.stats.seasons[this.state.season].regions.ncsa[0].losses}</h4>
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
