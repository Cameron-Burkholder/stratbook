/* client/src/components/partials/SharedViewerSidebar.js */

import React from "react";

class SharedViewerSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSidebar = this.toggleSidebar.bind(this);

    this.state = {
      index: 0,
      name: "",
      showSidebar: false
    }
  }
  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    });
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
        <div className={"scene" + (this.props.sceneIndex === index ? " scene--active" : "")}
          onClick={() => {
            if (!this.state.active) {
              this.props.selectScene(index);
            }
          }} key={index}>
          <span className="scene__number">Scene {index + 1}</span>
          <p className="scene__name">{scene.name}</p>
        </div>
      )
    });
    return (
      <div className={"sidebar" + (this.state.showSidebar ? " sidebar--active" : "")}>
        <button onClick={this.toggleSidebar}>&#8594;</button>
        <div className="sidebar-body">
          { this.props.type === "ATTACK" ? (
            <div className="site-container">
              <h3 className="site-container__heading">{this.props.map}: {this.props.type}</h3>
              <h4 className="site-container__subtitle">{this.props.strategy}</h4>
              { sites }
            </div>
          ) : ("") }
          <div className="scene-container">
            { this.props.type === "ATTACK" ? (
              <h3 className="scene-container__heading">Scenes</h3>
            ) : (
              <div>
                <h3 className="scene-container__heading">{this.props.map}: {this.props.type}</h3>
                <h4 className="scene-container__subtitle">{this.props.sites[this.props.siteIndex]}</h4>
              </div>
            )}
            { scenes }
          </div>
        </div>
      </div>
    )
  }
}

export default SharedViewerSidebar;
