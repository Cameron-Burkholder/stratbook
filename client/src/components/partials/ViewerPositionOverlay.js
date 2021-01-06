/* client/src/components/partials/ViewerPositionOverlay.js */

import React from "react";

import ViewerDragItem from "./ViewerDragItem.js";

class ViewerPositionOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.detectChange = this.detectChange.bind(this);
    this.selector = React.createRef();

    this.state = {
      index: 0,
      type: "",
      operatorPositions: (this.props.operatorPositions ? [...this.props.operatorPositions] : []),
      gadgetPositions: (this.props.gadgetPositions ? [...this.props.gadgetPositions] : []),
      utilityPositions: (this.props.utilityPositions ? [...this.props.utilityPositions] : []),
      drones: (this.props.drones ? [...this.props.drones] : []),
      rotates: (this.props.rotates ? [...this.props.rotates] : []),
      reinforcements: (this.props.reinforcements ? [...this.props.reinforcements] : []),
      breaches: (this.props.breaches ? [...this.props.breaches] : [])
    }
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
        bounds: this.selector.current.getBoundingClientRect()
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
        breaches: (this.props.breaches ? [...this.props.breaches] : [])
      });
    }
  }
  render() {
    const operators = this.state.operatorPositions.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = `https://cdn.r6stats.com/badges/${this.props.operators[index].toLowerCase()}_badge.png`;
        return (
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            index={index} key={index}
            type="OPERATOR" bounds={this.state.bounds}/>
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
            index={index} key={index}
            type="DRONE" bounds={this.state.bounds}/>
        )
      } else {
        return "";
      }
    });

    let gadgets = [];
    this.state.gadgetPositions.map((pos, index) => {
      pos.forEach((g, gindex) => {
        if (g.floor === this.props.floorIndex) {
          let url = "https://i.redd.it/r90417o3mq411.jpg";
          gadgets.push(
            <ViewerDragItem url={url}
            x={g.x} y={g.y}
            index={index} gindex={gindex} key={gindex * index + gindex}
            type="GADGET" bounds={this.state.bounds}/>
          );
        }
      });
    });

    let utility = [];
    this.state.utilityPositions.map((pos, index) => {
      pos.forEach((u, uindex) => {
        if (u.floor === this.props.floorIndex) {
          let url = `../../media/${this.props.utility[index].replace(" ", "_").replace(" ", "_")}.png`;
          utility.push(
            <ViewerDragItem url={url}
            x={u.x} y={u.y}
            index={index} uindex={uindex} key={uindex * index + uindex}
            type="UTILITY" bounds={this.state.bounds}/>
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
            index={index} key={index}
            type="ROTATE" bounds={this.state.bounds}/>
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
            index={index} key={index}
            type="REINFORCEMENT" bounds={this.state.bounds}/>
        )
      }
    });


    let breaches = [];
    this.state.breaches.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = "../../media/breach.png";
        breaches.push(
          <ViewerDragItem url={url}
            x={pos.x} y={pos.y}
            index={index} key={index}
            type="BREACH" bounds={this.state.bounds}/>
        )
      }
    });

    return (
      <div className="position-overlay" ref={this.selector}>
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
