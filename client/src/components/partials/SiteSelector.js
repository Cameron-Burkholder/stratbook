/* client/src/components/partials/SiteSelector.js */

import React from "react";
import { SITES } from "../../data.js";

const SiteSelector = (props) => {
  const options = SITES[props.map].map((site, index) => {
    return <option key={index}>{site}</option>
  });
  return (
    <div className="site-selector">
      <select className="site-selector__input" onChange={props.selectSite} value={props.site}>
        { options }
      </select>
    </div>
  )
}

export default SiteSelector;
