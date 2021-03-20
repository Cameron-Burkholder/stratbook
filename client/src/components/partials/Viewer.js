/* client/components/partials/Editor.js */

import React from "react";
import axios from "axios";

import Loading from "./Loading.js";
import MapSelector from "./MapSelector.js";
import ViewerToolbar from "./ViewerToolbar.js";
import ViewerSidebar from "./ViewerSidebar.js";
import ViewerCanvas from "./ViewerCanvas.js";
import ViewerLineup from "./ViewerLineup.js";

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
class Viewer extends React.Component {
  constructor(props) {
    super(props);

    this.selectSite = this.selectSite.bind(this);
    this.updateType = this.updateType.bind(this);
    this.updateFloor = this.updateFloor.bind(this);

    // Operators
    this.selectOperator = this.selectOperator.bind(this);

    // Strategies
    this.selectStrategy = this.selectStrategy.bind(this);

    // Scenes
    this.selectScene = this.selectScene.bind(this);

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
  updateFloor(e) {
    this.setState({
      floorIndex: this.state.floors.indexOf(e.target.value)
    });
  }

  // Operators
  selectOperator(index) {
    this.setState({
      activeOperator: index
    });
  }

  // Strategies
  selectStrategy(index) {
    this.setState({
      strategyIndex: index
    });
  }

  // Scenes
  selectScene(index) {
    this.setState({
      sceneIndex: index
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
      <div id="Viewer">
        <ViewerToolbar
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
          strategy={this.state.type === "ATTACK" ? (
            this.state.map.attack[this.state.strategyIndex].name
          ): (
            this.state.map.defense[this.state.site][this.state.strategyIndex].name
          )}
          drones={this.state.type === "ATTACK" ? (
            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].drones) : undefined}
          rotates={this.state.type === "ATTACK"? (
            undefined
          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].rotates)}
          reinforcements={this.state.type === "ATTACK" ? (
            undefined
          ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].reinforcements)}
          breaches={(this.state.type === "ATTACK" ? (
            this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].breaches
          ) : undefined)}
          alert={this.props.alert}
          fetchStrategies={this.props.fetchStrategies}/>
        <main>
          <ViewerSidebar
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
            type={this.state.type}
            shared={this.state.strategies[this.state.strategyIndex].shared}
            shared_key={this.state.strategies[this.state.strategyIndex].shared_key}
            alert={this.props.alert}
            />
          <ViewerCanvas
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
            updateFloor={this.updateFloor}
            floors={this.state.floors}
            objectives={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].objectives
            ) : ( this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].objectives))}
            notes={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].notes
            ) : ( this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].notes))}
            scenes={this.state.scenes}
            sceneIndex={this.state.sceneIndex}
            selectScene={this.selectScene}
            video={this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex][this.state.site][this.state.sceneIndex].video
            ) : ( this.state.map.defense[this.state.site][this.state.strategyIndex].scenes[this.state.sceneIndex].video)}
            />
          <ViewerLineup
            type={this.state.type}
            roles={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].roles
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].roles ))}
            operators={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].operators
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].operators))}
            updateRoles={this.updateRoles} updateOperators={this.updateOperators} updateUtility={this.updateUtility}
            selectOperator={this.selectOperator} activeOperator={this.state.activeOperator}
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
            insertGadget={this.insertGadget}/>
        </main>
      </div>
    )
  }
}

export default Viewer;
