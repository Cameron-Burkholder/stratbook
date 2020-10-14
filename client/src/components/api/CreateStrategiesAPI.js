/* client/components/api/CreateStrategiesAPI.js */

import React from "react";
import axios from "axios";

import Loading from "../partials/Loading.js";
import CreateStrategyForm from "../partials/CreateStrategyForm.js";

/*
  @func: CreateStrategiesAPI
  @desc: manage state of new strategies and make requests to server
  @prop getAuthToken: function
  @prop alert: function
  @state:
    name: String
*/
class CreateStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.removeObjective = this.removeObjective.bind(this);
    this.getComponent = this.getComponent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      type: "ATTACK",
      newObjective: "",
      objectives: [],
      execution: "",
      roles: ["ANY", "ANY", "ANY", "ANY", "ANY"],
      operators: ["", "", "" , "", ""],
      errors: {},
      loading: false
    }
  }
  /*
    @func: onChange
    @desc: update state of strategy field
    @param e: Object.Event
    @param index: Int
  */
  onChange(e, index) {
    if (e.target.id !== "objectives") {
      if (e.target.id.includes("attacker-role") || e.target.id.includes("defender-role")) {
        let newRoles = [...this.state.roles];
        let newOperators = [...this.state.operators];
        newRoles[index] = e.target.value;
        newOperators[index] = "";
        this.setState({
          roles: newRoles,
          operators: newOperators
        });
      } else if (e.target.id.includes("attacker-form") || e.target.id.includes("defender-form")) {
        let newOperators = [...this.state.operators];
        newOperators[index] = e.target.value;
        this.setState({
          operators: newOperators
        });
      } else if (e.target.id.includes("type")) {
        this.setState({
          [e.target.id]: e.target.value,
          roles: ["ANY", "ANY", "ANY", "ANY", "ANY"],
          operators: []
        });
      } else {
        this.setState({
          [e.target.id]: e.target.value
        });
      }
    }
  }
  /*
    @func onKeyPress
    @desc: check to see if a user hit enter to create a new li
    @param e: Object.Event
    @param component: React.Component
  */
  onKeyPress(e, component) {
    if (e.key === "Enter") {
      let newObjectives = [...component.state.objectives];
      newObjectives.push(component.state.newObjective);
      setTimeout(() => {
        component.setState({
          objectives: newObjectives,
          newObjective: ""
        });
      }, 100);
    }
  }
  /*
    @func: getComponent
    @desc: return access to root component
  */
  getComponent() {
    return this;
  }
  /*
    @func: removeObjective
    @desc: update objective list
    @param index: index of item to be removed
  */
  removeObjective(index) {
    let newObjectives = [...this.state.objectives];
    newObjectives.splice(index, 1);
    this.setState({
      objectives: newObjectives
    });
  }
  /*
    @func: onSubmit
    @desc: submit form data to server, rerender page depending on response
    @param e: Object.Event
  */
  onSubmit(e) {
    e.preventDefault();
    const component = this;
    this.setState({
      errors: {},
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.post("/api/strategies/create", {
      strategy: {
        name: component.state.name,
        type: component.state.type,
        objectives: component.state.objectives,
        roles: component.state.roles,
        operators: component.state.operators,
        execution: component.state.execution
      }
    }).then((response) => {
      switch (response.data.status) {
        case "STRATEGY_CREATED":
          component.setState({
            loading: false,
          });
          alert("Success! Your team has been created.");
          break;
        default:
          component.setState({
            loading: false,
            errors: response.data.errors
          });
          component.props.alert(response.data.message);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.props.alert("An error has occurred. Please try again shortly.");
    });
  }
  render() {
    return (
      <div id="CreateStrategiesAPI">
        <h3>Create a Strategy</h3>
        { this.state.loading ? (
          <Loading/>
        ) : (
          <CreateStrategyForm onChange={this.onChange} onSubmit={this.onSubmit} name={this.state.name} type={this.state.type}
                              newObjective={this.state.newObjective} objectives={this.state.objectives} removeObjective={this.removeObjective}
                              onKeyPress={this.onKeyPress} getComponent={this.getComponent} execution={this.state.execution}
                              roles={this.state.roles} operators={this.state.operators}/>
        )}
      </div>
    )
  }
}

export default CreateStrategiesAPI;
