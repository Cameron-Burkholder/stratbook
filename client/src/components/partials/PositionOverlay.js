/* client/src/components/partials/PositionOverlay.js */

import React from "react";

import DragItem from "./DragItem.js";

class PositionOverlay extends React.Component {
  constructor(props) {
    super(props);

    // Handle select items
    this.selectElement = this.selectElement.bind(this);
    this.deselectElement = this.deselectElement.bind(this);

    // Handle drag canvas
    this.onDrag = this.onDrag.bind(this);
    this.onDragTouch = this.onDragTouch.bind(this);

    // Handle new props
    this.detectChange = this.detectChange.bind(this);

    this.innerSelector = React.createRef();

    this.state = {
      index: 0,
      type: "",
      style: JSON.parse(JSON.stringify(this.props.style)),
      selected: {}
    }
  }
  selectElement(index, type, gi, callback) {
    this.setState({
      index: index,
      drag: true,
      type: type,
      gi: gi,
      selected: {
        type: type,
        index: index,
        gi: gi
      }
    }, () => {
      if (callback) {
        callback();
      }
    });
  }
  deselectElement() {
    this.setState({
      selected: {}
    });
  }
  onDrag(e) {
    this.props.onDragStart(e);
    this.deselectElement();
  }
  onDragTouch(t) {
    this.props.onDragTouch(t);
    this.deselectElement();
  }
  detectChange(prevProps, prevState) {
    let bool = false;
    if (prevProps !== this.props || prevProps.zoom !== this.props.zoom || JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
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
        bounds: bounds
      });
    }
  }
  render() {

    let dragItemProps = this.props.positionProps;
    dragItemProps.deselectElement = this.deselectElement;

    let breaches = [];
    this.props.breaches.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/min/breach.png";
        breaches.push(
          <DragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="BREACH" bounds={this.state.bounds} parentBounds={this.props.bounds} labels={this.props.labels}
            { ...dragItemProps}
            selected={this.state.selected}
            floor={this.props.floorIndex}
            function={this.props.function}
            zoom={this.props.zoom}/>
        )
      }
    });

    let reinforcements = [];
    this.props.reinforcements.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/min/reinforcement.png";
        reinforcements.push(
          <DragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="REINFORCEMENT" bounds={this.state.bounds} parentBounds={this.props.bounds} labels={this.props.labels}
            { ...dragItemProps}
            selected={this.state.selected}
            floor={this.props.floorIndex}
            function={this.props.function}
            zoom={this.props.zoom}
            map={this.props.map}/>
        )
      }
    });

    let rotates = [];
    this.props.rotates.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/min/rotate.png";
        rotates.push(
          <DragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="ROTATE" bounds={this.state.bounds} parentBounds={this.props.bounds} labels={this.props.labels}
            { ...dragItemProps}
            selected={this.state.selected}
            floor={this.props.floorIndex}
            function={this.props.function}
            zoom={this.props.zoom}
            map={this.props.map}/>
        )
      }
    });

    let drones = [];
    this.props.drones.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/min/drone.png";
        drones.push(
          <DragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="DRONE" bounds={this.state.bounds} parentBounds={this.props.bounds} labels={this.props.labels}
            { ...dragItemProps}
            selected={this.state.selected}
            floor={this.props.floorIndex}
            function={this.props.function}
            zoom={this.props.zoom}/>
        )
      } else {
        return "";
      }
    });

    let utility = [];
    this.props.utilityPositions.map((pos, index) => {
      pos.forEach((u, uindex) => {
        if (u.floor === this.props.floorIndex && this.props.utility[index]) {
          let url = `../../media/min/utility/${this.props.utility[index].replace(" ", "_").replace(" ", "_")}.png`;
          utility.push(
            <DragItem url={url}
            x={u.x} y={u.y}
            selectElement={this.selectElement} index={index} gi={uindex} key={(index * 6) + (uindex)} drag={this.state.drag}
            type="UTILITY" bounds={this.state.bounds} parentBounds={this.props.bounds} value={this.props.utility[index]} labels={this.props.labels}
            { ...dragItemProps}
            selected={this.state.selected}
            floor={this.props.floorIndex}
            function={this.props.function}
            zoom={this.props.zoom}/>
          );
        }
      });
    });

    let gadgets = [];
    this.props.gadgetPositions.map((pos, index) => {
      pos.forEach((g, gindex) => {
        if (g.floor === this.props.floorIndex && this.props.gadgets[index]) {
          let gadget = this.props.gadgets[index].gadget.replace(" ", "_").replace(" ", "_").toUpperCase();
          let url = `../../media/min/gadgets/${gadget}.png`;
          gadgets.push(
            <DragItem url={url}
            x={g.x} y={g.y}
            selectElement={this.selectElement} index={index} gi={gindex} key={(6 * index) + (gindex)} drag={this.state.drag}
            type="GADGET" bounds={this.state.bounds} parentBounds={this.props.bounds} value={this.props.gadgets[index].gadget} labels={this.props.labels}
            { ...dragItemProps}
            selected={this.state.selected}
            floor={this.props.floorIndex}
            function={this.props.function}
            zoom={this.props.zoom}/>
          );
        }
      });
    });
    let operators = [];
    this.props.operatorPositions.forEach((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = `../../media/min/operators/${this.props.operators[index].toLowerCase()}.png`;
        operators.push(
          <DragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="OPERATOR" bounds={this.state.bounds} parentBounds={this.props.bounds} value={this.props.operators[index]} labels={this.props.labels}
            { ...dragItemProps}
            selected={this.state.selected}
            floor={this.props.floorIndex}
            function={this.props.function}
            zoom={this.props.zoom}/>
        );
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

export default PositionOverlay;
