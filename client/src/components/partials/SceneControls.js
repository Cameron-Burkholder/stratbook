import React from "react";

import Objectives from "./Objectives.js";

/**
* @author Cameron Burkholder
* @date 07/14/2021
*/
class SceneControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    let objectiveProps = {};
    if (this.props.function === "Editor") {
      objectiveProps.addObjective = this.props.addObjective;
      objectiveProps.removeObjective = this.props.removeObjective;
      objectiveProps.updateNotes = this.props.updateNotes;
      objectiveProps.updateVideo = this.props.updateVideo;
    }

    let scene_controls = (
      <div className="scene_controls">
        <Objectives objectives={this.props.objectives}
          notes={this.props.notes} scenes={this.props.scenes} sceneIndex={this.props.sceneIndex}
          video={this.props.video}
          function={this.props.function}
          {...objectiveProps}/>
      </div>
    );

    /*
    const sites = this.props.sites.map((site, index) => {
      return (
        <div className={"site" + (this.props.siteIndex === index ? " site--active" : "")} onClick={() => { this.props.selectSite(index) }} key={index}>
          <span className="site__number">Site {index + 1}</span>
          <p className="site__name">{site}</p>
        </div>
      )
    });
    const scenes = this.props.scenes.map((scene, index) => {
      return (
        <div className={"scene" + (this.props.sceneIndex === index ? " scene--active" : "")}
          onClick={() => {
            if (!this.state.active) {
              this.props.selectScene(index);
            }
          }} key={index}>
          <span className="scene__number">Scene {index + 1}</span>
          { this.state.active && this.state.index === index ? (
            <div className="scene__name-input">
              <input className="scene__input" onChange={this.updateName} value={this.state.name}/>
              <button onClick={this.changeName}>&#10003;</button>
            </div>
          ) : (
            <p className="scene__name" onClick={(e) => {
              if (this.props.function === "Editor") {
                this.changeName(e, index);
              }
            }}>{scene.name}</p>
          )}
        </div>
      )
    });
    let strategies;
    let objectiveProps = {};
    if (this.props.function === "Editor") {
      objectiveProps.addObjective = this.props.addObjective;
      objectiveProps.removeObjective = this.props.removeObjective;
      objectiveProps.updateNotes = this.props.updateNotes;
      objectiveProps.updateVideo = this.props.updateVideo;
    }
    if (this.props.function !== "SharedViewer") {
      strategies = this.props.strategies.map((strat, index) => {
        return (
          <option className="strategy" key={index}>{strat.name}</option>
        )
      });
    }
    return (
      <div className={"sidebar" + (this.state.showSidebar ? " sidebar--active" : "")}>
        <div className="canvas__body">
          <Objectives objectives={this.props.objectives}
            notes={this.props.notes} scenes={this.props.scenes} sceneIndex={this.props.sceneIndex}
            video={this.props.video}
            function={this.props.function}
            {...objectiveProps}/>
        </div>
        <button onClick={this.toggleSidebar}>&#8594;</button>
        <div className="sidebar-body">
          <div className="strategy-container">
            <h3 className="strategy-container__heading">{this.props.map.name}: {this.props.type}</h3>
            <h4 className="strategy-container__subtitle">{this.props.sites[this.props.siteIndex]}</h4>
            { this.props.function !== "Editor" && this.props.shared ? (
              <div className="viewer-toggle">
                <label className="switch">
                  <span className={"slider slider--active round"}></span>
                </label>
                <p>Shared</p>
                <a className="toggle__link" rel="noopener noreferrer" href={( this.props.shared ? window.location.protocol + "//" + window.location.host + "/shared/" + this.props.shared_key : "")} target="_blank">view</a>
                <button className="toggle__button" onClick={() => {
                  const temp = document.createElement("textarea");
                  temp.value = window.location.protocol + "//" + window.location.host + "/shared/" + this.props.shared_key;
                  document.body.appendChild(temp);
                  temp.select();
                  temp.setSelectionRange(0, 99999);
                  document.execCommand("copy");
                  document.body.removeChild(temp);
                  this.props.alert("The link to your shared strategy has been copied.", "Strategy Link Copied");
                }}>&#128203;</button>
              </div>
            ) : ""}
            { this.props.function === "Editor" ? (
              <Toggle inactiveState="Private" activeState="Shared" activeAction={this.props.unshare} inactiveAction={this.props.share} active={this.props.shared}
              link={( this.props.shared ? window.location.protocol + "//" + window.location.host + "/shared/" + this.props.shared_key : "")} alert={this.props.alert}/>
            ) : ""}
            { this.props.function !== "SharedViewer" ? (
              <div>
                <h3 className="strategy-container__heading">Strategies</h3>
                <select className="select-container" onChange={(e) => {
                  this.props.selectStrategy(e.target.options.selectedIndex);
                }} value={this.props.strategies[this.props.strategyIndex].name}>
                  { strategies }
                </select>
              </div>
            ) : ""}
          </div>
          <div className="scene-container">
            <h3 className="scene-container__heading">Scenes</h3>
              <div className="select-container">
                { scenes }
              </div>
          </div>
          { this.props.function === "Editor" ? (
            <div className="scene-controls">
              <button onClick={this.props.addScene}>Add Scene</button>
              <button onClick={this.props.removeScene}>Remove Scene</button>
            </div>
          ) : ""}
        </div>
      </div>
    )
    */

    return scene_controls;
  }
}

export default SceneControls
