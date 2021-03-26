/* client/src/components/partials/Toggle.js */

import React from "react";

class Toggle extends React.Component {
  render() {
    return (
      <div className="toggle">
        <label className="switch">
          <input type="checkbox" checked={(this.props.active && this.props.active !== "" ? true : false)} onChange={() => {
            if (this.props.active) {
              this.props.activeAction();
            } else {
              this.props.inactiveAction();
            }
          }}/>
          <span className="slider round"></span>
        </label>
        <p>{(this.props.active ? this.props.activeState : this.props.inactiveState )}</p>
        { this.props.link && this.props.link !== "" ? (
          <a className="toggle__link" rel="noopener noreferrer" href={this.props.link} target="_blank">view</a>
        ) : ""}
        { this.props.link && this.props.link !== "" ? (
          <button className="toggle__button" onClick={() => {
            const temp = document.createElement("textarea");
            temp.value = this.props.link;
            document.body.appendChild(temp);
            temp.select();
            temp.setSelectionRange(0, 99999);
            document.execCommand("copy");
            document.body.removeChild(temp);
            this.props.alert("The link to your shared strategy has been copied.", "Strategy Link Copied");
          }}>&#128203;</button>
        ) : ""}
      </div>
    )
  }
}

export default Toggle;
