/* client/components/api/CreateStrategiesAPI.js */

import React from "react";
import axios from "axios";

import LoadingModal from "../partials/LoadingModal.js";

import { MAP_NAMES, SITES, FLOORS, GADGETS, UTILITY_GUIDE } from "../../data.js";
import { MAP_ADDED } from "../../messages/messages.js";
import { ERROR_ADD_MAP } from "../../messages/errors.js";

/*
  @func: CreateStrategiesAPI
  @desc: manage state of new strategies and make requests to server
  @prop getAuthToken: function
  @prop alert: function
  @prop fetchStrategies: function
  @state:
    name: String
*/
class CreateStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.selectMap = this.selectMap.bind(this);
    this.addMap = this.addMap.bind(this);

    this.state = {
      maps: MAP_NAMES.filter((map) => this.props.maps.indexOf(map.toLowerCase().replace(" ", "_")) < 0)
    }
  }
  selectMap(name) {
    if (MAP_NAMES.indexOf(name) >= 0) {
      let map = {
        name: name,
        attack: []
      };
      let attackStrategy = {
        name: "Unnamed",
        roles: ["ROLE", "ROLE", "ROLE", "ROLE", "ROLE"],
        operators: ["OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR"],
        utility: ["UTILITY", "UTILITY", "UTILITY", "UTILITY", "UTILITY"],
        gadgets: ["", "", "", "", ""]
      };
      SITES[name].map((site) => {
        attackStrategy[site] = [
          {
            objectives: [],
            utilityPositions: [[], [], [], [], []],
            gadgetPositions: [[], [], [], [], []],
            breaches: [],
            operatorPositions: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
            drones: [],
            notes: "",
            name: "Unnamed"
          }
        ]
      });
      map.attack.push(attackStrategy);
      let defenseStrategy = {};
      SITES[name].map((site) => {
        defenseStrategy[site] = [
          {
            name: "Unnamed",
            roles: ["ROLE", "ROLE", "ROLE", "ROLE", "ROLE"],
            operators: ["OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR"],
            utility: ["UTILITY", "UTILITY", "UTILITY", "UTILITY", "UTILITY"],
            gadgets: ["", "", "", "", ""],
            reinforcements: [],
            rotates: [],
            utilityPositions: [[], [], [], [], []],
            gadgetPositions: [[], [], [], [], []],
            scenes: [
              {
                objectives: [],
                operatorPositions: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
                notes: "",
                name: "Unnamed"
              }
            ]
          }
        ]
      });
      map.defense = defenseStrategy;
      this.setState({
        map: map,
      }, this.addMap);
    }
  }
  addMap() {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.post(`/api/strategies/add/${this.state.map.name.toLowerCase().replace(" ", "_")}`, {
      map: JSON.stringify(this.state.map)
      })
      .then((response) => {
        switch (response.data.status) {
          case MAP_ADDED.status:
            component.setState({
              loading: false,
            });
            component.props.alert("You have successfully added a map to your Stratbook.", "SUCCESS");
            component.props.fetchStrategies();
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
        component.props.alert(ERROR_ADD_MAP.message, ERROR_ADD_MAP.status);
      });
  }

  render() {
    const maps = this.state.maps.map((map, index) => {
      return (
        <div className="map-option" key={index} style={{ backgroundImage: `url(../../media/maps/${map.toUpperCase().replace(" ", "_")}-min.png)`}}
          onClick={() => { this.selectMap(map.toUpperCase()) }}>
          <div className="map-overlay">
            { map }
          </div>
        </div>
      )
    });
    return (
      <div id="CreateStrategiesAPI">
        { this.state.loading ? (
          <LoadingModal message="Adding Map to Stratbook"/>
        ) : (
          <div className="add-map">
            <h1>Create Strategy</h1>
            <h4>Add a map to your Stratbook</h4>
            <div className="map-selector">
              { maps.length > 0 ? maps : <p>There are no maps to add to your Stratbook. Your Stratbook contains all the available maps.</p> }
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default CreateStrategiesAPI;
