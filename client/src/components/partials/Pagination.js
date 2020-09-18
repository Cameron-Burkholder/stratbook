/* client/components/partials/Pagination.js */

import React from "react";

/*
  @func: Pagination
  @desc: allow a user to page through content
*/
const Pagination = (props) => {
  return (
    <div className="pagination">
      <button className="pagination-button" onClick={props.decrement}> &lt; </button>
      <p className="pagination-title">{props.title} {props.index + 1}</p>
      <button className="pagination-button" onClick={props.increment}> &gt; </button>
    </div>
  )
}

export default Pagination;
