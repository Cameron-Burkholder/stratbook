/* client/components/partials/Editor.js */

import React from "react";
import axios from "axios";

import Loading from "./Loading.js";
import MapSelector from "./MapSelector.js";
import Toolbar from "./Toolbar.js";
import Sidebar from "./Sidebar.js";
import Canvas from "./Canvas.js";
import Lineup from "./Lineup.js";

import { MAP_NAMES, SITES, FLOORS, GADGETS, UTILITY_GUIDE } from "../../data.js";

/*
  @func: Editor
  @desc: manage state of new strategies and make requests to server
  @prop map
  @prop save (function)
  @prop getAuthToken: function
  @prop alert: function
  @prop fetchStrategies: function
  @state:
    name: String
*/
class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.selectSite = this.selectSite.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateRoles = this.updateRoles.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateFloor = this.updateFloor.bind(this);
    this.save = this.save.bind(this);
    this.share = this.share.bind(this);
    this.unshare = this.unshare.bind(this);

    // Strategies
    this.addStrategy = this.addStrategy.bind(this);
    this.removeStrategy = this.removeStrategy.bind(this);
    this.selectStrategy = this.selectStrategy.bind(this);

    // Scenes
    this.selectScene = this.selectScene.bind(this);
    this.addScene = this.addScene.bind(this);
    this.removeScene = this.removeScene.bind(this);
    this.updateSceneName = this.updateSceneName.bind(this);

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
    this.insertUtility = this.insertUtility.bind(this);
    this.removeUtility = this.removeUtility.bind(this);

    // Rotates
    this.updateRotatePositions = this.updateRotatePositions.bind(this);
    this.insertRotate = this.insertRotate.bind(this);
    this.removeRotate = this.removeRotate.bind(this);

    // Reinforcements
    this.updateReinforcementPositions = this.updateReinforcementPositions.bind(this);
    this.insertReinforcement = this.insertReinforcement.bind(this);
    this.removeReinforcement = this.removeReinforcement.bind(this);

    // Breaches
    this.updateBreachPositions = this.updateBreachPositions.bind(this);
    this.insertBreach = this.insertBreach.bind(this);
    this.removeBreach = this.removeBreach.bind(this);

    // Objectives and Notes
    this.addObjective = this.addObjective.bind(this);
    this.removeObjective = this.removeObjective.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.updateVideo = this.updateVideo.bind(this);

    // Handle scroll
    this.handleScroll = this.handleScroll.bind(this);

    // Declare initial state
    let siteIndex;
    let sceneIndex;
    let strategyIndex;
    let scenes;
    let strategies;
    let floorIndex;
    let type;
    if (this.props.position) {
      type = this.props.position.type;
      siteIndex = this.props.position.siteIndex;
      sceneIndex = this.props.position.sceneIndex;
      strategyIndex = this.props.position.strategyIndex;
      floorIndex = this.props.position.floorIndex;
      if (this.props.position.type === "ATTACK") {
        strategies = this.props.map.attack;
        scenes = this.props.map.attack[strategyIndex][SITES[this.props.map.name][siteIndex]];
      } else {
        strategies = this.props.map.defense[SITES[this.props.map.name][siteIndex]];
        scenes = this.props.map.defense[SITES[this.props.map.name][siteIndex]][strategyIndex].scenes;
      }
    } else {
      siteIndex = 0;
      strategyIndex = 0;
      sceneIndex = 0;
      floorIndex = 0;
      type = "ATTACK";
      scenes = this.props.map.attack[0][SITES[this.props.map.name][0]];
      strategies = this.props.map.attack;
    }

    this.state = {
      activeOperator: 0,
      map: this.props.map,
      sites: SITES[this.props.map.name],
      site: SITES[this.props.map.name][siteIndex],
      siteIndex: siteIndex,
      strategyIndex: strategyIndex,
      strategies: strategies,
      sceneIndex: sceneIndex,
      scenes: scenes,
      floors: FLOORS[this.props.map.name],
      floorIndex: floorIndex,
      type: type,
      mounted: false
    }
  }
  selectSite(index) {
    this.setState({
      site: this.state.sites[index],
      siteIndex: index,
      sceneIndex: 0,
      scenes: (this.state.type === "ATTACK" ? this.state.map.attack[this.state.strategyIndex][this.state.sites[index]] : this.state.map.defense[this.state.sites[index]][0].scenes),
      strategyIndex: (this.state.type === "ATTACK" ? this.state.strategyIndex : 0),
      strategies: (this.state.type === "ATTACK" ? this.state.strategies : this.state.map.defense[this.state.sites[index]])
    });
  }
  updateType(type) {
    if (type === "ATTACK") {
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
        scenes: this.state.map.defense[this.state.sites[0]][0].scenes,
        sceneIndex: 0,
        floorIndex: 0
      });
    }
  }
  updateRoles(e, index) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex].roles[index] = e.target.value;
      map.attack[this.state.strategyIndex].operators[index] = "OPERATOR";
      map.attack[this.state.strategyIndex].gadgets[index] = "";
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].gadgetPositions = [[], [], [], [], []];
      map.attack[this.state.strategyIndex].utility[index] = "UTILITY";
    } else {
      map.defense[this.state.site][this.state.strategyIndex].roles[index] = e.target.value;
      map.defense[this.state.site][this.state.strategyIndex].operators[index] = "OPERATOR";
      map.defense[this.state.site][this.state.strategyIndex].gadgets[index] = "";
      map.defense[this.state.site][this.state.strategyIndex].gadgetPositions = [[], [], [], [], []];
      map.defense[this.state.site][this.state.strategyIndex].utility[index] = "UTILITY";
    }
    this.setState({
      map: map
    });
  }
  updateName(name) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex].name = name;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].name = name;
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
  selectOperator(index) {
    this.setState({
      activeOperator: index
    });
  }
  save() {
    const position = {
      siteIndex: this.state.siteIndex,
      strategyIndex: this.state.strategyIndex,
      sceneIndex: this.state.sceneIndex,
      floorIndex: this.state.floorIndex,
      type: this.state.type
    };
    this.props.save(JSON.stringify(this.state.map), position);
  }
  share() {
    let map = this.state.map;
    let strategies;
    let strategy;
    let shared;
    if (this.state.type === "ATTACK") {
      shared = map.attack[this.state.strategyIndex].shared === true;
    } else {
      shared = map.defense[this.state.site][this.state.strategyIndex].shared === true;
    }

    if (!shared) {
      if (this.state.type === "ATTACK") {
        map.attack[this.state.strategyIndex].shared = true;
        strategies = map.attack;
      } else {
        map.defense[this.state.site][this.state.strategyIndex].shared = true;
        strategies = map.defense[this.state.site];
      }
      strategy = strategies[this.state.strategyIndex];
      const position = {
        siteIndex: this.state.siteIndex,
        strategyIndex: this.state.strategyIndex,
        sceneIndex: this.state.sceneIndex,
        floorIndex: this.state.floorIndex,
        type: this.state.type
      };

      this.setState({
        map: map,
        strategies: strategies
      }, () => {
        this.props.shareStrategy(strategy, map, position);
      });
    }
  }
  unshare() {

  }

  // Strategies
  addStrategy() {
    let map = this.state.map;
    let newStrategies;
    if (this.state.type === "ATTACK") {
      let attackStrategy = {
        name: "Unnamed",
        roles: ["ROLE", "ROLE", "ROLE", "ROLE", "ROLE"],
        operators: ["OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR"],
        utility: ["UTILITY", "UTILITY", "UTILITY", "UTILITY", "UTILITY"],
        gadgets: ["", "", "", "", ""]
      };
      SITES[this.state.map.name].map((site) => {
        attackStrategy[site] = [
          {
            objectives: [],
            utilityPositions: [[], [], [], [], []],
            gadgetPositions: [[], [], [], [], []],
            breaches: [],
            operatorPositions: [{x: 0, y: 0, floor: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}],
            drones: [],
            notes: "",
            name: "Unnamed"
          }
        ]
      });
      map.attack.push(attackStrategy);
      newStrategies = map.attack;
    } else {
      let defenseStrategy = {
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
            operatorPositions: [{x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}, {x: null, y: null}],
            notes: "",
            name: "Unnamed"
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
    if (this.state.strategies.length !== 1) {
      if (window.confirm(`You are about to remove ${this.state.strategies[this.state.strategyIndex].name} from your Stratbook. If you wish to continue, please confirm.`)) {
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
          strategyIndex: (this.state.strategyIndex - 1 >= 0 ? this.state.strategyIndex - 1 : 0),
          strategies: newStrategies,
        });
      }
    }
  }
  selectStrategy(index) {
    this.setState({
      strategyIndex: index
    });
  }

  // Scenes
  addScene() {
    let scenes;
    let map = this.state.map;
    let name = "Unnamed";
    if (this.state.type === "ATTACK") {
      scenes = [...map.attack[this.state.strategyIndex][this.state.site]];
      let newScene = JSON.parse(JSON.stringify(scenes[scenes.length - 1]));
      newScene.notes = "";
      newScene.name = name;
      newScene.objectives = [];
      scenes.push(newScene);
      map.attack[this.state.strategyIndex][this.state.site] = scenes;
    } else {
      scenes = [...map.defense[this.state.site][this.state.strategyIndex].scenes];
      let newScene = JSON.parse(JSON.stringify(scenes[scenes.length - 1]));
      newScene.notes = "";
      newScene.objectives = [];
      newScene.name = name;
      scenes.push(newScene);
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
  selectScene(index) {
    this.setState({
      sceneIndex: index
    });
  }
  updateSceneName(name, index) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][index].name = name;
      scenes = map.attack[this.state.strategyIndex][this.state.site];
      strategies = map.attack;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[index].name = name;
      scenes = map.defense[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.defense[this.state.site];
    }
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }

  // Operators
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

  // Drones
  insertDrone() {
    if (this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones.length + 1 <= 10) {
      let drone = {
        x: Math.floor(900 / 2), // taken from blueprint form values
        y: Math.floor(675 / 2), // taken from blueprint form values
        floor: this.state.floorIndex
      };
      let map = this.state.map;
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones.push(drone);
      this.setState({
        map: map
      });
    }
  }
  removeDrone(index) {
    if (this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones.length - 1 >= 0) {
      let map = this.state.map;
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones.splice(index, 1);
      this.setState({
        map: map
      });
    }
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

  // Gadgets
  insertGadget(index) {
    let map = this.state.map;
    let gadget = {
      x: Math.floor(900 / 2), // taken from blueprint form values
      y: Math.floor(675 / 2), // taken from blueprint form values
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
  removeGadget(index, gi) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].gadgetPositions[index].splice(gi, 1);
    } else {
      map.defense[this.state.site][this.state.strategyIndex].gadgetPositions[index].splice(gi, 1);
    }
    this.setState({
      map: map
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

  // Utility
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
  updateUtilityPositions(positions) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].utilityPositions = positions;
      scenes = map.attack[this.state.strategyIndex][this.state.site];
      strategies = map.attack;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].utilityPositions = positions;
      scenes = map.defense[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.defense[this.state.site];
    }
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }
  insertUtility(index) {
    let map = this.state.map;
    let utility = {
      x: Math.floor(900 / 2), // taken from blueprint form values
      y: Math.floor(675 / 2), // taken from blueprint form values
      floor: this.state.floorIndex
    };
    if (this.state.type === "ATTACK") {
      if (map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].utilityPositions[index].length + 1 <= UTILITY_GUIDE[map.attack[this.state.strategyIndex].utility[index]]) {
        map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].utilityPositions[index].push(utility);
      }
    } else {
      if (map.defense[this.state.site][this.state.strategyIndex].utilityPositions[index].length + 1 <= UTILITY_GUIDE[map.defense[this.state.site][this.state.strategyIndex].utility[index]]) {
        map.defense[this.state.site][this.state.strategyIndex].utilityPositions[index].push(utility);
      }
    }
    this.setState({
      map: map
    });
  }
  removeUtility(index, gi) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].utilityPositions[index].splice(gi, 1);
    } else {
      map.defense[this.state.site][this.state.strategyIndex].utilityPositions[index].splice(gi, 1);
    }
    this.setState({
      map: map
    });
  }

  // Rotates
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
  insertRotate() {
    let map = this.state.map;
    let rotate = {
      x: Math.floor(900 / 2), // taken from blueprint form values
      y: Math.floor(675 / 2), // taken from blueprint form values
      floor: this.state.floorIndex
    };
    map.defense[this.state.site][this.state.strategyIndex].rotates.push(rotate);
    this.setState({
      map: map
    });
  }
  removeRotate(index) {
    let map = this.state.map;
    map.defense[this.state.site][this.state.strategyIndex].rotates.splice(index, 1);
    this.setState({
      map: map
    });
  }

  // Reinforcements
  updateReinforcementPositions(positions) {
    let map = this.state.map;
    let strategies;
    map.defense[this.state.site][this.state.strategyIndex].reinforcements = positions;
    strategies = map.defense[this.state.site];
    this.setState({
      map: map,
      strategies: strategies
    });
  }
  insertReinforcement() {
    if (this.state.map.defense[this.state.site][this.state.strategyIndex].reinforcements.length + 1 <= 10) {
      let map = this.state.map;
      let reinforcement = {
        x: Math.floor(900 / 2), // taken from blueprint form values
        y: Math.floor(675 / 2), // taken from blueprint form values
        floor: this.state.floorIndex
      };
      map.defense[this.state.site][this.state.strategyIndex].reinforcements.push(reinforcement);
      this.setState({
        map: map
      });
    }
  }
  removeReinforcement(index) {
    let map = this.state.map;
    map.defense[this.state.site][this.state.strategyIndex].reinforcements.splice(index, 1);
    this.setState({
      map: map
    });
  }

  // Breaches
  updateBreachPositions(positions) {
    let map = this.state.map;
    let scenes;
    let strategies;
    map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches = positions;
    scenes = map.attack[this.state.strategyIndex][this.state.site];
    strategies = map.attack;
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }
  insertBreach() {
    if (this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches.length + 1 <= 10) {
      let breach = {
        x: Math.floor(900 / 2), // taken from blueprint form values
        y: Math.floor(675 / 2), // taken from blueprint form values
        floor: this.state.floorIndex
      };
      let map = this.state.map;
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches.push(breach);
      this.setState({
        map: map
      });
    }
  }
  removeBreach(index) {
    if (this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches.length - 1 >= 0) {
      let map = this.state.map;
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches.splice(index, 1);
      this.setState({
        map: map
      });
    }
  }

  // Objectives and Notes
  addObjective(msg) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].objectives.push(msg);
      scenes = map.attack[this.state.strategyIndex][this.state.site];
      strategies = map.attack;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].objectives.push(msg);
      scenes = map.defense[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.defense[this.state.site];
    }
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }
  removeObjective(index) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].objectives.splice(index, 1);
      scenes = map.attack[this.state.strategyIndex][this.state.site];
      strategies = map.attack;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].objectives.splice(index, 1);
      scenes = map.defense[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.defense[this.state.site];
    }
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }
  updateNotes(e) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].notes = e.target.value;
      scenes = map.attack[this.state.strategyIndex][this.state.site];
      strategies = map.attack;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].notes = e.target.value;
      scenes = map.defense[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.defense[this.state.site];
    }
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }
  updateVideo(e) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].video = e.target.value;
      scenes = map.attack[this.state.strategyIndex][this.state.site];
      strategies = map.attack;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].video = e.target.value;
      scenes = map.defense[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.defense[this.state.site];
    }
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }

  componentDidMount() {
    if (!this.state.mounted) {
      window.addEventListener("scroll", this.handleScroll);
      this.setState({
        mounted: true
      });
    }
  }
  handleScroll(e) {
    const nav = document.querySelector("nav.nav");
    const toolbar = document.querySelector("div.toolbar");
    const main = document.querySelector("main");
    const sidebar = document.querySelector("div.sidebar");
    const lineup = document.querySelector("div.lineup");
    if (window.scrollY > nav.offsetTop + nav.offsetHeight) {
      toolbar.classList.add("toolbar--scroll");
      sidebar.classList.add("sidebar--scroll");
      lineup.classList.add("lineup--scroll");
      main.style.marginTop = toolbar.offsetHeight + "px";
    } else {
      toolbar.classList.remove("toolbar--scroll");
      sidebar.classList.remove("sidebar--scroll");
      lineup.classList.remove("lineup--scroll");
      main.style.marginTop = 0;
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div id="Editor">
        <Toolbar
          showMaps={this.showMaps}
          map={this.state.map}
          strategies={this.state.strategies}
          strategyIndex={this.state.strategyIndex}
          selectStrategy={this.selectStrategy}
          type={this.state.type}
          updateType={this.updateType}
          siteIndex={this.state.siteIndex}
          sites={this.state.sites}
          selectSite={this.selectSite}
          addStrategy={this.addStrategy}
          removeStrategy={this.removeStrategy}
          strategy={this.state.type === "ATTACK" ? (
            this.state.map.attack[this.state.strategyIndex].name
          ): (
            this.state.map.defense[this.state.site][this.state.strategyIndex].name
          )}
          updateStrategyName={this.updateName}
          drones={this.state.type === "ATTACK" ? (
            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones) : undefined}
          insertDrone={this.insertDrone}
          rotates={this.state.type === "ATTACK"? (
            undefined
          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].rotates)}
          insertRotate={this.insertRotate}
          reinforcements={this.state.type === "ATTACK" ? (
            undefined
          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].reinforcements)}
          insertReinforcement={this.insertReinforcement}
          breaches={(this.state.type === "ATTACK" ? (
            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches
          ) : undefined)}
          insertBreach={this.insertBreach}
          alert={this.props.alert} save={this.save}
          fetchStrategies={this.props.fetchStrategies}
          />
        <main>
          <Sidebar
            map={this.state.map.name}
            strategy={this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].name
            ): (
              this.state.map.defense[this.state.site][this.state.strategyIndex].name
            )}
            strategies={this.state.strategies}
            selectStrategy={this.selectStrategy}
            strategyIndex={this.state.strategyIndex}
            sites={this.state.sites}
            selectSite={this.selectSite}
            siteIndex={this.state.siteIndex}
            scenes={this.state.scenes}
            selectScene={this.selectScene}
            sceneIndex={this.state.sceneIndex}
            addScene={this.addScene}
            removeScene={this.removeScene}
            updateSceneName={this.updateSceneName}
            type={this.state.type}
            shared={this.state.strategies[this.state.strategyIndex].shared}
            shared_key={this.state.strategies[this.state.strategyIndex].shared_key}
            share={this.share}
            unshare={this.unshare}
            />
          <Canvas
            type={this.state.type}
            operators={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].operators
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].operators))}
            operatorPositions={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].operatorPositions) : (
              this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions
            ))}
            removeOperator={this.removeOperator}
            gadgets={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].gadgets
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].gadgets))}
            gadgetPositions={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].gadgetPositions) : (
              this.state.map.defense[this.state.site][this.state.strategyIndex].gadgetPositions
            ))}
            removeGadget={this.removeGadget}
            utility={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].utility
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].utility))}
            utilityPositions={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].utilityPositions) : (
              this.state.map.defense[this.state.site][this.state.strategyIndex].utilityPositions
            ))}
            removeUtility={this.removeUtility}
            drones={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones
            ) : undefined)}
            removeDrone={this.removeDrone}
            rotates={(this.state.type === "ATTACK" ? (
              undefined
            ) : this.state.map.defense[this.state.site][this.state.strategyIndex].rotates)}
            removeRotate={this.removeRotate}
            reinforcements={(this.state.type === "ATTACK" ? (
              undefined
            ) : this.state.map.defense[this.state.site][this.state.strategyIndex].reinforcements)}
            removeReinforcement={this.removeReinforcement}
            map={this.state.map.name} site={this.state.site} floorIndex={this.state.floorIndex}
            breaches={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches
            ) : undefined)}
            removeBreach={this.removeBreach}
            floor={this.state.floors[this.state.floorIndex]}
            updateOperatorPositions={this.updateOperatorPositions}
            updateGadgetPositions={this.updateGadgetPositions}
            updateDronePositions={this.updateDronePositions}
            updateUtilityPositions={this.updateUtilityPositions}
            updateRotatePositions={this.updateRotatePositions}
            updateReinforcementPositions={this.updateReinforcementPositions}
            updateBreachPositions={this.updateBreachPositions}
            updateFloor={this.updateFloor}
            floors={this.state.floors}
            objectives={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].objectives
            ) : ( this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].objectives))}
            notes={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].notes
            ) : ( this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].notes))}
            addObjective={this.addObjective}
            removeObjective={this.removeObjective}
            updateNotes={this.updateNotes}
            scenes={this.state.scenes}
            sceneIndex={this.state.sceneIndex}
            selectScene={this.selectScene}
            video={this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].video
            ) : ( this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].video)}
            updateVideo={this.updateVideo}
            />
          <Lineup
            type={this.state.type}
            roles={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].roles
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].roles ))}
            operators={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].operators
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].operators))}
            updateRoles={this.updateRoles} updateOperators={this.updateOperators} updateUtility={this.updateUtility}
            selectOperator={this.selectOperator} activeOperator={this.state.activeOperator}
            insertOperator={this.insertOperator} removeOperator={this.removeOperator}
            gadgets={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].gadgets
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].gadgets))}
            gadgetPositions={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].gadgetPositions) : (
              this.state.map.defense[this.state.site][this.state.strategyIndex].gadgetPositions
            ))}
            utility={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].utility
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].utility))}
            utilityPositions={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].utilityPositions) : (
              this.state.map.defense[this.state.site][this.state.strategyIndex].utilityPositions
            ))}
            insertUtility={this.insertUtility}
            insertGadget={this.insertGadget}
            />
        </main>
      </div>
    )
  }
}

export default Editor;
