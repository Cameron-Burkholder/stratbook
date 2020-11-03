/* client/components/api/CreateStrategiesAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";
import MapSelector from "../partials/MapSelector.js";
import SiteSelector from "../partials/SiteSelector.js";
import TypeSelector from "../partials/TypeSelector.js";
import Pagination from "../partials/Pagination.js";
import LineupForm from "../partials/LineupForm.js";
import BlueprintForm from "../partials/BlueprintForm.js";
import FloorSelector from "../partials/FloorSelector.js";
import Toolbar from "../partials/Toolbar.js";

import { MAP_NAMES, SITES, FLOORS, GADGETS } from "../../data.js";

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

    this.toggleForm = this.toggleForm.bind(this);
    this.selectMap = this.selectMap.bind(this);
    this.selectSite = this.selectSite.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateRoles = this.updateRoles.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateFloor = this.updateFloor.bind(this);

    // Strategies
    this.decrementStrategy = this.decrementStrategy.bind(this);
    this.incrementStrategy = this.incrementStrategy.bind(this);
    this.addStrategy = this.addStrategy.bind(this);
    this.removeStrategy = this.removeStrategy.bind(this);

    // Scenes
    this.incrementScene = this.incrementScene.bind(this);
    this.decrementScene = this.decrementScene.bind(this);
    this.addScene = this.addScene.bind(this);
    this.removeScene = this.removeScene.bind(this);

    // Operators
    this.updateOperators = this.updateOperators.bind(this);
    this.updateOperatorPositions = this.updateOperatorPositions.bind(this);
    this.selectOperator = this.selectOperator.bind(this);
    this.insertOperator = this.insertOperator.bind(this);
    this.removeOperator = this.removeOperator.bind(this);

    // Drones
    this.updateDronePositions = this.updateDronePositions.bind(this);
    this.insertDrone = this.insertDrone.bind(this);
    this.removeDrone = this.removeDrone.bind(this);

    // Gadgets
    this.updateGadgetPositions = this.updateGadgetPositions.bind(this);
    this.insertGadget = this.insertGadget.bind(this);
    this.removeGadget = this.removeGadget.bind(this);

    // Utility
    this.updateUtility = this.updateUtility.bind(this);
    this.updateUtilityPositions = this.updateUtilityPositions.bind(this);

    // Rotates
    this.updateRotatePositions = this.updateRotatePositions.bind(this);
    this.insertRotate = this.insertRotate.bind(this);
    this.removeRotate = this.removeRotate.bind(this);

    // Reinforcements
    this.updateReinforcementPositions = this.updateReinforcementPositions.bind(this);

    this.state = {
      form: false,
      activeOperator: 0
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
        roles: ["ROLE", "ROLE", "ROLE", "ROLE", "ROLE"],
        operators: ["OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR"],
        utility: ["UTILITY", "UTILITY", "UTILITY", "UTILITY", "UTILITY"],
        gadgets: ["", "", "", "", ""]
      };
      SITES[e.target.value].map((site) => {
        attackStrategy[site] = [
          {
            objectives: [],
            utilityPositions: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
            gadgetPositions: [[], [], [], [], []],
            operatorPositions: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
            drones: [],
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
            roles: ["ROLE", "ROLE", "ROLE", "ROLE", "ROLE"],
            operators: ["OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR"],
            utility: ["UTILITY", "UTILITY", "UTILITY", "UTILITY", "UTILITY"],
            gadgets: ["", "", "", "", ""],
            reinforcements: [],
            rotates: [],
            utilityPositions: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y:0}, {x: 0, y: 0}, {x: 0, y: 0}],
            gadgetPositions: [[], [], [], [], []],
            scenes: [
              {
                objectives: [],
                operatorPositions: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
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
      site: e.target.value,
      siteIndex: this.state.sites.indexOf(e.target.value)
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
  addStrategy() {
    let map = this.state.map;
    let newStrategies;
    if (this.state.type === "ATTACK") {
      let attackStrategy = {
        name: "",
        roles: ["ROLE", "ROLE", "ROLE", "ROLE", "ROLE"],
        operators: ["OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR"],
        utility: ["UTILITY", "UTILITY", "UTILITY", "UTILITY", "UTILITY"],
        gadgets: ["", "", "", "", ""]
      };
      SITES[this.state.map.name].map((site) => {
        attackStrategy[site] = [
          {
            objectives: [],
            utilityPositions: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
            gadgetPositions: [[], [], [], [], []],
            operatorPositions: [{x: 0, y: 0, floor: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
            drones: [],
            execution: ""
          }
        ]
      });
      map.attack.push(attackStrategy);
      newStrategies = map.attack;
    } else {
      let defenseStrategy = {
        name: "",
        roles: ["ROLE", "ROLE", "ROLE", "ROLE", "ROLE"],
        operators: ["OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR"],
        utility: ["UTILITY", "UTILITY", "UTILITY", "UTILITY", "UTILITY"],
        gadgets: ["", "", "", "", ""],
        reinforcements: [],
        rotates: [],
        utilityPositions: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y:0}, {x: 0, y: 0}, {x: 0, y: 0}],
        gadgetPositions: [[], [], [], [], []],
        scenes: [
          {
            objectives: [],
            operatorPositions: [{x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}],
            execution: ""
          }
        ]
      };
      map.defense[this.state.sites[this.state.siteIndex]].push(defenseStrategy);
      newStrategies = map.defense[this.state.sites[this.state.siteIndex]];
    }
    this.setState({
      map: map,
      strategies: newStrategies,
      strategyIndex: this.state.strategyIndex + 1
    });
  }
  removeStrategy() {
    if (this.state.strategies.length === 1) {
      this.props.alert("User cannot delete only strategy in map.");
    } else {
      let newStrategies = [...this.state.strategies];
      newStrategies.splice(this.state.strategyIndex, 1);
      let map = this.state.map;
      if (this.state.type === "ATTACK") {
        map.attack = newStrategies;
      } else {
        map.defense[this.state.sites[this.state.siteIndex]] = newStrategies;
      }
      this.setState({
        map: map,
        strategyIndex: this.state.strategyIndex - 1,
        strategies: newStrategies,
      });
    }
  }
  updateRoles(e, index) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex].roles[index] = e.target.value;
      map.attack[this.state.strategyIndex].operators[index] = "OPERATOR";
      map.attack[this.state.strategyIndex].gadgets[index] = "";
      map.attack[this.state.strategyIndex].utility[index] = "UTILITY";
    } else {
      map.defense[this.state.site][this.state.strategyIndex].roles[index] = e.target.value;
      map.defense[this.state.site][this.state.strategyIndex].operators[index] = "OPERATOR";
      map.defense[this.state.site][this.state.strategyIndex].gadgets[index] = "";
      map.defense[this.state.site][this.state.strategyIndex].utility[index] = "UTILITY";
    }
    this.setState({
      map: map
    });
  }
  updateOperators(e, index) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex].operators[index] = e.target.value;
      map.attack[this.state.strategyIndex].gadgets[index] = GADGETS[e.target.value];
      map.attack[this.state.strategyIndex].utility[index] = "UTILITY";
    } else {
      map.defense[this.state.site][this.state.strategyIndex].operators[index] = e.target.value;
      map.defense[this.state.site][this.state.strategyIndex].gadgets[index] = GADGETS[e.target.value];
      map.defense[this.state.site][this.state.strategyIndex].utility[index] = "UTILITY";
    }
    this.setState({
      map: map
    });
  }
  updateUtility(e, index) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex].utility[index] = e.target.value;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].utility[index] = e.target.value;
    }
    this.setState({
      map: map
    });
  }
  updateName(e) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex].name = e.target.value;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].name = e.target.value;
    }
    this.setState({
      map: map
    });
  }
  updateFloor(e) {
    this.setState({
      floorIndex: this.state.floors.indexOf(e.target.value)
    });
  }
  incrementScene() {
    if (this.state.sceneIndex + 1 < this.state.scenes.length) {
      this.setState({
        sceneIndex: this.state.sceneIndex + 1
      });
    }
  }
  decrementScene() {
    if (this.state.sceneIndex - 1 >= 0) {
      this.setState({
        sceneIndex: this.state.sceneIndex - 1
      });
    }
  }
  addScene() {
    let scenes;
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      scenes = map.attack[this.state.strategyIndex][this.state.site];
      scenes.push({
        objectives: [],
        utilityPositions: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        gadgetPositions: [[], [], [], [], []],
        operatorPositions: [{x: 0, y: 0, floor: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
        drones: [],
        execution: ""
      });
      map.attack[this.state.strategyIndex][this.state.site] = scenes;
    } else {
      scenes = map.defense[this.state.site][this.state.strategyIndex].scenes;
      scenes.push({
        objectives: [],
        operatorPositions: [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: null}, {x: 0, y: 0}, {x: 0, y: 0}],
        execution: "",
      });
      map.defense[this.state.site][this.state.strategyIndex].scenes = scenes;
    }
    this.setState({
      scenes: scenes,
      map: map,
      sceneIndex: this.state.sceneIndex + 1
    });
  }
  removeScene() {
    if (this.state.sceneIndex - 1 >= 0) {
      let scenes;
      let map = this.state.map;
      if (this.state.type === "ATTACK") {
        scenes = [...map.attack[this.state.strategyIndex][this.state.site]];
        scenes.splice(this.state.sceneIndex, 1);
        map.attack[this.state.strategyIndex][this.state.site] = scenes;
      } else {
        scenes = [...map.defense[this.state.site][this.state.strategyIndex].scenes];
        scenes.splice(this.state.sceneIndex, 1);
        map.defense[this.state.site][this.state.strategyIndex].scenes = scenes;
      }
      this.setState({
        scenes: scenes,
        map: map,
        sceneIndex: this.state.sceneIndex - 1
      });
    }
  }
  updateOperatorPositions(positions) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].operatorPositions = positions;
      scenes = map.attack[this.state.strategyIndex][this.state.site];
      strategies = map.attack;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions = positions;
      scenes = map.defense[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.defense[this.state.site];
    }
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }
  updateGadgetPositions(positions) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].gadgetPositions = positions;
      scenes = map.attack[this.state.strategyIndex][this.state.site];
      strategies = map.attack;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].gadgetPositions = positions;
      scenes = map.defense[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.defense[this.state.site];
    }
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }
  updateUtilityPositions(positions) {

  }
  updateDronePositions(positions) {
    let map = this.state.map;
    let scenes;
    let strategies;
    map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones = positions;
    scenes = map.attack[this.state.strategyIndex][this.state.site];
    strategies = map.attack;
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }
  updateReinforcementPositions(positions) {

  }
  updateRotatePositions(positions) {
    let map = this.state.map;
    let strategies;
    map.defense[this.state.site][this.state.strategyIndex].rotates = positions;
    strategies = map.defense[this.state.site];
    this.setState({
      map: map,
      strategies: strategies
    });
  }
  selectOperator(index) {
    this.setState({
      activeOperator: index
    });
  }
  insertOperator(index) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].operatorPositions[index].floor = this.state.floorIndex;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index].floor = this.state.floorIndex;
    }
    this.setState({
      map: map
    });
  }
  removeOperator(index) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].operatorPositions[index].floor = undefined;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index].floor = undefined;
    }
    this.setState({
      map: map
    });
  }
  insertDrone() {
    if (this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones.length + 1 <= 10) {
      let drone = {
        x: 0,
        y: 0,
        floor: this.state.floorIndex
      };
      let map = this.state.map;
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones.push(drone);
      this.setState({
        map: map
      });
    }
  }
  removeDrone() {
    if (this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones.length - 1 >= 0) {
      let map = this.state.map;
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones.pop();
      this.setState({
        map: map
      });
    }
  }
  insertGadget(index) {
    let map = this.state.map;
    let gadget = {
      x: 0,
      y: 0,
      floor: this.state.floorIndex
    };
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].gadgetPositions[index].push(gadget);
    } else {
      map.defense[this.state.site][this.state.strategyIndex].gadgetPositions[index].push(gadget);
    }
    this.setState({
      map: map
    });
  }
  removeGadget(index) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].gadgetPositions[index].pop();
    } else {
      map.defense[this.state.site][this.state.strategyIndex].gadgetPositions[index].pop();
    }
    this.setState({
      map: map
    });
  }
  insertRotate() {
    let map = this.state.map;
    let rotate = {
      x: 0,
      y: 0,
      floor: this.state.floorIndex
    };
    map.defense[this.state.site][this.state.strategyIndex].rotates.push(rotate);
    this.setState({
      map: map
    });
  }
  removeRotate() {
    let map = this.state.map;
    map.defense[this.state.site][this.state.strategyIndex].rotates.pop();
    this.setState({
      map: map
    });
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
                        <div className="add-map__strategy-buttons">
                          <button onClick={this.addStrategy} className="add-map__strategy-button">Add Strategy</button>
                          <button onClick={this.removeStrategy} className="add-map__strategy-button">Remove Strategy</button>
                        </div>
                        <input onChange={this.updateName} className="add-map__name-input" type="text"
                          value={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex].name
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].name))}
                          placeholder="Strategy Name"/>
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
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].utility))}
                          updateRoles={this.updateRoles} updateOperators={this.updateOperators} updateUtility={this.updateUtility}
                          selectOperator={this.selectOperator}/>
                      </div>
                    </div>
                    <div className="add-map__body">
                      <main className="canvas">
                        <div className="canvas__controls">
                          <FloorSelector onChange={this.updateFloor} floors={this.state.floors} floor={this.state.floors[this.state.floorIndex]}/>
                          <Pagination title="Scene" index={this.state.sceneIndex} increment={this.incrementScene} decrement={this.decrementScene}/>
                          <div className="scene-controls">
                            <a onClick={this.addScene}>+</a>
                            <a onClick={this.removeScene}>-</a>
                          </div>
                        </div>
                        <BlueprintForm type={this.state.type}
                          operators={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex].operators
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].operators))}
                          operatorPositions={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].operatorPositions) : (
                            this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions
                          ))}
                          gadgets={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex].gadgets
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].gadgets))}
                          gadgetPositions={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].gadgetPositions) : (
                            this.state.map.defense[this.state.site][this.state.strategyIndex].gadgetPositions
                          ))}
                          utility={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex].utility
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].operators))}
                          utilityPositions={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].utilityPositions) : (
                            this.state.map.defense[this.state.site][this.state.strategyIndex].utilityPositions
                          ))}
                          drones={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones
                          ) : undefined)}
                          rotates={(this.state.type === "ATTACK" ? (
                            undefined
                          ) : this.state.map.defense[this.state.site][this.state.strategyIndex].rotates)}
                          reinforcements={(this.state.type === "ATTACK" ? (
                            undefined
                          ) : this.state.map.defense[this.state.site][this.state.strategyIndex].reinforcements)}
                          map={this.state.map.name} site={this.state.site} floorIndex={this.state.floorIndex}
                          floor={this.state.floors[this.state.floorIndex]}
                          updateOperatorPositions={this.updateOperatorPositions}
                          updateGadgetPositions={this.updateGadgetPositions}
                          updateDronePositions={this.updateDronePositions}
                          updateUtilityPositions={this.updateUtilityPositions}
                          updateRotatePositions={this.updateRotatePositions}
                          updateReinforcementPositions={this.updateReinforcementPositions}/>
                      </main>
                      <aside className="aside">
                        <Toolbar type={this.state.type}
                          operators={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex].operators
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].operators))}
                          insertOperator={this.insertOperator} removeOperator={this.removeOperator}
                          utility={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex].utility
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].utility))}
                          gadgets={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex].gadgets
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].gadgets))}
                          gadgetPositions={(this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].gadgetPositions) : (
                            this.state.map.defense[this.state.site][this.state.strategyIndex].gadgetPositions
                          ))}
                          insertGadget={this.insertGadget}
                          removeGadget={this.removeGadget}
                          drones={this.state.type === "ATTACK" ? (
                            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones) : undefined}
                          insertDrone={this.insertDrone}
                          removeDrone={this.removeDrone}
                          rotates={this.state.type === "ATTACK"? (
                            undefined
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].rotates)}
                          insertRotate={this.insertRotate}
                          removeRotate={this.removeRotate}
                          reinforcements={this.state.type === "ATTACK" ? (
                            undefined
                          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].reinforcements)}
                          activeOperator={this.state.activeOperator}/>
                      </aside>
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
