import React from "react";
import PropTypes from "prop-types";
import ActionBar from "../common/ActionBar";
import { Avatar } from "../../config/App";
import { isError } from "../../actions/App";
import moment from "moment";
const UserRow = ({ user, deleteUser, getUser }) => {
  const actions = [
    {
      text: "Delete",
      handleClick: params =>
        deleteUser(params.id).then(
          () => {
            console.log("successfully deleted");
          },
          err => {
            err.response.json().then(({ errors }) => {
              if (errors && !!errors.global) {
                err.dispatch(isError([errors.global]));
              }
            });
          }
        ),
      className: "btn-red"
    },
    {
      text: "Details",
      route: "/user/details",
      className: "btn-blue"
    }
  ];

  return (
    <tr>
      <td>
        <img src={user.avatar || Avatar} width="40" className="avatar" alt="" />
      </td>
      <td>
        {user.firstName}
      </td>
      <td>
        {user.lastName}
      </td>
      <td>
        {user.username}
      </td>
      <td>
        {user.email}
      </td>
      <td>
        {moment(user.dob).format("dddd, MMMM Do YYYY")}
      </td>
      <td className="text-right">
        <ActionBar actions={actions} params={{ id: user._id }} key={user._id} />
      </td>
    </tr>
  );
};

UserRow.prototype = {
  user: PropTypes.object.isRequired
};
export default UserRow;
