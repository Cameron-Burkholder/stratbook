/* client/src/components/partials/PositionOverlay.js */

import React from "react";

import DragItem from "./DragItem.js";

class PositionOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.selectElement = this.selectElement.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.selector = React.createRef();

    this.state = {
      index: 0,
      type: "",
      operatorPositions: this.props.operatorPositions,
      gadgetPositions: this.props.gadgetPositions,
      utilityPositions: this.props.utilityPositions,
      drones: this.props.drones,
      rotates: this.props.rotates,
      reinforcements: this.props.reinforcements,
      breaches: this.props.breaches
    }
  }
  selectElement(index, type, gi) {
    this.setState({
      index: index,
      drag: true,
      type: type,
      gi: gi
    }, () => {
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    });
  }
  onMouseMove(e) {
    console.log(e);
    let width = 60;
    let height = 60;
    let newPositions;
    switch (this.state.type) {
      case "OPERATOR":
        newPositions = [...this.state.operatorPositions];
        break;
      case "DRONE":
        newPositions = [...this.state.drones];
        break;
      case "GADGET":
        newPositions = [...this.state.gadgetPositions][this.state.index];
        break;
      case "UTILITY":
        newPositions = [...this.state.utilityPositions][this.state.index];
        break;
      case "ROTATE":
        newPositions = [...this.state.rotates];
        break;
      case "REINFORCEMENT":
        newPositions = [...this.state.reinforcements];
        break;
      case "BREACH":
        newPositions = [...this.state.breaches];
        break;
    }
    let newX = e.pageX - this.state.bounds.left - (width / 2);
    let newY = e.pageY - this.state.bounds.top - (height / 2);
    if (newX < 0) {
      newX = 0;
    } else if (newX > this.state.bounds.width - width) {
      newX = this.state.bounds.width - width;
    }
    if (newY < 0) {
      newY = 0;
    } else if (newY > this.state.bounds.height - height) {
      newY = this.state.bounds.height - height;
    }
    if (this.state.type === "GADGET" || this.state.type === "UTILITY") {
      newPositions[this.state.gi].x = newX;
      newPositions[this.state.gi].y = newY;
    } else {
      newPositions[this.state.index].x = newX;
      newPositions[this.state.index].y = newY;
    }
    let positions;
    switch (this.state.type) {
      case "OPERATOR":
        this.setState({
          operatorPositions: newPositions
        });
        break;
      case "DRONE":
        this.setState({
          drones: newPositions
        });
        break;
      case "GADGET":
        positions = [...this.state.gadgetPositions];
        positions[this.state.index] = newPositions;
        this.setState({
          gadgetPositions: positions
        });
        break;
      case "UTILITY":
        positions = [...this.state.utilityPositions];
        positions[this.state.index] = newPositions;
        this.setState({
          utilityPositions: positions
        });
        break;
      case "ROTATE":
        this.setState({
          rotates: newPositions
        });
        break;
      case "REINFORCEMENT":
        this.setState({
          reinforcements: newPositions
        });
        break;
      case "BREACH":
        this.setState({
          breaches: newPositions
        });
        break;
    }
  }
  onMouseUp(e) {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    this.setState({
      drag: false
    }, () => {
      switch (this.state.type) {
        case "OPERATOR":
          this.props.updateOperatorPositions(this.state.operatorPositions);
          break;
        case "DRONE":
          this.props.updateDronePositions(this.state.drones);
          break;
        case "GADGET":
          this.props.updateGadgetPositions(this.state.gadgetPositions);
          break;
        case "UTILITY":
          this.props.updateUtilityPositions(this.state.utilityPositions);
          break;
        case "ROTATE":
          this.props.updateRotatePositions(this.state.rotates);
          break;
        case "REINFORCEMENT":
          this.props.updateReinforcementPositions(this.state.reinforcements);
          break;
        case "BREACH":
          this.props.updateBreachPositions(this.state.breaches);
          break;
      }
      this.setState({
        type: undefined,
        gi: undefined
      });
    });
  }
  componentDidMount() {
    if (!this.state.bounds) {
      this.setState({
        bounds: this.selector.current.getBoundingClientRect()
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.type !== this.props.type) {
      this.setState({
        index: 0,
        type: "",
        operatorPositions: this.props.operatorPositions,
        gadgetPositions: this.props.gadgetPositions,
        utilityPositions: this.props.utilityPositions,
        drones: this.props.drones,
        rotates: this.props.rotates,
        reinforcements: this.props.reinforcements,
        breaches: this.props.breaches
      });
    }
  }
  render() {
    const operators = this.state.operatorPositions.map((pos, index) => {
      if (pos.floor === this.props.floorIndex) {
        let url = `https://cdn.r6stats.com/badges/${this.props.operators[index].toLowerCase()}_badge.png`;
        return (
          <DragItem url={url}
            x={pos.x} y={pos.y}
            selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
            type="OPERATOR"/>
        )
      } else {
        return "";
      }
    });

    let drones = [];
    if (this.state.drones && this.props.type === "ATTACK") {
      this.state.drones.map((pos, index) => {
        if (pos.floor === this.props.floorIndex) {
          let url = "https://external-preview.redd.it/mYPEnvxN9kDjubOi6dDM6IO1Z5Ando9V8Vzi1VS2qnM.png?auto=webp&s=0a1d4f3a875a6fc968ec22e68c9a7d868b342281";
          drones.push(
            <DragItem url={url}
              x={pos.x} y={pos.y}
              selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
              type="DRONE"/>
          )
        } else {
          return "";
        }
      });
    }

    let gadgets = [];
    this.state.gadgetPositions.map((pos, index) => {
      pos.forEach((g, gindex) => {
        if (g.floor === this.props.floorIndex) {
          let url = "https://i.redd.it/r90417o3mq411.jpg";
          gadgets.push(
            <DragItem url={url}
            x={g.x} y={g.y}
            selectElement={this.selectElement} index={index} gindex={gindex} key={gindex * index + gindex} drag={this.state.drag}
            type="GADGET"/>
          );
        }
      });
    });

    let utility = [];
    this.state.utilityPositions.map((pos, index) => {
      pos.forEach((u, uindex) => {
        if (u.floor === this.props.floorIndex) {
          let url = "https://liquipedia.net/commons/images/thumb/3/34/Barbed_Wire_R6S.jpg/256px-Barbed_Wire_R6S.jpg";
          utility.push(
            <DragItem url={url}
            x={u.x} y={u.y}
            selectElement={this.selectElement} index={index} uindex={uindex} key={uindex * index + uindex} drag={this.state.drag}
            type="UTILITY"/>
          );
        }
      });
    });

    let rotates = [];
    if (this.state.rotates && this.props.type === "DEFENSE") {
      this.state.rotates.map((pos, index) => {
        if (pos.floor === this.props.floorIndex) {
          let url = "https://img.favpng.com/11/9/20/explosion-cartoon-comics-bomb-png-favpng-uuPp7vCWSNnrUGy9QDQ0xyib8.jpg";
          rotates.push(
            <DragItem url={url}
              x={pos.x} y={pos.y}
              selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
              type="ROTATE"/>
          )
        }
      });
    }

    let reinforcements = [];
    if (this.state.reinforcements && this.props.type === "DEFENSE") {
      this.state.reinforcements.map((pos, index) => {
        if (pos.floor === this.props.floorIndex) {
          let url = "https://pm1.narvii.com/6859/4e921e8569aa49248d84d4deb2a31968c37d5533v2_hq.jpg";
          reinforcements.push(
            <DragItem url={url}
              x={pos.x} y={pos.y}
              selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
              type="REINFORCEMENT"/>
          )
        }
      });
    }

    let breaches = [];
    if (this.state.breaches && this.props.type === "ATTACK") {
      this.state.breaches.map((pos, index) => {
        if (pos.floor === this.props.floorIndex) {
          let url = "https://img.favpng.com/11/9/20/explosion-cartoon-comics-bomb-png-favpng-uuPp7vCWSNnrUGy9QDQ0xyib8.jpg";
          breaches.push(
            <DragItem url={url}
              x={pos.x} y={pos.y}
              selectElement={this.selectElement} index={index} key={index} drag={this.state.drag}
              type="BREACH"/>
          )
        }
      });
    }

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

export default PositionOverlay;
