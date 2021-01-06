/* client/src/components/partials/ViewerSidebar.js */

import React from "react";

class ViewerSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    }
  }
  render() {
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
        <div className={"scene" + (this.props.sceneIndex === index ? " scene--active" : "")} key={index}>
          <span className="scene__number">Scene {index + 1}</span>
          <p className="scene__name">{scene.name}</p>
        </div>
      )
    });
    const strategies = (this.props.type === "ATTACK" ? "" : (
      this.props.strategies.map((strat, index) => {
        return (
          <div className={"strategy" + (this.props.strategyIndex === index ? " strategy--active" : "")} onClick={() => { this.props.selectStrategy(index) }} key={index}>
            <p className="strategy__name">{strat.name}</p>
          </div>
        )
      })
    ));
    return (
      <div className="sidebar">
        { this.props.type === "ATTACK" ? (
          <div className="site-container">
            <h3 className="site-container__heading">{this.props.map}: {this.props.type}</h3>
            <h4 className="site-container__subtitle">{this.props.strategy}</h4>
            { sites }
          </div>
        ) : (
          <div className="strategy-container">
            <h3 className="strategy-container__heading">{this.props.map}: {this.props.type}</h3>
            <h4 className="strategy-container__subtitle">{this.props.sites[this.props.siteIndex]}</h4>
            { strategies }
          </div>
        )}
        <div className="scene-container">
          <h3 className="scene-container__heading">Scenes</h3>
          { scenes }
        </div>
      </div>
    )
  }
}

export default ViewerSidebar;
