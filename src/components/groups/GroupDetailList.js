import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "../../config/App";
import { NavLink } from "react-router-dom";

const GroupDetailList = ({ group }) => {
  return (
    <div className="info-card">
      <div className="info-card-title">Group Info!</div>
      <table>
        <tbody>
          <tr>
            <th>Groupname :</th>
            <td>
              <img
                src={group.image || Avatar}
                width="40"
                className="avatar"
                alt=""
              />
              &nbsp;&nbsp;&nbsp;
              {group.name}
            </td>
          </tr>
          <tr>
            <th>Users :</th>
            <td>
              {group.users &&
                group.users.map(user => {
                  return (
                    <div>
                      <NavLink to={"/user/details/" + user._id}>
                        {user.firstName} {user.lastName}
                      </NavLink>
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

GroupDetailList.prototype = {
  group: PropTypes.object.isRequired
};
export default GroupDetailList;
