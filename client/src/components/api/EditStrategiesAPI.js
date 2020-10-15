/* client/src/components/api/EditStrategiesAPI.js */

import React from "react";

import axios from "axios";

import CreateStrategiesAPI from "./CreateStrategiesAPI";
import LoadingModal from "../partials/LoadingModal.js";
import StrategyEdit from "../partials/StrategyEdit.js";

/*
  @prop getAuthToken: function
  @prop alert: function
*/

class EditStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.fetchStrategies = this.fetchStrategies.bind(this);
    this.selectStrategy = this.selectStrategy.bind(this);
    this.exitStrategy = this.exitStrategy.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeObjective = this.removeObjective.bind(this);
    this.getComponent = this.getComponent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteStrategy = this.deleteStrategy.bind(this);

    this.state = {
      strategies: [],
      index: 0,
      loading: true,
      hasLoaded: false,
      listView: true,
      search: "",
      name: "",
      type: "ATTACK",
      newObjective: "",
      objectives: [],
      execution: "",
      roles: ["ANY", "ANY", "ANY", "ANY", "ANY"],
      operators: ["", "", "" , "", ""],
      utility: ["ANY", "ANY", "ANY", "ANY", "ANY"],
      errors: {},
    }
  }/*
    @func selectStrategy
    @desc choose a strategy
  */
  selectStrategy(index) {
    this.setState({
      index: index,
      listView: false,
      name: this.state.strategies[this.state.index].name,
      type: this.state.strategies[this.state.index].type,
      objectives: this.state.strategies[this.state.index].objectives,
      execution: this.state.strategies[this.state.index].execution,
      roles: this.state.strategies[this.state.index].roles,
      operators: this.state.strategies[this.state.index].operators,
      utility: this.state.strategies[this.state.index].utility
    });
  }
  /*
    @func exitStrategy
    @desc go back to list view
  */
  exitStrategy() {
    this.setState({
      listView: true
    })
  }
  /*

  */
  onSearchChange(e) {
    this.setState({
      search: e.target.value
    });
  }
  /*
    @func fetchStrategies
    @desc get strategies from server
  */
  fetchStrategies() {
    const component = this;
    this.setState({
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.get("/api/strategies/view")
      .then((response) => {
      switch (response.data.status) {
        case "STRATEGIES_FOUND":
          component.setState({
            loading: false,
            hasLoaded: true,
            strategies: response.data.strategies
          });
          break;
          default:
          component.setState({
            loading: false
          });
          component.props.alert(response.data.message, response.data.status);
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.setState({
        loading: false
      });
      component.props.alert("An error has occurred while attempting to get strategies.", "ERROR");
    });
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
        let newUtility = [...this.state.utility];
        newRoles[index] = e.target.value;
        newOperators[index] = "";
        newUtility[index] = "ANY";
        this.setState({
          roles: newRoles,
          operators: newOperators,
          utility: newUtility
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
          operators: ["", "", "", "", ""]
        });
      } else if (e.target.id.includes("utility-form")) {
        let newUtility = [...this.state.utility];
        newUtility[index] = e.target.value;
        this.setState({
          utility: newUtility
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
  onSubmit(e, index) {
    e.preventDefault();
    const component = this;
    this.setState({
      errors: {},
      loading: true
    });
    axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
    axios.patch("/api/strategies/update", {
      index: index,
      strategy: {
        name: component.state.name,
        type: component.state.type,
        objectives: component.state.objectives,
        roles: component.state.roles,
        utility: component.state.utility,
        operators: component.state.operators,
        execution: component.state.execution
      }
    }).then((response) => {
      switch (response.data.status) {
        case "STRATEGY_UPDATED":
          component.setState({
            loading: false,
          });
          component.props.alert("Your strategy has been updated.", "SUCCESS");
          component.fetchStrategies();
          break;
        default:
          component.setState({
            loading: false,
            errors: response.data.errors
          });
          component.props.alert(response.data.message, response.data.status);
          component.props.fetchStrategies();
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.props.alert("An error has occurred while attempting to update strategy.", "ERROR");
    });
  }
  /*
    @func: deleteStrategy
    @desc: delete a strategy
    @pararm index: Int
  */
  deleteStrategy(index) {
    if (window.confirm("Please confirm that you would like to delete this strategy. This cannot be undone.")) {
      const component = this;
      this.setState({
        errors: {},
        loading: true
      });
      axios.defaults.headers.common["Authorization"] = this.props.getAuthToken();
      axios.patch("/api/strategies/delete", {
        index: index
      }).then((response) => {
        switch (response.data.status) {
          case "STRATEGY_DELETED":
            component.setState({
              loading: false,
            });
            component.props.alert("Your strategy has been deleted.", "SUCCESS");
            component.fetchStrategies();
            break;
          default:
            component.setState({
              loading: false,
              errors: response.data.errors
            });
            component.props.alert(response.data.message, response.data.status);
            component.props.fetchStrategies();
            break;
        }
      }).catch((error) => {
        console.log(error);
        component.props.alert("An error has occurred while attempting to delete strategy.", "ERROR");
      });
    }
  }
  componentDidMount() {
    if (!this.state.hasLoaded) {
      this.fetchStrategies();
    }
  }
  render() {
    let contents;
    if (this.state.loading) {
      contents = "";
    } else {
        if (this.state.strategies.length > 0) {
          const strats = this.state.strategies.map((strat, index) => {
            if (this.state.search === "" || strat.name.toUpperCase().includes(this.state.search.toUpperCase())) {
              return (
                <div className="strategy-preview" key={index}>
                  <h3 className="strategy-preview-heading" onClick={() => { this.selectStrategy(index) }}>{strat.name}</h3>
                  <p className="strategy-preview-type">{strat.type}</p>
                  <button className="strategy-preview-button" onClick={() => { this.deleteStrategy(index) }}>Delete</button>
                </div>
              )
            }
          });
          contents = (this.state.listView) ? (
            <div className="strategy-list">
              <input className="strategy-search" onChange={this.onSearchChange} value={this.state.search} type="text" placeholder="Search Strategies"/>
              { strats }
            </div>
          ) : (
            <StrategyEdit onChange={this.onChange} onSubmit={this.onSubmit} name={this.state.name} type={this.state.type}
                          newObjective={this.state.newObjective} objectives={this.state.objectives} removeObjective={this.removeObjective}
                          onKeyPress={this.onKeyPress} getComponent={this.getComponent} execution={this.state.execution}
                          roles={this.state.roles} operators={this.state.operators} errors={this.state.errors} utility={this.state.utility}
                          index={this.state.index} exitStrategy={this.exitStrategy}/>
          )
        } else {
          contents = <p>Your team does not currently have any strategies.</p>
        }
    }
    return (
      <div id="EditStrategiesAPI">
        <h3>Edit Strategies</h3>
        <CreateStrategiesAPI getAuthToken={this.props.getAuthToken} alert={this.props.alert} fetchStrategies={this.fetchStrategies}/>
        { this.state.loading ? <LoadingModal/> : (
          <div>
            { contents }
          </div>
        )}
      </div>
    )
  }
}

export default EditStrategiesAPI;
