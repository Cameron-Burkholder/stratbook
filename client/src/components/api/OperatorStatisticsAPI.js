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
    this.sortOperators = this.sortOperators.bind(this);

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
            stats: response.data.stats,
            operators: response.data.stats.operators
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
  sortOperators(e) {
    let operators = [...this.state.stats.operators];
    switch (e.target.id.toUpperCase()) {
      case "RELEASE":
        operators = operators;
        break;
      case "NAME":
        operators = operators.sort((a, b) => { return (a.name > b.name) ? 1 : -1 });
        break;
      case "KD":
        operators = operators.sort((a, b) => { return (a.kd > b.kd) ? -1 : 1 });
        break;
      case "PLAYTIME":
        operators = operators.sort((a, b) => { return (a.playtime > b.playtime) ? -1 : 1 });
        break;
    }
    this.setState({
      operators: operators
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
      this.state.operators.map((operator, index) => {
        if (!operator.name.includes("Recruit")) {
          operators.push(<Operator image={operator.badge_image} name={operator.name} kd={Math.round(operator.kd * 100) / 100} kills={operator.kills} deaths={operator.deaths} wl={Math.round(operator.wl * 100) / 100} wins={operator.wins} losses={operator.losses} playtime={Math.round(operator.playtime * 100) / 100} hsp={Math.round(operator.headshots / operator.kills * 100) / 100} key={index}/>)
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
              <button onClick={this.sortOperators} className="sort-by" id="release">Sort By Release</button>
              <button onClick={this.sortOperators} className="sort-by" id="name">Sort By Name</button>
              <button onClick={this.sortOperators} className="sort-by" id="kd">Sort By KD</button>
              <button onClick={this.sortOperators} className="sort-by" id="playtime">Sort By Playtime</button>
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
