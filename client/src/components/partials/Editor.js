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

    this.selectMap = this.selectMap.bind(this);
    this.selectSite = this.selectSite.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateRoles = this.updateRoles.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateFloor = this.updateFloor.bind(this);
    this.save = this.save.bind(this);

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

    this.state = {
      activeOperator: 0,
      map: this.props.map,
      sites: SITES[this.props.map.name],
      site: SITES[this.props.map.name][0],
      siteIndex: 0,
      strategyIndex: 0,
      strategies: this.props.map.attack,
      sceneIndex: 0,
      scenes: this.props.map.attack[0][SITES[this.props.map.name][0]],
      floors: FLOORS[this.props.map.name],
      floorIndex: 0,
      type: "ATTACK",
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
        showMaps: false,
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
    this.props.save(JSON.stringify(this.state.map));
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
      x: 0,
      y: 0,
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
  removeUtility(index) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].utilityPositions[index].pop();
    } else {
      map.defense[this.state.site][this.state.strategyIndex].utilityPositions[index].pop();
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
    let map = this.state.map;
    let reinforcement = {
      x: 0,
      y: 0,
      floor: this.state.floorIndex
    };
    map.defense[this.state.site][this.state.strategyIndex].reinforcements.push(reinforcement);
    this.setState({
      map: map
    });
  }
  removeReinforcement() {
    let map = this.state.map;
    map.defense[this.state.site][this.state.strategyIndex].reinforcements.pop();
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
        x: 0,
        y: 0,
        floor: this.state.floorIndex
      };
      let map = this.state.map;
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches.push(breach);
      this.setState({
        map: map
      });
    }
  }
  removeBreach() {
    if (this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches.length - 1 >= 0) {
      let map = this.state.map;
      map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches.pop();
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
          removeDrone={this.removeDrone}
          rotates={this.state.type === "ATTACK"? (
            undefined
          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].rotates)}
          insertRotate={this.insertRotate}
          removeRotate={this.removeRotate}
          reinforcements={this.state.type === "ATTACK" ? (
            undefined
          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].reinforcements)}
          insertReinforcement={this.insertReinforcement}
          removeReinforcement={this.removeReinforcement}
          breaches={(this.state.type === "ATTACK" ? (
            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches
          ) : undefined)}
          insertBreach={this.insertBreach}
          removeBreach={this.removeBreach}
          alert={this.props.alert} save={this.save}
          fetchStrategies={this.props.fetchStrategies}/>
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
            type={this.state.type}/>
          <Canvas
            type={this.state.type}
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
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].utility))}
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
            breaches={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches
            ) : undefined)}
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
            />
          <Lineup
            type={this.state.type}
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
            selectOperator={this.selectOperator} activeOperator={this.state.activeOperator}
            insertOperator={this.insertOperator} removeOperator={this.removeOperator}
            insertUtility={this.insertUtility} removeUtility={this.removeUtility}
            insertGadget={this.insertGadget} removeGadget={this.removeGadget}
            gadgets={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].gadgets
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].gadgets))}/>
        </main>
      </div>
    )
  }
}

export default Editor;