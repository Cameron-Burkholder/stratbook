/* client/src/components/partials/SiteSelector.js */

import React from "react";

const SITES = {
  "BANK": ["B Lockers/B CCTV Room", "1F Teller's Office/1F Archives", "1F Staff Room/1F Open Area", "2F Executive Lounge/2F CEO Office"],
  "BORDER": ["1F Customs Inspection/1F Supply Room", "1F Ventilation Room/1F Workshop", "1F Bathroom/1F Tellers", "2F Armory Lockers/2F Archives"],
  "CHALET": ["B Wine Cellar/B Snowmobile Garage", "1F Bar/1F Gaming Room", "1F Dining Room/1F Kitchen", "2F Master Bedroom/2F Office"],
  "CLUBHOUSE": ["B Church/B Armory", "1F Bar/1F Stock Room", "2F Cash Room/2F CCTV", "2F Gym/2F Master Bedroom"],
  "COASTLINE": ["1F Kitchen/1F Service Entrace", "1F Sunrise Bar/1F Blue Bar", "2F Hookah Lounge/2F Billiards Room", "2F Penthouse/2F Theater"],
  "CONSULATE": ["B Garage/B Cafeteria", "B Archives/1F Tellers", "1F Lobby/1F Press Room", "2F Consul Office/2F Meeting Room"],
  "KAFE DOSTOYEVSKY": ["1F Kitchen Cooking/1F Kitchen Service", "2F Fireplace Hall/2F Mining Room", "2F Fireplace Hall/2F Reading Room", "3F Cocktail Bar/3F Bar"],
  "KANAL": ["B Supply Room/B Kayaks", "1F Coast Guard Meeting Room/1F Lounge", "1F Security Room/1F Maps Room", "2F Radar Room/2F Server Room"],
  "OREGON": ["B Laundry/B Supply Room", "1F Kitchen/1F Dining Room", "1F Kitchen/1F Meeting Room", "2F Kid's Dorm/2F Dorms Main Hall"],
  "OUTBACK": ["1F Compressor Room/1F Gear Store", "1F Nature Room/1F Bushranger Room", "2F Office/2F Party Room", "2F Laundry Room/2F Games Room"],
  "THEME PARK": ["1F Armory Room/1F Throne Room", "1F Lab/1F Storage", "2F Office/2F Initiation Room", "2F Bunk/2F Day Care"],
  "VILLA": ["1F Living Room/1F Library", "1F Kitchen/1F Dining Room", "2F Trophy Room/2F Statuary Room", "2F Aviator Room/2F Games Room"]
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
