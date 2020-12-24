/* client/src/components/partials/ProgressCircle.js */

import React from "react";

class ProgressCircle extends React.Component {
  constructor(props) {
    super(props);
    this.count = this.count.bind(this);

    this.state = {
      value: 0,
      counted: false
    }
  }
  count() {
    if (this.state.value < this.props.value) {
      this.setState({
        value: this.state.value + (0.05 * this.props.value)
      });
    } else {
      this.setState({
        value: this.props.value,
        counted: true
      });
    }
  }
  componentDidMount() {
    if (!this.state.counted) {
      this.counter = setInterval(this.count, 50);
    }
  }
  render() {
    return (
      <div className="progress-circle">
        <p>{this.props.label}</p>
        <p className="progress-circle__value">{Math.floor(this.state.value * 100) / 100}</p>
      </div>
    )
  }
}

export default ProgressCircle;
