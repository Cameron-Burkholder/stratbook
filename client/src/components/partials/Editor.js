/* client/components/partials/Editor.js */

import React from "react";

import Toolbar from "./Toolbar.js";
import Sidebar from "./Sidebar.js";
import Canvas from "./Canvas.js";
import Lineup from "./Lineup.js";
import { Prompt } from 'react-router'

import { SITES, FLOORS, GADGETS, UTILITY_GUIDE, CANVAS_WIDTH, CANVAS_HEIGHT } from "../../data.js";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.selectSite = this.selectSite.bind(this);
    this.updateType = this.updateType.bind(this);
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

    if (this.props.function === "Editor" || this.props.function === "Viewer") {
      let siteIndex;
      let sceneIndex;
      let strategyIndex;
      let scenes;
      let strategies;
      let floorIndex;
      let type;
      let floors = FLOORS[this.props.map.name];
      let sites = SITES[this.props.map.name];
      if (this.props.position) {
        type = this.props.position.type;
        siteIndex = this.props.position.siteIndex;
        sceneIndex = this.props.position.sceneIndex;
        strategyIndex = this.props.position.strategyIndex;
        floorIndex = this.props.position.floorIndex;
        if (this.props.position.type === "ATTACK") {
          strategies = this.props.map.attack[SITES[this.props.map.name][siteIndex]]
          scenes = this.props.map.attack[SITES[this.props.map.name][siteIndex]][strategyIndex].scenes;
        } else {
          strategies = this.props.map.defense[SITES[this.props.map.name][siteIndex]];
          scenes = this.props.map.defense[SITES[this.props.map.name][siteIndex]][strategyIndex].scenes;
        }
      } else {
        siteIndex = 0;
        strategyIndex = 0;
        sceneIndex = 0;
        if (sites[siteIndex][0] === 'B') {
          floorIndex = 0;
        } else {
          let target;
          switch (parseInt(sites[siteIndex][0])) {
            case 1:
              target = "First";
              break;
            case 2:
              target = "Second";
              break;
            case 3:
              target = "Third";
              break;
          }
          floors.forEach((floor, index) => {
            if (floor.includes(target)) {
              floorIndex = index;
            }
          })
        }
        type = "ATTACK";
        scenes = this.props.map.attack[SITES[this.props.map.name][0]][0].scenes;
        strategies = this.props.map.attack[SITES[this.props.map.name][0]]
      }

      this.state = {
        activeOperator: 0,
        map: this.props.map,
        sites: sites,
        site: SITES[this.props.map.name][siteIndex],
        siteIndex: siteIndex,
        strategyIndex: strategyIndex,
        strategies: strategies,
        sceneIndex: sceneIndex,
        scenes: scenes,
        floors: floors,
        floorIndex: floorIndex,
        type: type,
        mounted: false
      }
    } else {

      this.state = {
        activeOperator: 0,
        sites: SITES[this.props.strategy.map],
        site: SITES[this.props.strategy.map][this.props.strategy.siteIndex],
        siteIndex: this.props.strategy.siteIndex,
        sceneIndex: 0,
        scenes: this.props.strategy.scenes,
        floors: FLOORS[this.props.strategy.map],
        floorIndex: this.props.strategy.floorIndex,
        strategy: this.props.strategy,
        type: this.props.strategy.type,
        mounted: false
      }
    }


  }
  selectSite(index) {
    let sites = this.state.sites;
    let floorIndex;
    if (sites[index][0] === 'B') {
      floorIndex = 0;
    } else {
      let target;
      switch (parseInt(sites[index][0])) {
        case 1:
          target = "First";
          break;
        case 2:
          target = "Second";
          break;
        case 3:
          target = "Third";
          break;
      }
      this.state.floors.forEach((floor, index) => {
        if (floor.includes(target)) {
          floorIndex = index;
        }
      })
    }
    this.setState({
      site: this.state.sites[index],
      siteIndex: index,
      sceneIndex: 0,
      scenes: (this.state.type === "ATTACK" ? this.state.map.attack[this.state.sites[index]][0].scenes : this.state.map.defense[this.state.sites[index]][0].scenes),
      strategyIndex: 0,
      strategies: (this.state.type === "ATTACK" ? this.state.map.attack[this.state.sites[index]] : this.state.map.defense[this.state.sites[index]]),
      floorIndex: floorIndex
    });
  }
  updateType(type) {
    if (type === "ATTACK") {
      this.setState({
        type: "ATTACK",
        site: this.state.sites[0],
        siteIndex: 0,
        strategies: this.state.map.attack[this.state.sites[0]],
        strategyIndex: 0,
        scenes: this.state.map.attack[this.state.sites[0]][0].scenes,
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
  updateName(name) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.site][this.state.strategyIndex].name = name;
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
      shared = map.attack[this.state.site][this.state.strategyIndex].shared === true;
    } else {
      shared = map.defense[this.state.site][this.state.strategyIndex].shared === true;
    }

    if (!shared) {
      if (this.state.type === "ATTACK") {
        map.attack[this.state.site][this.state.strategyIndex].shared = true;
        strategies = map.attack[this.state.site];
      } else {
        map.defense[this.state.site][this.state.strategyIndex].shared = true;
        strategies = map.defense[this.state.site];
      }
      strategy = strategies[this.state.strategyIndex];
      strategy.type = this.state.type;
      strategy.map = this.state.map.name;
      strategy.floorIndex = this.state.floorIndex;
      strategy.siteIndex = this.state.siteIndex;
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
    let map = this.state.map;
    let strategies;
    let shared;
    if (this.state.type === "ATTACK") {
      shared = map.attack[this.state.site][this.state.strategyIndex].shared === true;
    } else {
      shared = map.defense[this.state.site][this.state.strategyIndex].shared === true;
    }

    let shared_key;
    if (shared) {
      if (this.state.type === "ATTACK") {
        map.attack[this.state.site][this.state.strategyIndex].shared = undefined;
        shared_key = map.attack[this.state.site][this.state.strategyIndex].shared_key;
        strategies = map.attack[this.state.site]
      } else {
        map.defense[this.state.site][this.state.strategyIndex].shared = undefined;
        shared_key = map.defense[this.state.site][this.state.strategyIndex].shared_key;
        strategies = map.defense[this.state.site];
      }
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
        this.props.unshareStrategy(shared_key, map, position);
      });
    }
  }

  // Strategies
  addStrategy() {
    let map = this.state.map;
    let newStrategies;
    if (this.state.type === "ATTACK") {
      let attackStrategy = {
        name: "Unnamed",
        operators: ["OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR"],
        utility: ["UTILITY", "UTILITY", "UTILITY", "UTILITY", "UTILITY"],
        gadgets: ["", "", "", "", ""],
        video: "",
        scenes: [
          {
            objectives: [],
            operatorPositions: [{x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2}, {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2}, {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2}, {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2}, {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2}],
            drones: [],
            breaches: [],
            utilityPositions: [[], [], [], [], []],
            gadgetPositions: [[], [], [], [], []],
            notes: "",
            name: "Unnamed"
          }
        ]
      };
      map.attack[this.state.sites[this.state.siteIndex]].push(attackStrategy);
      newStrategies = map.attack[this.state.sites[this.state.siteIndex]];
    } else {
      let defenseStrategy = {
        name: "Unnamed",
        operators: ["OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR", "OPERATOR"],
        utility: ["UTILITY", "UTILITY", "UTILITY", "UTILITY", "UTILITY"],
        gadgets: ["", "", "", "", ""],
        reinforcements: [],
        rotates: [],
        utilityPositions: [[], [], [], [], []],
        gadgetPositions: [[], [], [], [], []],
        video: "",
        scenes: [
          {
            objectives: [],
            operatorPositions: [{x: Math.floor(CANVAS_WIDTH / 2), y: Math.floor(CANVAS_HEIGHT / 2)}, {x: Math.floor(CANVAS_WIDTH / 2), y: Math.floor(CANVAS_HEIGHT / 2)}, {x: Math.floor(CANVAS_WIDTH / 2), y: Math.floor(CANVAS_HEIGHT / 2)}, {x: Math.floor(CANVAS_WIDTH / 2), y: Math.floor(CANVAS_HEIGHT / 2)}, {x: Math.floor(CANVAS_WIDTH / 2), y: Math.floor(CANVAS_HEIGHT / 2)}],
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
      strategyIndex: newStrategies.length - 1
    });
  }
  removeStrategy() {
    if (this.state.strategies.length !== 1) {
      if (window.confirm(`You are about to remove ${this.state.strategies[this.state.strategyIndex].name} from your Stratbook. If you wish to continue, please confirm.`)) {
        let newStrategies = [...this.state.strategies];
        newStrategies.splice(this.state.strategyIndex, 1);
        let map = this.state.map;
        if (this.state.type === "ATTACK") {
          map.attack[this.state.sites[this.state.siteIndex]] = newStrategies;
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
      scenes = [...map.attack[this.state.site][this.state.strategyIndex].scenes];
      let newScene = JSON.parse(JSON.stringify(scenes[scenes.length - 1]));
      newScene.notes = "";
      newScene.objectives = [];
      newScene.name = name;
      scenes.push(newScene);
      map.attack[this.state.site][this.state.strategyIndex].scenes = scenes;
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
        scenes = [...map.attack[this.state.site][this.state.strategyIndex].scenes];
        scenes.splice(this.state.sceneIndex, 1);
        map.attack[this.state.site][this.state.strategyIndex].scenes = scenes;
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
      map.attack[this.state.site][this.state.strategyIndex].scenes[index].name = name;
      scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.attack[this.state.site];
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
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index].floor = this.state.floorIndex;
      let opPosition = map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index];
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index].x = Math.floor(CANVAS_WIDTH / 2);
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index].y = Math.floor(CANVAS_HEIGHT / 2);
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index].floor = this.state.floorIndex;
      let opPosition = map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index];
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index].x = Math.floor(CANVAS_WIDTH / 2);
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index].y = Math.floor(CANVAS_HEIGHT / 2);
    }
    this.setState({
      map: map
    });
  }
  removeOperator(index) {
    let map = this.state.map;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index].floor = undefined;
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
      map.attack[this.state.site][this.state.strategyIndex].operators[index] = e.target.value;
      map.attack[this.state.site][this.state.strategyIndex].gadgets[index] = GADGETS[e.target.value];
      map.attack[this.state.site][this.state.strategyIndex].utility[index] = "UTILITY";
    } else {
      map.defense[this.state.site][this.state.strategyIndex].operators[index] = e.target.value;
      map.defense[this.state.site][this.state.strategyIndex].gadgets[index] = GADGETS[e.target.value];
      map.defense[this.state.site][this.state.strategyIndex].utility[index] = "UTILITY";
    }
    this.setState({
      map: map
    });
  }
  updateOperatorPositions(index, position) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index] = position;
      scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.attack[this.state.site];
    } else {
      map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions[index] = position;
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
    if (this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].drones.length + 1 <= 10) {
      let drone = {
        x: Math.floor(CANVAS_WIDTH / 2), // taken from blueprint form values
        y: Math.floor(CANVAS_HEIGHT / 2), // taken from blueprint form values
        floor: this.state.floorIndex
      };
      let map = this.state.map;
      this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].drones.push(drone);
      this.setState({
        map: map
      });
    }
  }
  removeDrone(index) {
    if (this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].drones.length - 1 >= 0) {
      let map = this.state.map;
      this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].drones.splice(index, 1);
      this.setState({
        map: map
      });
    }
  }
  updateDronePositions(index, position) {
    let map = this.state.map;
    let scenes;
    let strategies;
    map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].drones[index] = position;
    strategies = map.attack[this.state.site];
    scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
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
      x: Math.floor(CANVAS_WIDTH / 2), // taken from blueprint form values
      y: Math.floor(CANVAS_HEIGHT / 2), // taken from blueprint form values
      floor: this.state.floorIndex
    };
    if (this.state.type === "ATTACK") {
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].gadgetPositions[index].push(gadget);
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
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].gadgetPositions[index].splice(gi, 1);
    } else {
      map.defense[this.state.site][this.state.strategyIndex].gadgetPositions[index].splice(gi, 1);
    }
    this.setState({
      map: map
    });
  }
  updateGadgetPositions(index, gi, position) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].gadgetPositions[index][gi] = position;
      scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.attack[this.state.site];
    } else {
      map.defense[this.state.site][this.state.strategyIndex].gadgetPositions[index][gi] = position;
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
      map.attack[this.state.site][this.state.strategyIndex].utility[index] = e.target.value;
    } else {
      map.defense[this.state.site][this.state.strategyIndex].utility[index] = e.target.value;
    }
    this.setState({
      map: map
    });
  }
  updateUtilityPositions(index, gi, position) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].utilityPositions[index][gi] = position;
      scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.attack[this.state.site];
    } else {
      map.defense[this.state.site][this.state.strategyIndex].utilityPositions[index][gi] = position;
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
      x: Math.floor(CANVAS_WIDTH / 2), // taken from blueprint form values
      y: Math.floor(CANVAS_HEIGHT / 2), // taken from blueprint form values
      floor: this.state.floorIndex
    };
    if (this.state.type === "ATTACK") {
      if (map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].utilityPositions[index].length + 1 <= UTILITY_GUIDE[map.attack[this.state.site][this.state.strategyIndex].utility[index]]) {
        map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].utilityPositions[index].push(utility);
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
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].utilityPositions[index].splice(gi, 1);
    } else {
      map.defense[this.state.site][this.state.strategyIndex].utilityPositions[index].splice(gi, 1);
    }
    this.setState({
      map: map
    });
  }

  // Rotates
  updateRotatePositions(index, position) {
    let map = this.state.map;
    let strategies;
    map.defense[this.state.site][this.state.strategyIndex].rotates[index] = position;
    strategies = map.defense[this.state.site];
    this.setState({
      map: map,
      strategies: strategies
    });
  }
  insertRotate() {
    let map = this.state.map;
    let rotate = {
      x: Math.floor(CANVAS_HEIGHT / 2), // taken from blueprint form values
      y: Math.floor(CANVAS_HEIGHT / 2), // taken from blueprint form values
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
  updateReinforcementPositions(index, position) {
    let map = this.state.map;
    let strategies;
    map.defense[this.state.site][this.state.strategyIndex].reinforcements[index] = position;
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
        x: Math.floor(CANVAS_WIDTH / 2), // taken from blueprint form values
        y: Math.floor(CANVAS_HEIGHT / 2), // taken from blueprint form values
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
  updateBreachPositions(index, position) {
    let map = this.state.map;
    let scenes;
    let strategies;
    this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].breaches[index] = position;
    scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
    strategies = map.attack[this.state.site];
    this.setState({
      map: map,
      scenes: scenes,
      strategies: strategies
    });
  }
  insertBreach() {
    if (this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].breaches.length + 1 <= 10) {
      let breach = {
        x: Math.floor(CANVAS_WIDTH / 2), // taken from blueprint form values
        y: Math.floor(CANVAS_HEIGHT / 2), // taken from blueprint form values
        floor: this.state.floorIndex
      };
      let map = this.state.map;
      let scenes;
      let strategies;
      this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].breaches.push(breach);
      scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.attack[this.state.site];
      this.setState({
        map: map,
        scenes: scenes,
        strategies: strategies
      });
    }
  }
  removeBreach(index) {
    if (this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].breaches.length - 1 >= 0) {
      let map = this.state.map;
      let scenes;
      let strategies;
      this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].breaches.splice(index, 1);
      scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.attack[this.state.site];
      this.setState({
        map: map,
        scenes: scenes,
        strategies: strategies
      });
    }
  }

  // Objectives and Notes
  addObjective(msg) {
    let map = this.state.map;
    let scenes;
    let strategies;
    if (this.state.type === "ATTACK") {
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].objectives.push(msg);
      scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.attack[this.state.site];
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
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].objectives.splice(index, 1);
      scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.attack[this.state.site];
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
      map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].notes = e.target.value;
      scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.attack[this.state.site];
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
      map.attack[this.state.site][this.state.strategyIndex].video = e.target.value;
      scenes = map.attack[this.state.site][this.state.strategyIndex].scenes;
      strategies = map.attack[this.state.site];
    } else {
      map.defense[this.state.site][this.state.strategyIndex].video = e.target.value;
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
    let toolbarProps = {};
    let sidebarProps = {};
    let canvasProps = {};
    let lineupProps = {};

    if (this.props.function === "Editor") {
      toolbarProps.updateStrategyName = this.updateName;
      toolbarProps.insertDrone = this.insertDrone;
      toolbarProps.insertRotate = this.insertRotate;
      toolbarProps.insertReinforcement = this.insertReinforcement;
      toolbarProps.insertBreach = this.insertBreach;
      toolbarProps.addStrategy = this.addStrategy;
      toolbarProps.removeStrategy = this.removeStrategy;
      toolbarProps.save = this.save;

      sidebarProps.addScene = this.addScene;
      sidebarProps.removeScene = this.removeScene;
      sidebarProps.updateSceneName = this.updateSceneName;
      sidebarProps.share = this.share;
      sidebarProps.unshare = this.unshare;

      canvasProps.removeOperator = this.removeOperator;
      canvasProps.removeGadget = this.removeGadget;
      canvasProps.removeUtility = this.removeUtility;
      canvasProps.removeDrone = this.removeDrone;
      canvasProps.removeRotate = this.removeRotate;
      canvasProps.removeReinforcement = this.removeReinforcement;
      canvasProps.removeBreach = this.removeBreach;
      canvasProps.updateOperatorPositions = this.updateOperatorPositions;
      canvasProps.updateGadgetPositions = this.updateGadgetPositions;
      canvasProps.updateUtilityPositions = this.updateUtilityPositions;
      canvasProps.updateDronePositions = this.updateDronePositions;
      canvasProps.updateBreachPositions = this.updateBreachPositions;
      canvasProps.updateRotatePositions = this.updateRotatePositions;
      canvasProps.updateReinforcementPositions = this.updateReinforcementPositions;
      canvasProps.addObjective = this.addObjective;
      canvasProps.removeObjective = this.removeObjective;
      canvasProps.updateNotes = this.updateNotes;
      canvasProps.updateVideo = this.updateVideo;

      lineupProps.updateOperators = this.updateOperators;
      lineupProps.insertOperator = this.insertOperator;
      lineupProps.updateUtility = this.updateUtility;
      lineupProps.insertOperator = this.insertOperator;
      lineupProps.insertUtility = this.insertUtility;
      lineupProps.insertGadget = this.insertGadget;

    }

    if (this.props.function === "Editor" || this.props.function === "Viewer") {
      toolbarProps.strategy = this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].name
      ): (
        this.state.map.defense[this.state.site][this.state.strategyIndex].name
      );
      toolbarProps.showMaps = this.showMaps;
      toolbarProps.map = this.state.map;
      toolbarProps.strategies = this.state.strategies;
      toolbarProps.strategyIndex = this.state.strategyIndex;
      toolbarProps.selectStrategy = this.selectStrategy;
      toolbarProps.updateType = this.updateType;
      toolbarProps.siteIndex = this.state.siteIndex;
      toolbarProps.sites = this.state.sites;
      toolbarProps.selectSite = this.selectSite;
      toolbarProps.drones = this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].drones
      ) : undefined;
      toolbarProps.rotates = this.state.type === "ATTACK"? (
        undefined
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].rotates
      );
      toolbarProps.reinforcements = this.state.type === "ATTACK" ? (
        undefined
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].reinforcements
      );
      toolbarProps.breaches = this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].breaches
      ) : undefined;

      sidebarProps.strategies = this.state.strategies;
      sidebarProps.selectStrategy = this.selectStrategy;
      sidebarProps.strategyIndex = this.state.strategyIndex;
      sidebarProps.shared = this.state.strategies[this.state.strategyIndex].shared;
      sidebarProps.shared_key = this.state.strategies[this.state.strategyIndex].shared_key;

      canvasProps.map = toolbarProps.map.name;
      canvasProps.operators = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].operators
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].operators
      ));
      canvasProps.operatorPositions = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].operatorPositions
      ));
      canvasProps.gadgets = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].gadgets
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].gadgets
      ));
      canvasProps.gadgetPositions = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].gadgetPositions
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].gadgetPositions
      ));
      canvasProps.utility = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].utility
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].utility
      ));
      canvasProps.utilityPositions = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].utilityPositions
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].utilityPositions
      ));
      canvasProps.drones = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].drones
      ) : []);
      canvasProps.rotates = (this.state.type === "ATTACK" ? (
        []
      ) : this.state.map.defense[this.state.site][this.state.strategyIndex].rotates);
      canvasProps.reinforcements = (this.state.type === "ATTACK" ? (
        []
      ) : this.state.map.defense[this.state.site][this.state.strategyIndex].reinforcements);
      canvasProps.breaches = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].breaches
      ) : []);
      canvasProps.objectives = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].objectives
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].objectives
      ));
      canvasProps.notes = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].notes
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].notes
      ));
      canvasProps.video = this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].video
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].video
      );

      lineupProps.operators = (this.state.type === "ATTACK" ? (
        this.state.map.attack[this.state.site][this.state.strategyIndex].operators
      ) : (
        this.state.map.defense[this.state.site][this.state.strategyIndex].operators
      ));
      lineupProps.gadgetPositions = canvasProps.gadgetPositions;

    } else {
      toolbarProps.strategy = this.state.strategy.name;
      toolbarProps.map = this.state.strategy.map;
      toolbarProps.drones = this.state.type === "ATTACK" ? (
        this.state.strategy.scenes[this.state.sceneIndex].drones
      ) : undefined;
      toolbarProps.rotates = this.state.type === "ATTACK" ? (
        undefined
      ) : (
        this.state.strategy.rotates
      )
      toolbarProps.reinforcements = this.state.type === "ATTACK" ? (
        undefined
      ) : (
        this.state.strategy.reinforcements
      )
      toolbarProps.breaches = this.state.type === "ATTACK" ? (
        this.state.strategy.scenes[this.state.sceneIndex].breaches
      ) : undefined;
      toolbarProps.utility = this.state.strategy.utility;
      toolbarProps.sites = this.state.sites;

      sidebarProps.map = toolbarProps.map;

      canvasProps.operators = this.state.strategy.operators;
      canvasProps.operatorPositions = this.state.strategy.scenes[this.state.sceneIndex].operatorPositions;
      canvasProps.gadgets = this.state.strategy.gadgets;
      canvasProps.gadgetPositions = this.state.strategy.scenes[this.state.sceneIndex].gadgetPositions;
      canvasProps.utility = this.state.strategy.utility;
      canvasProps.utilityPositions = this.state.strategy.scenes[this.state.sceneIndex].utilityPositions;
      canvasProps.drones = this.state.type === "ATTACK" ? (
        this.state.strategy.scenes[this.state.sceneIndex].drones
      ) : (
        []
      );
      canvasProps.rotates = this.state.type === "ATTACK" ? (
        []
      ) : (
        this.state.strategy.rotates
      );
      canvasProps.reinforcements = this.state.type === "ATTACK" ? (
        []
      ) : (
        this.state.strategy.reinforcements
      );
      canvasProps.breaches = this.state.type === "ATTACK" ? (
        this.state.strategy.scenes[this.state.sceneIndex].breaches
      ) : [];
      canvasProps.map = this.state.strategy.map;
      canvasProps.objectives = this.state.strategy.scenes[this.state.sceneIndex].objectives;
      canvasProps.notes = this.state.strategy.scenes[this.state.sceneIndex].notes;
      canvasProps.video = this.state.strategy.video;

      lineupProps.utility = this.state.strategy.utility;
      lineupProps.utilityPositions = canvasProps.utilityPositions;
      lineupProps.gadgetPositions = canvasProps.gadgetPositions;

    }
    return (
      <div id={this.props.function}>
        <Toolbar
          type={this.state.type}
          alert={this.props.alert}
          fetchStrategies={this.props.fetchStrategies}
          function={this.props.function}
          {...toolbarProps}
          />
        <main>
          <Sidebar
            map={toolbarProps.map.name}
            strategy={toolbarProps.strategy}
            sites={this.state.sites}
            selectSite={this.selectSite}
            siteIndex={this.state.siteIndex}
            scenes={this.state.scenes}
            selectScene={this.selectScene}
            sceneIndex={this.state.sceneIndex}
            type={this.state.type}
            alert={this.props.alert}
            function={this.props.function}
            {...sidebarProps}
            />
          <Canvas
            type={this.state.type}
            site={this.state.site} floorIndex={this.state.floorIndex}
            floor={this.state.floors[this.state.floorIndex]}
            updateFloor={this.updateFloor}
            floors={this.state.floors}
            scenes={this.state.scenes}
            sceneIndex={this.state.sceneIndex}
            selectScene={this.selectScene}
            function={this.props.function}
            {...canvasProps}
            />
          <Lineup
            type={this.state.type}
            selectOperator={this.selectOperator} activeOperator={this.state.activeOperator}
            operators={canvasProps.operators}
            gadgets={canvasProps.gadgets}
            gadgetPositions={canvasProps.gadgetPositions}
            utility={canvasProps.utility}
            utilityPositions={canvasProps.utilityPositions}
            function={this.props.function}
            {...lineupProps}
            />
        </main>
      </div>
    )
  }
}

export default Editor;
