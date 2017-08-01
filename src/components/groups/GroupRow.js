import React from "react";
import PropTypes from "prop-types";
import ActionBar from "../common/ActionBar";
import { GroupAvatar } from "../../config/App";
import { isError } from "../../actions/App";

const GroupRow = ({ group, deleteGroup, getGroup }) => {
  const actions = [
    {
      text: "Delete",
      handleClick: params => {
        if (!params.canDelete) {
          this.canDelete = false;
          alert("Cannot delete a group assigned to users");
          return;
        }

        deleteGroup(params.id).then(
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
        );
      },
      className: "btn-red"
    },
    {
      text: "Details",
      route: "/group/details",
      className: "btn-blue"
    }
  ];

  return (
    <tr>
      <td>
        <img
          src={group.image || GroupAvatar}
          width="40"
          className="avatar"
          alt=""
        />
        &nbsp;&nbsp;
        {group.name}
      </td>
      <td className="text-right">
        <ActionBar
          actions={actions}
          params={{ id: group._id, canDelete: !group.users.length }}
          key={group._id}
        />
      </td>
    </tr>
  );
};

GroupRow.prototype = {
  group: PropTypes.object.isRequired
};
export default GroupRow;
