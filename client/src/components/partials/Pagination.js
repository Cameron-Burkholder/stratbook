/* client/components/partials/Pagination.js */

import React from "react";

/*
  @func: Pagination
  @desc: allow a user to page through content
*/
const Pagination = (props) => {
  return (
    <div className="pagination">
      <button className="pagination__button" onClick={() => {
        if (props.index - 1 > 0) {
          props.onChange(props.index - 1);
        }
      }}> &lt; </button>
      <p className="pagination__title">{props.activeLabel}</p>
      <button className="pagination__button" onClick={() => {
        if (props.index + 1 < props.labels.length) {
          props.onChange(props.index + 1);
        }
      }}> &gt; </button>
    </div>
  )
}

export default Pagination;
