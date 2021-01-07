/* client/components/api/ViewStrategiesAPI.js */

import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { STRATEGIES_FOUND, MAP_FOUND } from "../../messages/messages.js";
import { ERROR_VIEW_STRATEGIES, ERROR_VIEW_MAP } from "../../messages/errors.js";

import Editor from "../partials/Editor.js";
import Viewer from "../partials/Viewer.js";
import { Link } from "react-router-dom";

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
    this.fetchMap = this.fetchMap.bind(this);

    this.state = {
      map_name: this.props.map,
      loading: true,
      hasLoaded: false,
      errors: {},
    }
  }
  /*
    @func fetchStrategies
    @desc get strategies from server
  */
  fetchStrategies() {
    const component = this;
    this.setState({
      loading: true,
      add: false
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get("/api/strategies/view")
      .then((response) => {
      switch (response.data.status) {
        case STRATEGIES_FOUND.status:
          const maps = Object.keys(response.data.maps).filter((map) => MAP_NAMES.indexOf(map) >= 0);
          component.setState({
            loading: false,
            hasLoaded: true,
            maps: response.data.maps,
            map: undefined,
            map_name: undefined
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
      component.props.alert(ERROR_VIEW_STRATEGIES.message, ERROR_VIEW_STRATEGIES.status);
    });
  }
  fetchMap(map) {
    const component = this;
    this.setState({
      loading: true
    });
    let map_name = map ? map : this.state.map_name;
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get(`/api/strategies/view/${map_name.toLowerCase().replace(" ", "_")}`)
      .then((response) => {
        switch (response.data.status) {
          case MAP_FOUND.status:
            component.setState({
              loading: false,
              hasLoaded: true,
              map_name: map_name,
              map: response.data[map_name.toLowerCase()]
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
        component.props.alert(ERROR_VIEW_MAP.message, ERROR_VIEW_MAP.status);
      })
  }
  componentDidMount() {
    if (!this.state.hasLoaded) {
      if (this.state.map_name) {
        this.fetchMap();
      } else {
        this.fetchStrategies();
      }
    }
  }
  render() {
    let contents;
    if (this.state.loading) {
      contents = <LoadingModal message="Fetching Strategies"/>
    } else {
      if (this.state.map_name) {
        if (this.state.hasLoaded && this.state.map) {
          contents = <Viewer map={this.state.map} alert={this.props.alert} fetchStrategies={this.fetchStrategies}/>;
        } else {
          contents = "Waiting for server";
        }
      } else {
        const maps = this.state.maps.map((map, index) => {
          return (
            <Link to={`/strategies/${map}`} className="map-option" key={index} style={{ backgroundImage: `url(../../media/maps/${map.toUpperCase().replace(" ", "_")}-min.png)` }}
              onClick={() => { this.fetchMap(map) }}>
              <div className="map-overlay">
                { map.toUpperCase() }
              </div>
            </Link>
          )
        });
        contents = (
          <div className="view-container">
            <h1>View Strategies</h1>
            { this.props.status === "EDITOR" || this.props.status === "ADMIN" ? (
              <Link className="button" to="/strategies/edit">Edit Strategies</Link>
            ) : ""}
            <div className="map-selector">
              { maps.length > 0 ? maps : "No maps to show." }
            </div>
          </div>
        )
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
