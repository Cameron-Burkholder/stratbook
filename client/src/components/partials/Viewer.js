/* client/components/partials/Viewer.js */

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
  @func: Viewer
  @desc: view strategies
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

    // Strategies
    this.selectStrategy = this.selectStrategy.bind(this);

    // Scenes
    this.selectScene = this.selectScene.bind(this);

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

  render() {
    return (
      <div id="Viewer">
        <ViewerToolbar
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
            addScene={this.addScene}
            removeScene={this.removeScene}
            updateSceneName={this.updateSceneName}
            type={this.state.type}/>
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
            />
          <ViewerLineup
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
            gadgets={(this.state.type === "ATTACK" ? (
              this.state.map.attack[this.state.strategyIndex].gadgets
            ) : (this.state.map.defense[this.state.site][this.state.strategyIndex].gadgets))}/>
        </main>
      </div>
    )
  }
}

export default Viewer;
