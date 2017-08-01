import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import GroupRow from "./GroupRow";
import Messages from "../common/Messages";
const GroupList = ({ groups, deleteGroup, loading, errors, getGroup }) => {
  const emptyMessage = <p>There are no groups in your collection </p>;
  const groupsList = (
    <div className="">
      <table>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>
              <NavLink
                exact
                className="btn btn-green"
                activeClassName="active"
                to="/group/add"
              >
                Add
              </NavLink>
            </th>
          </tr>
        </thead>
        <tbody>
          {groups && groups.length > 0
            ? groups.map(group =>
                <GroupRow
                  group={group}
                  key={group._id}
                  deleteGroup={deleteGroup}
                  getGroup={getGroup}
                />
              )
            : <tr>
                <td colSpan="7">
                  {emptyMessage}
                </td>
              </tr>}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {!!errors && errors.length > 0
        ? <Messages messages={errors} key={errors} type="error" />
        : groupsList}
    </div>
  );
};

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
  deleteGroup: PropTypes.func.isRequired
};

export default GroupList;
