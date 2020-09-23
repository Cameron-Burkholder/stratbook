/* client/components/api/OperatorStatisticsAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";
import Operator from "../partials/Operator.js";

/*
  @func: OperatorStatisticsAPI
  @desc: get operator stats about a user
  @prop getAuthToken: function
  @state:
    stats: Object
    loading: Boolean
*/
class OperatorStatisticsAPI extends React.Component {
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
    axios.get("/api/statistics/operators")
      .then((response) => {
      switch (response.data.status) {
        case "OPERATOR_STATS_FOUND":
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
    let operators = []
    if (this.state.stats) {
      this.state.stats.operators.map((operator, index) => {
        if (!operator.name.includes("Recruit")) {
          operators.push(<Operator image={operator.badge_image} name={operator.name} kd={operator.kd} kills={operator.kills} deaths={operator.deaths} wl={operator.wl} wins={operator.wins} losses={operator.losses} playtime={operator.playtime} hsp={operator.headshots / operator.kills} key={index}/>)
        }
      });
    }
    return (
      <div id="OperatorStatisticsAPI">
        <h2 className="statistics-title">Operators</h2>
        { this.state.loading ? (
          <Loading/>
        ) : (
          <div>
          { this.state.stats ? (
            <div className="statistics">
              { operators }
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

export default OperatorStatisticsAPI;
