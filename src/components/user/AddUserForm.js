import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Messages from "../common/Messages";

import "react-datepicker/dist/react-datepicker.css";
import "react-select/dist/react-select.css";

import "./add-user-form.css";

const AddUserForm = ({
  form,
  groupOptions,
  handleGroupChange,
  handleSubmit,
  handleChange,
  handleDateChange,
  handleAvatarChange,
  errors
}) => {
  const formBody = (
    <div>
      <div className="row">
        <input
          type="text"
          id="username"
          name="username"
          className={classnames("input", { error: !!form.errors.username })}
          value={form.username}
          onChange={handleChange}
          placeholder="Use Name"
        />

        <input
          type="text"
          id="email"
          name="email"
          value={form.email}
          className={classnames("input", { error: !!form.errors.email })}
          onChange={handleChange}
          placeholder="EmailAddress"
        />
      </div>
      <div className={classnames("row", { error: !!form.errors.title })}>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={form.firstName}
          className={classnames("input", {
            error: !!form.errors.firstName
          })}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={form.lastName}
          className={classnames("input", { error: !!form.errors.lastName })}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>
      <div className={classnames("row", { error: !!form.errors.dob })}>
        <label>DOB</label>
        <DatePicker selected={form.dob} onChange={handleDateChange} />
        <label>Groups</label>

        <Select
          multi
          simpleValue
          value={form.groups}
          placeholder="Select user groups"
          options={groupOptions}
          onChange={handleGroupChange}
          className={classnames("input", {
            error: !!form.errors.groups
          })}
        />
      </div>
      <div className={classnames("row", { error: !!form.errors.avatar })}>
        {form.avatar !== "" && <img src={form.avatar} alt="Avatar" />}
        <input
          type="text"
          id="avatar"
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
          placeholder="Cover URL"
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
        <div className="form-title">Add User!</div>

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

AddUserForm.prototype = {
  groupOptions: PropTypes.array.isRequired
};
export default AddUserForm;
