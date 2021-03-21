/* client/components/partials/SharedViewer.js */

import React from "react";
import axios from "axios";

import Loading from "./Loading.js";
import SharedViewerToolbar from "./SharedViewerToolbar.js";
import SharedViewerSidebar from "./SharedViewerSidebar.js";
import SharedViewerCanvas from "./SharedViewerCanvas.js";
import SharedViewerLineup from "./SharedViewerLineup.js";

import { MAP_NAMES, SITES, FLOORS, GADGETS, UTILITY_GUIDE } from "../../data.js";

/*
  @func: SharedViewer
  @desc: manage state of new strategies and make requests to server
  @prop map
  @prop save (function)
  @prop getAuthToken: function
  @prop alert: function
  @prop fetchStrategies: function
  @state:
    name: String
*/
class SharedViewer extends React.Component {
  constructor(props) {
    super(props);

    this.selectSite = this.selectSite.bind(this);
    this.updateFloor = this.updateFloor.bind(this);

    // Operators
    this.selectOperator = this.selectOperator.bind(this);

    // Scenes
    this.selectScene = this.selectScene.bind(this);

    // Handle scroll
    this.handleScroll = this.handleScroll.bind(this);

    // Declare initial state
    let siteIndex;
    let sceneIndex;
    let strategyIndex;
    let scenes;

    if (this.props.strategy.type === "ATTACK") {
      scenes = this.props.strategy[SITES[this.props.strategy.map][this.props.strategy.siteIndex]];
    } else {
      scenes = this.props.strategy.scenes;
    }

    this.state = {
      activeOperator: 0,
      sites: SITES[this.props.strategy.map],
      site: SITES[this.props.strategy.map][this.props.strategy.siteIndex],
      siteIndex: this.props.strategy.siteIndex,
      sceneIndex: 0,
      scenes: scenes,
      floors: FLOORS[this.props.strategy.map],
      floorIndex: this.props.strategy.floorIndex,
      strategy: this.props.strategy,
      type: this.props.strategy.type,
      mounted: false
    }
  }
  selectSite(index) {
    this.setState({
      site: this.state.sites[index],
      siteIndex: index,
      sceneIndex: 0,
      scenes: (this.state.type === "ATTACK" ? this.state.strategy[this.state.sites[index]] : this.state.scenes)
    });
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
      <div id="SharedViewer">
        <SharedViewerToolbar
          strategy={this.state.strategy.name}
          drones={this.state.type === "ATTACK" ? (
            this.state.strategy[this.state.site][this.state.sceneIndex].drones) : undefined}
          rotates={this.state.type === "ATTACK"? (
            undefined
          ) : (this.state.strategy.rotates)}
          reinforcements={this.state.type === "ATTACK" ? (
            undefined
          ) : (this.state.strategy.reinforcements)}
          breaches={(this.state.type === "ATTACK" ? (
            this.state.strategy[this.state.site][this.state.sceneIndex].breaches
          ) : undefined)}
          alert={this.props.alert}
          map={this.state.strategy.map}
          type={this.state.type}/>
        <main>
          <SharedViewerSidebar
            map={this.state.strategy.map}
            strategy={this.state.strategy.name}
            sites={this.state.sites}
            selectSite={this.selectSite}
            siteIndex={this.state.siteIndex}
            scenes={this.state.scenes}
            selectScene={this.selectScene}
            sceneIndex={this.state.sceneIndex}
            type={this.state.type}
            alert={this.props.alert}
            />
          <SharedViewerCanvas
            type={this.state.type}
            operators={this.state.strategy.operators}
            operatorPositions={(this.state.type === "ATTACK" ? (
              this.state.strategy[this.state.site][this.state.sceneIndex].operatorPositions) : (
              this.state.strategy.scenes[this.state.sceneIndex].operatorPositions
            ))}
            gadgets={this.state.strategy.gadgets}
            gadgetPositions={(this.state.type === "ATTACK" ? (
              this.state.strategy[this.state.site][this.state.sceneIndex].gadgetPositions) : (
              this.state.strategy.scenes[this.state.sceneIndex].gadgetPositions
            ))}
            utility={this.state.strategy.utility}
            utilityPositions={(this.state.type === "ATTACK" ? (
              this.state.strategy[this.state.site][this.state.sceneIndex].utilityPositions) : (
              this.state.strategy.scenes[this.state.sceneIndex].utilityPositions
            ))}
            drones={(this.state.type === "ATTACK" ? (
              this.state.strategy[this.state.site][this.state.sceneIndex].drones
            ) : undefined)}
            rotates={(this.state.type === "ATTACK" ? (
              undefined
            ) : this.state.strategy.rotates)}
            reinforcements={(this.state.type === "ATTACK" ? (
              undefined
            ) : this.state.strategy.reinforcements)}
            map={this.state.strategy.map} site={this.state.site} floorIndex={this.state.floorIndex}
            breaches={(this.state.type === "ATTACK" ? (
              this.state.strategy[this.state.site][this.state.sceneIndex].drones
            ) : undefined)}
            floor={this.state.floors[this.state.floorIndex]}
            updateFloor={this.updateFloor}
            floors={this.state.floors}
            objectives={(this.state.type === "ATTACK" ? (
              this.state.strategy[this.state.site][this.state.sceneIndex].objectives
            ) : ( this.state.strategy.scenes[this.state.sceneIndex].objectives))}
            notes={(this.state.type === "ATTACK" ? (
              this.state.strategy[this.state.site][this.state.sceneIndex].notes
            ) : ( this.state.strategy.scenes[this.state.sceneIndex].notes))}
            scenes={this.state.scenes}
            sceneIndex={this.state.sceneIndex}
            selectScene={this.selectScene}
            video={this.state.type === "ATTACK" ? (
              this.state.strategy[this.state.site][this.state.sceneIndex].video
            ) : ( this.state.strategy.scenes[this.state.sceneIndex].video )}
            />
          <SharedViewerLineup
            type={this.state.type}
            roles={this.state.strategy.roles}
            operators={this.state.strategy.operators}
            selectOperator={this.selectOperator} activeOperator={this.state.activeOperator}
            gadgets={this.state.strategy.gadgets}
            gadgetPositions={(this.state.type === "ATTACK" ? (
              this.state.strategy[this.state.site][this.state.sceneIndex].gadgetPositions) : (
              this.state.strategy.scenes[this.state.sceneIndex].gadgetPositions
            ))}
            utility={this.state.strategy.utility}
            utilityPositions={(this.state.type === "ATTACK" ? (
              this.state.strategy[this.state.site][this.state.sceneIndex].utilityPositions) : (
              this.state.strategy.scenes[this.state.sceneIndex].utilityPositions
            ))}/>
        </main>
      </div>
    )
  }
}

export default SharedViewer;
