import React from "react";

class StrategyControls extends React.Component {
  constructor(props) {
    super(props);

    this.updateName = this.updateName.bind(this);

    this.state = {
      strategy_name: ""
    }
  }
  updateName(e) {
    this.setState({
      strategy_name: e.target.value
    });
  }
  render() {
    let strategy_controls = (
      <div className="strategy_controls">
        <h3>{this.props.function === "EDITOR" ? "Edit" : "View"} Strategy: {this.props.strategy}</h3>
        <h4>Strategy Name</h4>
        { this.props.function === "Editor" ? (
          <div className="strategy__name-input">
            <input className="strategy__input" onChange={this.updateName} value={this.state.strategy_name} placeholder={this.props.strategy}/>
            <button onClick={() => { this.props.updateStrategyName(this.state.strategy_name) }}>&#10003;</button>
          </div>
        ) : (
          <p className="strategy__name">{this.props.strategy}</p>
        )}
        { this.props.function === "Editor" || this.props.video !== "" ? (
          <h4 className="video_link">Video Link</h4>
        ) : ""}
        { this.props.function === "Editor" ? (
          <input onChange={this.props.updateVideo} value={this.props.video}/>
        ) : (
          <div>
            { this.props.video !== "" ? (
              <a className="objectives__video" href={this.props.video} rel="noopener noreferrer" target="_blank">Watch Video</a>
            ) : ""}
          </div>
        )}
      </div>
    );

    return strategy_controls;
  }
}

export default StrategyControls
