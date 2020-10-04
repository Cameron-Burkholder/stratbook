/* client/components/api/ViewStrategiesAPI.js */

import React from "react";
import { Redirect } from "react-router";
import axios from "axios";

import LoadingModal from "../partials/LoadingModal.js";
import Pagination from "../partials/Pagination.js";
import Strategy from "../partials/Strategy.js";

/*
  @func: ViewStrategiesAPI
  @desc: manage state of strategies page and make requests to server
  @prop team_code: String
  @prop getAuthToken: function
  @state:
    strategies: Object
    index: Int
    loading: Boolean
*/
class ViewStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchStrategies = this.fetchStrategies.bind(this);
    this.selectStrategy = this.selectStrategy.bind(this);
    this.exitStrategy = this.exitStrategy.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      strategies: [],
      index: 0,
      loading: true,
      hasLoaded: false,
      listView: true,
      search: ""
    }
  }
  /*
    @func selectStrategy
    @desc choose a strategy
  */
  selectStrategy(index) {
    this.setState({
      index: index,
      listView: false
    });
  }
  /*
    @func exitStrategy
    @desc go back to list view
  */
  exitStrategy() {
    this.setState({
      listView: true
    })
  }
  /*

  */
  onChange(e) {
    this.setState({
      search: e.target.value
    });
  }
  /*
    @func fetchStrategies
    @desc get strategies from server
  */
  fetchStrategies() {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get("/api/strategies/view")
      .then((response) => {
      switch (response.data.status) {
        case "STRATEGIES_FOUND":
          component.setState({
            loading: false,
            hasLoaded: true,
            strategies: response.data.strategies
          });
          break;
        case "ERROR_WHILE_GETTING_STRATEGIES":
          component.setState({
            loading: false,
            error: true
          });
          break;
        case "USER_NOT_VERIFIED":
          component.setState({
            loading: false
          });
          alert("You have not verified your account. You must verify your account in order to view strategies.");
          break;
        case "USER_HAS_NO_TEAM":
          component.setState({
            loading: false
          });
          alert("You do not have a team. You must have a team to view strategies.");
          break;
        case "TEAM_DOES_NOT_EXIST":
          component.setState({
            loading: false
          });
          alert("The team you requested to view strategies for does not exist.");
          break;
        case "USER_NOT_QUALIFIED":
          component.setState({
            loading: false
          });
          alert("You are not qualified to view the strategies you have requested.");
          break;
        default:
          component.setState({
            loading: false,
            error: true
          });
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
    if (!this.state.hasLoaded) {
      this.fetchStrategies();
    }
  }
  render() {
    let contents;
    if (this.state.loading) {
      contents = <LoadingModal/>
    } else {
      if (this.props.team_code && this.props.team_code !== "") {
        if (this.state.strategies.length > 0) {
          const strats = this.state.strategies.map((strat, index) => {
            if (this.state.search === "" || strat.name.toUpperCase().includes(this.state.search.toUpperCase())) {
              return (
                <div className="strategy-preview" key={index}>
                  <h3 className="strategy-preview-heading" onClick={() => { this.selectStrategy(index) }}>{strat.name}</h3>
                  <p className="strategy-preview-type">{strat.type}</p>
                </div>
              )
            }
          });
          contents = (this.state.listView) ? (
            <div className="strategy-list">
              <input className="strategy-search" onChange={this.onChange} value={this.state.search} type="text" placeholder="Search Strategies"/>
              { strats }
            </div>
          ) : (
            <Strategy strategy={this.state.strategies[this.state.index]} exitStrategy={this.exitStrategy}/>
          )
        } else {
          contents = <p>Your team does not currently have any strategies.</p>
        }
      } else {
        contents = <p>You do not belong to a team at this time. In order to view strategies, you must be a part of a team.</p>
      }

    }
    return (
      <div id="ViewStrategiesAPI">
        { contents }
      </div>
    )
  }
}

export default ViewStrategiesAPI;
