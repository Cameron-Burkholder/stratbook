/* client/src/components/partials/ViewerPositionOverlay.js */

import React from "react";

import ViewerDragItem from "./ViewerDragItem.js";

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
      style: JSON.parse(JSON.stringify(this.props.style)),
      selected: {}
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
    if (prevProps !== this.props || prevProps.zoom !== this.props.zoom) {
      bool = true;
    }
    return bool;
  }
  componentDidMount() {
    if (!this.state.bounds) {
      let bounds = this.innerSelector.current.getBoundingClientRect();
      let newBounds = {
        top: bounds.top + window.pageYOffset,
        left: bounds.left + window.pageXOffset,
        x: bounds.x + window.pageXOffset,
        y: bounds.y + window.pageYOffset,
        width: bounds.width,
        height: bounds.height
      }
      this.setState({
        bounds: newBounds
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.detectChange(prevProps, prevState)) {
      let bounds;
      if (this.props.zoom !== prevProps.zoom || this.props.offsetX !== prevProps.offsetX || this.props.offsetY !== prevProps.offsetY) {
        let newBounds = this.innerSelector.current.getBoundingClientRect();
        bounds = {
          top: newBounds.top + window.pageYOffset,
          left: newBounds.left + window.pageXOffset,
          x: newBounds.x + window.pageXOffset,
          y: newBounds.y + window.pageYOffset,
          width: newBounds.width,
          height: newBounds.height
        }
      } else {
        bounds = this.state.bounds;
      }
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
        bounds: bounds
      });
    }
  }
  render() {
    let breaches = [];
    this.state.breaches.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/min/breach.png";
        breaches.push(
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="BREACH" bounds={this.state.bounds} labels={this.props.labels}
            selected={this.state.selected}/>
        )
      }
    });

    let reinforcements = [];
    this.state.reinforcements.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/min/reinforcement.png";
        reinforcements.push(
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="REINFORCEMENT" bounds={this.state.bounds} labels={this.props.labels}
            selected={this.state.selected}/>
        )
      }
    });

    let rotates = [];
    this.state.rotates.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/min/rotate.png";
        rotates.push(
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="ROTATE" bounds={this.state.bounds} labels={this.props.labels}
            selected={this.state.selected}/>
        )
      }
    });

    let drones = [];
    this.state.drones.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/min/drone.png";
        drones.push(
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="DRONE" bounds={this.state.bounds} labels={this.props.labels}
            selected={this.state.selected}/>
        )
      } else {
        return "";
      }
    });

    let utility = [];
    this.state.utilityPositions.map((pos, index) => {
      pos.forEach((u, uindex) => {
        if (u.floor === this.props.floorIndex) {
          let url = `../../media/min/utility/${this.props.utility[index].replace(" ", "_").replace(" ", "_")}.png`;
          utility.push(
            <ViewerDragItem url={url}
            x={u.x} y={u.y}
            selectElement={this.selectElement} index={index} gi={uindex} key={uindex * index + uindex} drag={this.state.drag}
            type="UTILITY" bounds={this.state.bounds} value={this.props.utility[index]} labels={this.props.labels}
            selected={this.state.selected}/>
          );
        }
      });
    });

    let gadgets = [];
    this.state.gadgetPositions.map((pos, index) => {
      pos.forEach((g, gindex) => {
        if (g.floor === this.props.floorIndex) {
          let gadget = this.props.gadgets[index].gadget.replace(" ", "_").replace(" ", "_").toUpperCase();
          let url = `../../media/min/gadgets/${gadget}.png`;
          gadgets.push(
            <ViewerDragItem url={url}
            x={g.x} y={g.y}
            selectElement={this.selectElement} index={index} gi={gindex} key={gindex * index + gindex} drag={this.state.drag}
            type="GADGET" bounds={this.state.bounds} value={this.props.gadgets[index].gadget} labels={this.props.labels}
            selected={this.state.selected}/>
          );
        }
      });
    });

    const operators = this.state.operatorPositions.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = `../../media/min/operators/${this.props.operators[index].toLowerCase()}.png`;
        return (
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="OPERATOR" bounds={this.state.bounds} value={this.props.operators[index]} labels={this.props.labels}
            selected={this.state.selected}/>
        )
      } else {
        return "";
      }
    });
    return (
      <div className="position-overlay" style={this.props.style} ref={this.innerSelector} onMouseDown={this.onDrag} onTouchStart={this.onDragTouch}>
        { reinforcements }
        { rotates }
        { breaches }
        { drones }
        { utility }
        { gadgets }
        { operators }
      </div>
    )
  }
}

export default ViewerPositionOverlay;
