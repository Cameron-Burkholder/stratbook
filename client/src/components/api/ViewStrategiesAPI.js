/* client/components/api/ViewStrategiesAPI.js */

import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { STRATEGIES_FOUND } from "../../messages/messages.js";
import { ERROR_VIEW_STRATEGIES } from "../../messages/errors.js";

import LoadingModal from "../partials/LoadingModal.js";
import ErrorLoading from "../partials/ErrorLoading.js";
import { MAP_NAMES } from "../../data.js";

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
      strategies: {},
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
        case STRATEGIES_FOUND.status:
          component.setState({
            loading: false,
            hasLoaded: true,
            maps: response.data.maps
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
        loading: false,
        error: true
      });
      component.props.alert(ERROR_VIEW_STRATEGIES.message, ERROR_VIEW_STRATEGIES.status);
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
      contents = <LoadingModal message="Fetching Strategies"/>
    } else {
      if (this.state.error) {
        contents = <ErrorLoading/>
      } else {
        if (this.props.team_code && this.props.team_code !== "") {
          if (this.state.maps.length > 0) {
            contents = (this.state.listView) ? (
              <div className="strategy-list">
                <input className="strategy-search" onChange={this.onChange} value={this.state.search} type="text" placeholder="Search Strategies"/>
              </div>
            ) : (
              <p></p>
            )
          } else {
            contents = <p>Your team does not currently have any strategies.</p>
          }
        } else {
          contents = <p>You do not belong to a team at this time. In order to view strategies, you must be a part of a team.</p>
        }
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
