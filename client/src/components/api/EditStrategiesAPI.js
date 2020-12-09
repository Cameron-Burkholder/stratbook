/* client/src/components/api/EditStrategiesAPI.js */

import React from "react";

import axios from "axios";

import CreateStrategiesAPI from "./CreateStrategiesAPI";
import LoadingModal from "../partials/LoadingModal.js";
import ErrorLoading from "../partials/ErrorLoading.js";
import StrategyEdit from "../partials/StrategyEdit.js";
import EditMap from "../partials/EditMap.js";
import { Link } from "react-router-dom";

/*
  @prop getAuthToken: function
  @prop alert: function
*/
const MAP_NAMES = ["BANK", "BORDER", "CHALET", "CLUBHOUSE", "COASTLINE", "CONSULATE", "KAFE DOSTOYEVSKY", "KANAL", "OREGON", "OUTBACK", "THEME PARK", "VILLA"];
class EditStrategiesAPI extends React.Component {
  constructor(props) {
    super(props);

    this.addMap = this.addMap.bind(this);
    this.fetchStrategies = this.fetchStrategies.bind(this);


    this.updateStrategy = this.updateStrategy.bind(this);
    this.deleteStrategy = this.deleteStrategy.bind(this);
    this.selectStrategy = this.selectStrategy.bind(this);
    this.exitStrategy = this.exitStrategy.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeObjective = this.removeObjective.bind(this);
    this.getComponent = this.getComponent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      strategies: [],
      index: 0,
      loading: true,
      hasLoaded: false,
      listView: true,
      add: false,
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
  }
  addMap() {
    this.setState({
      add: true
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
          const maps = Object.keys(response.data.strategies).filter((map) => MAP_NAMES.indexOf(map) >= 0);
          component.setState({
            loading: false,
            hasLoaded: true,
            strategies: response.data.strategies,
            maps: maps
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
  componentDidMount() {
    if (!this.state.hasLoaded) {
      this.fetchStrategies();
    }
  }








  /*
    @func selectStrategy
    @desc choose a strategy
  */
  selectStrategy(index) {

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
    @func: updateStrategy
    @desc: update strategy
  */
  updateStrategy() {

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
          component.fetchStrategies();
          break;
      }
    }).catch((error) => {
      console.log(error);
      component.props.alert("An error has occurred while attempting to update strategy.", "ERROR");
    });
  }





  render() {
    let contents;
    if (this.state.loading) {
      contents = "";
    } else if (this.state.add) {
      contents = <CreateStrategiesAPI getAuthToken={this.props.getAuthToken} alert={this.props.alert} fetchStrategies={this.fetchStrategies} maps={this.state.maps}/>
    } else {
      if (this.state.maps && this.state.maps.length > 0) {

      } else {
        contents = <p>Your team does not currently have any strategies.</p>
      }
    }
    return (
      <div id="EditStrategiesAPI">
        { this.state.loading ? <LoadingModal/> : (
          <div>
            { this.state.maps ? (
              <div>
                { this.state.add ? "" : (
                  <div>
                    <Link className="button" to="/strategies">Back to view</Link>
                    <button className="button" onClick={this.addMap}>Add Map</button>
                  </div>
                )}
                { contents }
              </div>
            ) : (
              <ErrorLoading/>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default EditStrategiesAPI;
