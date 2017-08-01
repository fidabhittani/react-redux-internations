import React from "react";
import PropTypes from "prop-types";
import UserRow from "./UserRow";
import Messages from "../common/Messages";
import { NavLink } from "react-router-dom";

const UserList = ({
  users,
  deleteUser,
  getUser,
  loading,
  errors,
  filterList
}) => {
  const emptyMessage = <p>There are no users in yur collection </p>;
  const usersList = (
    <div className="">
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>DOB</th>
            <th>
              <NavLink
                exact
                className="btn btn-green"
                activeClassName="active"
                to="/user/add"
              >
                Add
              </NavLink>
            </th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0
            ? users.map(user =>
                <UserRow
                  user={user}
                  key={user._id}
                  deleteUser={deleteUser}
                  getUser={getUser}
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
        : usersList}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array,
  deleteUser: PropTypes.func.isRequired
};

export default UserList;
