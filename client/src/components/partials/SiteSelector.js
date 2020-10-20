/* client/src/components/partials/SiteSelector.js */

import React from "react";

const SITES = {
  "BANK": ["B Lockers/B CCTV Room", "2F Executive Lounge/2F CEO Office", "1F Teller's Office/1F Archives", "1F Staff Room/1F Open Area"]
};
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
