/* client/components/api/OperatorStatisticsAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";
import OperatorStatistics from "../partials/OperatorStatistics.js";

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
    this.searchOperators = this.searchOperators.bind(this);
    this.toggleRows = this.toggleRows.bind(this);

    this.state = {
      stats: undefined,
      loading: true,
      hasLoaded: false,
      search: "",
      rows: false,
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
        default:
          component.setState({
            loading: false,
            hasLoaded: true
          });
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.setState({
        loading: false,
        hasLoaded: true
      });
      component.props.alert("An error has occurred while attempting to get operator statistics.", "ERROR");
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
  searchOperators(e) {
    e.preventDefault();
    this.setState({
      search: e.target.value
    });
  }
  toggleRows() {
    this.setState({
      rows: !this.state.rows
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
        if (!operator.name.includes("Recruit") && (this.state.search === "" || operator.name.toUpperCase().includes(this.state.search.toUpperCase()))) {
          operators.push(<OperatorStatistics image={operator.badge_image} name={operator.name} kd={Math.round(operator.kd * 100) / 100} kills={operator.kills} deaths={operator.deaths} wl={Math.round(operator.wl * 100) / 100} wins={operator.wins} losses={operator.losses} playtime={Math.round(operator.playtime * 100) / 100} hsp={Math.round(operator.headshots / operator.kills * 100) / 100} key={index}/>)
        }
      });
    }
    return (
      <div id="OperatorStatisticsAPI" className={"statistics-api" + (this.state.rows ? " statistics-api--rows" : "")}>
        <h2 className="statistics-title">Operators</h2>
        { this.state.loading ? (
          <Loading/>
        ) : (
          <div>
          { this.state.stats ? (
            <div className="statistics">
              <div className="controls">
                <input onChange={this.searchOperators} value={this.state.search} placeholder="Search By Name"/>
                <button onClick={this.sortOperators} id="release">Sort By Release</button>
                <button onClick={this.sortOperators} id="name">Sort By Name</button>
                <button onClick={this.sortOperators} id="kd">Sort By KD</button>
                <button onClick={this.sortOperators} id="playtime">Sort By Playtime</button>
                <button onClick={this.toggleRows} id="rows">{ this.state.rows ? "Display Cards" : "Display Rows" }</button>
              </div>
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
