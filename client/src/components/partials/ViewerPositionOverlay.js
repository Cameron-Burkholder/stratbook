/* client/src/components/partials/ViewerPositionOverlay.js */

import React from "react";

import ViewerDragItem from "./ViewerDragItem.js";

let width = 30;
let height = 30;

class ViewerPositionOverlay extends React.Component {
  constructor(props) {
    super(props);

    // Handle drag canvas
    this.onDrag = this.onDrag.bind(this);
    this.onDragTouch = this.onDragTouch.bind(this);

    // Handle new props
    this.detectChange = this.detectChange.bind(this);

    this.innerSelector = React.createRef();

    this.state = {
      index: 0,
      type: "",
      operatorPositions: (this.props.operatorPositions ? [...this.props.operatorPositions] : []),
      gadgetPositions: (this.props.gadgetPositions ? [...this.props.gadgetPositions] : []),
      utilityPositions: (this.props.utilityPositions ? [...this.props.utilityPositions] : []),
      drones: (this.props.drones ? [...this.props.drones] : []),
      rotates: (this.props.rotates ? [...this.props.rotates] : []),
      reinforcements: (this.props.reinforcements ? [...this.props.reinforcements] : []),
      breaches: (this.props.breaches ? [...this.props.breaches] : []),
      style: JSON.parse(JSON.stringify(this.props.style))
    }
  }
  onDrag(e) {
    this.props.onDragStart(e);
  }
  onDragTouch(t) {
    this.props.onDragTouch(t);
  }
  detectChange(prevProps, prevState) {
    let bool = false;
    if (prevProps != this.props) {
      bool = true;
    }
    return bool;
  }
  componentDidMount() {
    if (!this.state.bounds) {
      this.setState({
        bounds: this.innerSelector.current.getBoundingClientRect()
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.detectChange(prevProps, prevState)) {
      this.setState({
        index: 0,
        type: "",
        operatorPositions: (this.props.operatorPositions ? [...this.props.operatorPositions] : []),
        gadgetPositions: (this.props.gadgetPositions ? [...this.props.gadgetPositions] : []),
        utilityPositions: (this.props.utilityPositions ? [...this.props.utilityPositions] : []),
        drones: (this.props.drones ? [...this.props.drones] : []),
        rotates: (this.props.rotates ? [...this.props.rotates] : []),
        reinforcements: (this.props.reinforcements ? [...this.props.reinforcements] : []),
        breaches: (this.props.breaches ? [...this.props.breaches] : []),
        bounds: this.innerSelector.current.getBoundingClientRect()
      });
    }
  }
  render() {

    const operators = this.state.operatorPositions.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = `../../media/operators/${this.props.operators[index].toLowerCase()}.png`;
        return (
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="OPERATOR" bounds={this.state.bounds} value={this.props.operators[index]} labels={this.props.labels}/>
        )
      } else {
        return "";
      }
    });

    let drones = [];
    this.state.drones.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/drone.png";
        drones.push(
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="DRONE" bounds={this.state.bounds} labels={this.props.labels}/>
        )
      } else {
        return "";
      }
    });

    let gadgets = [];
    this.state.gadgetPositions.map((pos, index) => {
      pos.forEach((g, gindex) => {
        if (g.floor === this.props.floorIndex) {
          let gadget = this.props.gadgets[index].gadget.replace(" ", "_").replace(" ", "_").toUpperCase();
          let url = `../../media/gadgets/${gadget}.png`;
          gadgets.push(
            <ViewerDragItem url={url}
            x={g.x} y={g.y}
            selectElement={this.selectElement} index={index} gindex={gindex} key={gindex * index + gindex} drag={this.state.drag}
            type="GADGET" bounds={this.state.bounds} value={this.props.gadgets[index].gadget} labels={this.props.labels}/>
          );
        }
      });
    });

    let utility = [];
    this.state.utilityPositions.map((pos, index) => {
      pos.forEach((u, uindex) => {
        if (u.floor === this.props.floorIndex) {
          let url = `../../media/utility/${this.props.utility[index].replace(" ", "_").replace(" ", "_")}.png`;
          utility.push(
            <ViewerDragItem url={url}
            x={u.x} y={u.y}
            selectElement={this.selectElement} index={index} uindex={uindex} key={uindex * index + uindex} drag={this.state.drag}
            type="UTILITY" bounds={this.state.bounds} value={this.props.utility[index]} labels={this.props.labels}/>
          );
        }
      });
    });

    let rotates = [];
    this.state.rotates.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/rotate.png";
        rotates.push(
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="ROTATE" bounds={this.state.bounds} labels={this.props.labels}/>
        )
      }
    });

    let reinforcements = [];
    this.state.reinforcements.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/reinforcement.png";
        reinforcements.push(
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="REINFORCEMENT" bounds={this.state.bounds} labels={this.props.labels}/>
        )
      }
    });

    let breaches = [];
    this.state.breaches.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../breach.png";
        breaches.push(
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="BREACH" bounds={this.state.bounds} labels={this.props.labels}/>
        )
      }
    });

    return (
      <div className="position-overlay" style={this.props.style} ref={this.innerSelector} onMouseDown={this.onDrag} onTouchStart={this.onDragTouch}>
        { operators }
        { drones }
        { rotates }
        { gadgets }
        { utility }
        { reinforcements }
        { breaches }
      </div>
    )
  }
}

export default ViewerPositionOverlay;
