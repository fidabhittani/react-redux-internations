import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "../../config/App";
import moment from "moment";
import { NavLink } from "react-router-dom";
import ActionBar from "../common/ActionBar";

const UserDetailList = ({ user, groups, assignGroup }) => {
  let isUserGroup = (users, user) => {
    function findUser(userIn) {
      return userIn._id === user._id;
    }

    return !!users.find(findUser);
  };

  const actions = [
    {
      text: "Assign",
      handleClick: params => assignGroup(params),
      className: "btn-blue"
    }
  ];
  const actions2 = [
    {
      text: "Unassign",
      handleClick: params => assignGroup(params),
      className: "btn-green"
    }
  ];

  return (
    <div className="info-card">
      <div className="info-card-title">User Info!</div>
      <table>
        <tbody>
          <tr>
            <th>Username :</th>
            <td>
              <img
                src={user.avatar || Avatar}
                width="40"
                className="avatar"
                alt=""
              />
              &nbsp;&nbsp;&nbsp;
              {user.username}
            </td>
          </tr>
          <tr>
            <th>Email :</th>
            <td>
              {user.email}
            </td>
          </tr>
          <tr>
            <th>First Name :</th>
            <td>
              {user.firstName}
            </td>
          </tr>
          <tr>
            <th>Last Name :</th>
            <td>
              {user.lastName}
            </td>
          </tr>
          <tr>
            <th>DOB :</th>
            <td>
              {moment(user.dob).format("dddd, MMMM Do YYYY")}
            </td>
          </tr>
          <tr>
            <th>Groups :</th>
            <td>
              {user.groups &&
                user.groups.map(group => {
                  return (
                    <div>
                      <NavLink to={"/group/details/" + group._id}>
                        {group.name}
                      </NavLink>

                      <ActionBar
                        actions={actions2}
                        params={{
                          userId: user._id,
                          groupId: group._id,
                          assign: false
                        }}
                      />
                    </div>
                  );
                })}
            </td>
          </tr>
          <tr>
            <th>Unassigned :</th>
            <td>
              {groups &&
                groups.length > 0 &&
                groups.map(group => {
                  return (
                    <div>
                      {!isUserGroup(group.users, user) &&
                        <span>
                          {group.name}
                        </span>}

                      {!isUserGroup(group.users, user) &&
                        <ActionBar
                          actions={actions}
                          params={{
                            userId: user._id,
                            groupId: group._id,
                            assign: true
                          }}
                        />}
                    </div>
                  );
                })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

UserDetailList.prototype = {
  user: PropTypes.object.isRequired
};
export default UserDetailList;
