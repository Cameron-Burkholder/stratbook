/* client/components/partials/Strategy.js */

import React from "react";
import Operator from "./Operator.js";

const Strategy = (props) => {
  const objectives = props.strategy.objectives.map((obj, index) => {
    return <li className="strategy__objective" key={index}>{obj}</li>;
  });
  const lineup = props.strategy.lineup.map((op, index) => {
    return <Operator operator={op.name} key={index}/>
  });
  return (
    <div className="strategy">
      <p className="strategy__link" onClick={props.exitStrategy}>Back to Strategies</p>
      <h3 className="strategy__name">{props.strategy.name}</h3>
      <h5 className="strategy__type">{props.strategy.type}</h5>
      <h4 className="strategy__heading">Objectives</h4>
      <ul className="strategy__objectives">
        { objectives }
      </ul>
      <h4 className="strategy__heading">Lineup</h4>
      <div className="strategy__lineup">
        { lineup }
      </div>
      <h4 className="strategy__heading">Execution</h4>
      <p className="strategy__text">{ props.strategy.execution }</p>
      <h4 className="strategy__heading">Backup Plan</h4>
      <p className="strategy__text">{ props.strategy.backup_plan }</p>
    </div>
  )
}

export default Strategy;
