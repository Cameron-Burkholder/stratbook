/* client/components/api/CreateStrategiesAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";
import MapSelector from "../partials/MapSelector.js";
import SiteSelector from "../partials/SiteSelector.js";
import TypeSelector from "../partials/TypeSelector.js";
import Pagination from "../partials/Pagination.js";
import LineupForm from "../partials/LineupForm.js";

/*
  @func: CreateStrategiesAPI
  @desc: manage state of new strategies and make requests to server
  @prop getAuthToken: function
  @prop alert: function
  @prop fetchStrategies: function
  @state:
    name: String
*/
const MAP_NAMES = ["BANK", "BORDER", "CHALET", "CLUBHOUSE", "COASTLINE", "CONSULATE", "KAFE DOSTOYEVSKY", "KANAL", "OREGON", "OUTBACK", "THEME PARK", "VILLA"];
const SITES = {
  "BANK": ["B Lockers/B CCTV Room", "2F Executive Lounge/2F CEO Office", "1F Teller's Office/1F Archives", "1F Staff Room/1F Open Area"]
};
const FLOORS = {
  "BANK": ["Basement", "First Floor", "Second Floor"]
};
class CreateStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.toggleForm = this.toggleForm.bind(this);
    this.selectMap = this.selectMap.bind(this);
    this.selectSite = this.selectSite.bind(this);
    this.updateType = this.updateType.bind(this);
    this.decrementStrategy = this.decrementStrategy.bind(this);
    this.incrementStrategy = this.incrementStrategy.bind(this);
    this.updateRoles = this.updateRoles.bind(this);
    this.updateOperators = this.updateOperators.bind(this);
    this.updateUtility = this.updateUtility.bind(this);

    this.state = {
      form: false,
    }
  }
  /*
    @func: toggleForm
    @desc: toggle state of form
  */
  toggleForm() {
    this.setState({
      form: !this.state.form
    });
  }
  selectMap(e) {
    if (MAP_NAMES.indexOf(e.target.value) >= 0) {
      let map = {
        name: e.target.value,
        attack: []
      };
      let attackStrategy = {
        name: "",
        roles: ["ANY", "ANY", "ANY", "ANY", "ANY"],
        operators: ["", "", "", "", ""],
        utility: ["ANY", "ANY", "ANY", "ANY", "ANY"],
        gadgets: ["", "", "", "", ""]
      };
      SITES[e.target.value].map((site) => {
        attackStrategy[site] = [
          {
            objectives: [],
            utilityPositions: [{x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}],
            gadgetPositions: [{x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}],
            operatorPositions: [{x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}],
            execution: ""
          }
        ]
      });
      map.attack.push(attackStrategy);
      let defenseStrategy = {};
      SITES[e.target.value].map((site) => {
        defenseStrategy[site] = [
          {
            name: "",
            roles: ["ANY", "ANY", "ANY", "ANY", "ANY"],
            operators: ["", "", "", "", ""],
            utility: ["ANY", "ANY", "ANY", "ANY", "ANY"],
            gadgets: ["", "", "", "", ""],
            scenes: [
              {
                objectives: [],
                utilityPositions: [{x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}],
                gadgetPositions: [{x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}],
                operatorPositions: [{x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}],
                execution: ""
              }
            ]
          }
        ]
      });
      map.defense = defenseStrategy;
      this.setState({
        map: map,
        sites: SITES[map.name],
        site: SITES[map.name][0],
        siteIndex: 0,
        strategyIndex: 0,
        strategies: map.attack,
        sceneIndex: 0,
        scenes: map.attack[0][SITES[map.name][0]],
        floors: FLOORS[map.name],
        floorIndex: 0,
        type: "ATTACK",
      });
    }
  }
  selectSite(e) {
    this.setState({
      site: e.target.value
    });
  }
  updateType(e) {
    if (e.target.value === "ATTACK") {
      this.setState({
        type: "ATTACK",
        site: this.state.sites[0],
        siteIndex: 0,
        strategies: this.state.map.attack,
        strategyIndex: 0,
        scenes: this.state.map.attack[0][this.state.sites[0]],
        sceneIndex: 0,
        floorIndex: 0
      });
    } else {
      this.setState({
        type: "DEFENSE",
        site: this.state.sites[0],
        siteIndex: 0,
        strategies: this.state.map.defense[this.state.sites[0]],
        strategyIndex: 0,
        scenes: this.state.map.defense[this.state.sites[0]].scenes,
        sceneIndex: 0,
        floorIndex: 0
      });
    }
  }
  decrementStrategy() {
    if (this.state.strategyIndex - 1 >= 0) {
      this.setState({
        strategyIndex: this.state.strategyIndex - 1
      });
    }
  }
  incrementStrategy() {
    if (this.state.strategyIndex + 1 < this.state.strategies.length) {
      this.setState({
        strategyIndex: this.state.strategyIndex + 1
      });
    }
  }
  updateRoles(e, index) {

  }
  updateOperators(e, index) {

  }
  updateUtility(e, index) {

  }
  render() {
    console.log(this.state);
    return (
      <div id="CreateStrategiesAPI">
        <h4 className="create-strategy-heading" onClick={this.toggleForm}>Create a Strategy</h4>
        { this.state.loading ? (
          <Loading/>
        ) : (
          <div>
            { this.state.form ? (
              <div className="add-map">
                { !this.state.map || this.state.map === "" ? (
                  <MapSelector selectMap={this.selectMap} maps={this.props.maps}/>
                ) : (
                  <div className="add-map__form">
                    <h2 className="add-map__heading">{this.state.map.name}</h2>
                    <TypeSelector updateType={this.updateType} type={this.state.type}/>
                    <div className="add-map__header">
                      <div>
                        <SiteSelector selectSite={this.selectSite} map={this.state.map.name} site={this.state.site}/>
                        <Pagination index={this.state.strategyIndex} title="Strategy"
                          decrement={this.decrementStrategy} increment={this.incrementStrategy}/>
                        <h3 className="add-map__strategy-heading"></h3>
                      </div>
                      <div>
                        <LineupForm type={this.state.type}
                          roles={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex].roles
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].roles ))}
                          operators={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex].operators
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].operators))}
                          utility={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex].utility
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].operators))}
                          updateRoles={this.updateRoles} updateOperators={this.updateOperators} updateUtility={this.updateUtility}/>
                      </div>
                    </div>
                    <div className="add-map__body">
                      {/* <Blueprint/> */
                      /* <Toolbar/> */}
                    </div>
                    {/* <Objectives/> */
                    /* <Execution/> */}
                  </div>
                )}
              </div>
            ) : "" }
          </div>
        )}
      </div>
    )
  }
}

export default CreateStrategiesAPI;
