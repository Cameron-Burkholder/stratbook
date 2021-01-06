/* client/src/components/partials/Dropdown.js */

import React from "react";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      active: false
    }
  }
  toggle() {
    this.setState({
      active: !this.state.active
    });
  }
  render() {
    const items = this.props.links.map((link, index) => {
      return (
        <p className="dropdown-item" onClick={() => {
            this.toggle();
            this.props.actions[index]();
          }} key={index}>{link}</p>
      )
    });
    return (
      <div className={"dropdown" + (this.state.active ? " dropdown--active" : "")}>
        <p className="dropdown-title" onClick={this.toggle}>{this.props.title}</p>
        <div className="dropdown-body">
          { items }
        </div>
      </div>
    )
  }
}

export default Dropdown;
