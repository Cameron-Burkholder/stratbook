/* client/components/partials/UpdatePlatformForm.js */

import React from "react";

import Loading from "./Loading.js"

/*
  @func: UpdatePlatformForm
  @desc: render update platform form for user to interact with
  @prop onChange: function
  @prop platform: String
  @prop errors: Object
  @prop loading: Boolean
*/
const UpdatePlatformForm = (props) => {
  return (
    <form className="form" id="update-platform-form" onSubmit={props.onSubmit}>
      <p className="form-heading">Update Platform</p>
      <fieldset className="form-fieldset" id="platform-field">
        <label className="form-label">Platform</label>
        <select onChange={props.onChange} className={"form-input" + (props.errors && props.errors.platform == null ? "" : " input-error")} value={props.platform} id="platform" required>
          <option>XBOX</option>
          <option>PC</option>
          <option>PS4</option>
        </select>
        <span className="form-error">{(props.errors ? props.errors.platform : "")}</span>
      </fieldset>
    </form>
  )
}

export default UpdatePlatformForm;
