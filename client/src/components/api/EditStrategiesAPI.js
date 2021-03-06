/* client/src/components/api/EditStrategiesAPI.js */

import React from "react";
import axios from "axios";
import { STRATEGIES_FOUND, MAP_FOUND, MAP_UPDATED, MAP_DELETED, STRATEGY_SHARED, STRATEGY_UNSHARED } from "../../messages/messages.js";
import { ERROR_VIEW_STRATEGIES, ERROR_VIEW_MAP, ERROR_UPDATE_MAP, ERROR_DELETE_MAP, ERROR_SHARED_STRATEGY, ERROR_UNSHARE_STRATEGY } from "../../messages/errors.js";

import CreateStrategiesAPI from "./CreateStrategiesAPI";
import LoadingModal from "../partials/LoadingModal.js";
import Editor from "../partials/Editor.js";
import { Link } from "react-router-dom";
import { SITES } from "../../data.js";

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
    this.shareStrategy = this.shareStrategy.bind(this);
    this.unshareStrategy = this.unshareStrategy.bind(this);

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
      loading: true,
      position: undefined
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
  updateStrategy(map, position) {
    const component = this;
    this.setState({
      loading: true,
      position: position
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
            }, () => {
              this.props.alert("Your strategy has been updated.", "SUCCESS");
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
  shareStrategy(strategy, map, position) {
    const component = this;
    this.setState({
      loading: true,
      position: position
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.post(`/api/strategies/share`, {
      strategy: strategy
      })
      .then((response) => {
        switch (response.data.status) {
          case STRATEGY_SHARED.status:
            component.setState({
              loading: false,
            }, () => {
              if (position.type === "ATTACK") {
                map.attack[SITES[map.name][position.siteIndex]][position.strategyIndex].shared_key = response.data.shared_key;
              } else {
                map.defense[SITES[map.name][position.siteIndex]][position.strategyIndex].shared_key = response.data.shared_key;
              }
              this.updateStrategy(JSON.stringify(map), position);
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
        component.props.alert(ERROR_SHARED_STRATEGY.message, ERROR_SHARED_STRATEGY.status);
      })
  }
  unshareStrategy(shared_key, map, position) {
    const component = this;
    this.setState({
      loading: true,
      position: position
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch(`/api/strategies/unshare`, {
      shared_key: shared_key
      })
      .then((response) => {
        switch (response.data.status) {
          case STRATEGY_UNSHARED.status:
            component.setState({
              loading: false,
            }, () => {
              this.updateStrategy(JSON.stringify(map), position);
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
        component.props.alert(ERROR_UNSHARE_STRATEGY.message, ERROR_UNSHARE_STRATEGY.status);
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
          contents = <Editor function="Editor" map={this.state.map} alert={this.props.alert} save={this.updateStrategy} shareStrategy={this.shareStrategy} unshareStrategy={this.unshareStrategy}
          fetchStrategies={this.fetchStrategies} position={this.state.position}/>;
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
            <Link to={`/strategies/edit/${map}`} className="map-option" key={index} style={{ backgroundImage: `url(../../media/min/maps/${map.toUpperCase().replace(" ", "_")}.png)` }}
              onClick={() => { this.fetchMap(map) }}>
              <div className="map-overlay">
                { map.toUpperCase().replace("_", " ") }
              </div>
              <div className="edit-strategy-button-container">
                <button className="delete-button" onClick={(e) => { this.deleteMap(e, map) }}><i className="fa fa-trash"></i></button>
              </div>
            </Link>
          )
        });
        contents = (
          <div className="edit-container">
            <h1>Edit Strategies</h1>
            <Link className="button" to="/strategies">Back to view</Link>
            <div className="edit-buttons">
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
