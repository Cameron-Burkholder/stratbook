/* client/src/components/partials/Sidebar.js */

import React from "react";

import Lineup from "./Lineup.js";
import Objectives from "./Objectives.js";
import SceneControls from "./SceneControls.js";
import StrategyControls from "./StrategyControls.js";
import Toggle from "./Toggle.js";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.changeName = this.changeName.bind(this);
    this.SetSidebarContents = this.SetSidebarContents.bind(this);

    this.state = {
      index: 0,
      name: "",
      active: false,
      current_display: "LINEUP"
    }
  }
  changeName(e, index) {
    if (e) {
      e.stopPropagation();
    }
    if (this.state.active) {
      if (this.state.name !== "") {
        this.props.updateSceneName(this.state.name, this.state.index);
        this.setState({
          index: 0,
          name: "",
          active: false
        });
      }
    } else {
      this.setState({
        index: index,
        name: this.props.scenes[index].name,
        active: true
      });
    }
  }
  SetSidebarContents(new_contents) {
    this.setState({
      current_display: new_contents
    });
  }
  render() {
    console.log(this.props);
    // CHOOSE WHICH SIDEBAR CONTENTS TO DISPLAY.
    let sidebar_contents = undefined;
    switch (this.state.current_display) {
      case "LINEUP":
        sidebar_contents = <Lineup
          activeOperator={this.props.activeOperator}
          breaches={this.props.breaches}
          drones={this.props.drones}
          function={this.props.function}
          gadgetPositions={this.props.gadgetPositions}
          gadgets={this.props.gadgets}
          insertBreach={this.props.insertBreach}
          insertDrone={this.props.insertDrone}
          insertGadget={this.props.insertGadget}
          insertOperator={this.props.insertOperator}
          insertReinforcement={this.props.insertReinforcement}
          insertRotate={this.props.insertRotate}
          insertUtility={this.props.insertUtility}
          operators={this.props.operators}
          reinforcements={this.props.reinforcements}
          rotates={this.props.rotates}
          selectOperator={this.props.selectOperator}
          type={this.props.type}
          updateOperators={this.props.updateOperators}
          updateUtility={this.props.updateUtility}
          utility={this.props.utility}
          utilityPositions={this.props.utilityPositions}/>;
        break;
      case "SCENE_CONTROLS":
        sidebar_contents = (
          <div className="scene_controls_container">
            <StrategyControls
              function={this.props.function}
              strategy={this.props.strategy}
              updateStrategyName={this.props.updateName}
              updateVideo={this.props.updateVideo}
              video={this.props.video}/>
            <SceneControls
              addObjective={this.props.addObjective}
              function={this.props.function}
              notes={this.props.notes}
              objectives={this.props.objectives}
              removeObjective={this.props.removeObjective}
              scenes={this.props.scenes}
              sceneIndex={this.props.sceneIndex}
              updateNotes={this.props.updateNotes}/>
          </div>
        )
        break;
      case "STRATEGY_SELECTOR":
        break;
    }

    // INSTANTIATE THE SIDEBAR.
    const sidebar = (
      <div className="sidebar">
        <div className="sidebar__controls">
          <i className={"sidebar__control fa fa-street-view" + (this.state.current_display === "LINEUP" ? " sidebar__control--active" : "")}
            onClick={() => { this.SetSidebarContents("LINEUP")}}></i>
          <i className={"sidebar__control fa fa-edit" + (this.state.current_display === "SCENE_CONTROLS" ? " sidebar__control--active" : "")}
            onClick={() => { this.SetSidebarContents("SCENE_CONTROLS")}}></i>
          <i className={"sidebar__control fa fa-bars" + (this.state.current_display === "STRATEGY_SELECTOR" ? " sidebar__control--active" : "")}
            onClick={() => { this.SetSidebarContents("STRATEGY_SELECTOR")}}></i>
        </div>
        <div className="sidebar__contents">
          { sidebar_contents }
        </div>
      </div>
    )
    return sidebar;
  }
}

export default Sidebar;
