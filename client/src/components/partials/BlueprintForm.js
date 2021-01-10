/* client/src/components/partials/Blueprint.js */

import React from "react";

import PositionOverlay from "./PositionOverlay.js";

const width = 900;
const height = 675;

class BlueprintForm extends React.Component {
  constructor(props) {
    super(props);

    this.selector = React.createRef();

    this.state = {};
  }
  componentDidMount() {
    if (!this.state.bounds) {
      this.setState({
        bounds: this.selector.current.getBoundingClientRect()
      })
    }
  }
  render() {
    const url = `../../media/maps/${this.props.map.replace(" ", "_")}-${this.props.floor.toUpperCase().replace(" ", "_")}-min.jpg`;
    const style = {
      backgroundImage: `url(${url})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      transform: `scale(${parseFloat(this.props.zoom)})`
    };
    return (
      <div className="blueprint-form" ref={this.selector}>
        <PositionOverlay
          style={style}
          operators={this.props.operators}
          operatorPositions={this.props.operatorPositions}
          gadgets={this.props.gadgets}
          gadgetPositions={this.props.gadgetPositions}
          utility={this.props.utility}
          utilityPositions={this.props.utilityPositions}
          drones={this.props.drones}
          rotates={this.props.rotates}
          reinforcements={this.props.reinforcements}
          floorIndex={this.props.floorIndex}
          breaches={this.props.breaches}
          updateOperatorPositions={this.props.updateOperatorPositions}
          updateGadgetPositions={this.props.updateGadgetPositions}
          updateDronePositions={this.props.updateDronePositions}
          updateUtilityPositions={this.props.updateUtilityPositions}
          updateRotatePositions={this.props.updateRotatePositions}
          updateReinforcementPositions={this.props.updateReinforcementPositions}
          updateBreachPositions={this.props.updateBreachPositions}
          type={this.props.type}
          zoom={this.props.zoom}
          bounds={this.state.bounds}/>
      </div>
    )
  }
}

export default BlueprintForm;
