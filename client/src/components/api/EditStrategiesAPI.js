/* client/src/components/api/EditStrategiesAPI.js */

import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { STRATEGIES_FOUND, MAP_FOUND, MAP_UPDATED, MAP_DELETED } from "../../messages/messages.js";
import { ERROR_VIEW_STRATEGIES, ERROR_VIEW_MAP, ERROR_UPDATE_MAP, ERROR_DELETE_MAP } from "../../messages/errors.js";

import CreateStrategiesAPI from "./CreateStrategiesAPI";
import LoadingModal from "../partials/LoadingModal.js";
import ErrorLoading from "../partials/ErrorLoading.js";
import Editor from "../partials/Editor.js";
import { Link } from "react-router-dom";
import { MAP_NAMES } from "../../data.js";

/*
  @prop getAuthToken: function
  @prop alert: function
*/
class EditStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.addMap = this.addMap.bind(this);
    this.fetchStrategies = this.fetchStrategies.bind(this);
    this.fetchMap = this.fetchMap.bind(this);
    this.updateStrategy = this.updateStrategy.bind(this);
    this.deleteMap = this.deleteMap.bind(this);

    this.state = {
      map_name: this.props.map,
      loading: true,
      hasLoaded: false,
      add: false,
      errors: {},
    }
  }
  addMap() {
    this.setState({
      add: !this.state.add
    });
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
  updateStrategy(map) {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch(`/api/strategies/update/${this.state.map.name.toLowerCase().replace(" ", "_")}`, {
      map: map
      })
      .then((response) => {
        switch (response.data.status) {
          case MAP_UPDATED.status:
            component.setState({
              loading: false,
            });
            break;
          default:
            component.setState({
              loading: false,
            }, component.props.fetchStrategies);
            component.props.alert(response.data.message, response.data.status);
            break;
        }
      }).catch((error) => {
        console.log(error);
        component.setState({
          loading: false,
          hasLoaded: true
        });
        component.props.alert(ERROR_UPDATE_MAP.message, ERROR_UPDATE_MAP.status);
      })
  }
  deleteMap(e, map) {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`You are about to remove ${map.toUpperCase()} from your team's Stratbook. If you decide to add this map again, it will not restore the data currently stored. Are you sure?`)) {
      const component = this;
      this.setState({
        loading: true
      });
      axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
      axios.delete(`/api/strategies/delete/${map.toLowerCase().replace(" ", "_")}`)
        .then((response) => {
          switch (response.data.status) {
            case MAP_DELETED.status:
              component.setState({
                loading: false,
              });
              component.props.alert("You have deleted the requested map", "SUCCESS");
              component.fetchStrategies();
              break;
            default:
              component.setState({
                loading: false,
              }, component.props.fetchStrategies);
              component.props.alert(response.data.message, response.data.status);
              break;
          }
        }).catch((error) => {
          console.log(error);
          component.setState({
            loading: false,
            hasLoaded: true
          });
          component.props.alert(ERROR_DELETE_MAP.message, ERROR_DELETE_MAP.status);
        })
    }
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
    } else if (this.state.add) {
      contents = (
        <div className="add-strategy">
          <button id="cancel" onClick={this.addMap}>Cancel</button>
          <CreateStrategiesAPI getAuthToken={this.props.getAuthToken} alert={this.props.alert} maps={this.state.maps} fetchStrategies={this.fetchStrategies}/>
        </div>
      )
    } else {
      if (this.state.map_name) {
        if (this.state.hasLoaded && this.state.map) {
          contents = <Editor map={this.state.map} alert={this.props.alert} save={this.updateStrategy} fetchStrategies={this.fetchStrategies}/>;
        } else {
          contents = (
            <div>
              <Link className="button" to="/strategies">Back to view</Link>
              <button className="button" onClick={this.addMap}>Add Map</button>
            </div>
          )
        }
      } else {
        const maps = this.state.maps.map((map, index) => {
          return (
            <Link to={`/strategies/edit/${map}`} className="map-option" key={index} style={{ backgroundImage: `url(../../media/maps/${map.toUpperCase().replace(" ", "_")}.png)` }}
              onClick={() => { this.fetchMap(map) }}>
              <div className="map-overlay">
                { map.toUpperCase() }
              </div>
              <button className="delete-button" onClick={(e) => { this.deleteMap(e, map) }}>&#128465;</button>
            </Link>
          )
        });
        contents = (
          <div className="edit-container">
            <h1>Edit Strategies</h1>
            <div className="edit-buttons">
              <Link className="button" to="/strategies">Back to view</Link>
              <button className="button" onClick={this.addMap}>Add Map</button>
            </div>
            <div className="map-selector">
              { maps.length > 0 ? maps : "No maps to show." }
            </div>
          </div>
        )
      }
    }
    return (
      <div id="EditStrategiesAPI">
        { contents }
      </div>
    )
  }
}

export default EditStrategiesAPI;
