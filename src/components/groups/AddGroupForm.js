import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Select from "react-select";
import Messages from "../common/Messages";

import "react-datepicker/dist/react-datepicker.css";
import "react-select/dist/react-select.css";

import "../user/add-user-form.css";

const AddGroupForm = ({
  form,
  userOptions,
  handleUserChange,
  handleSubmit,
  handleChange,
  errors
}) => {
  const formBody = (
    <div>
      <div className="row">
        <input
          type="text"
          id="name"
          name="name"
          className={classnames("input", { error: !!form.errors.name })}
          value={form.name}
          onChange={handleChange}
          placeholder="Group Name"
        />
      </div>

      <div className={classnames("row", { error: !!form.errors.image })}>
        {form.image !== "" && <img src={form.image} alt="Avatar" />}
        <input
          type="text"
          id="image"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
      </div>
      <div className={classnames("row", { error: !!form.errors.image })}>
        <Select
          multi
          simpleValue
          value={form.users}
          placeholder="Select Users"
          options={userOptions}
          onChange={handleUserChange}
          className={classnames("input", {
            error: !!form.errors.users
          })}
        />
      </div>
    </div>
  );

  const formFooter = (
    <div className="form-footer">
      <button className="btn-green btn">Save</button>
    </div>
  );
  return (
    <div className="card-form">
      <form
        className={classnames("ui form", { loading: !!form.loading })}
        onSubmit={handleSubmit}
      >
        <div className="form-title">Add Group!</div>

        <div className="form-body">
          {!!errors &&
            errors.length > 0 &&
            <Messages messages={errors} key={errors} type="error" />}
          {formBody}
          {formFooter}
        </div>
      </form>
    </div>
  );
};

AddGroupForm.prototype = {
  userOptions: PropTypes.array.isRequired
};
export default AddGroupForm;
