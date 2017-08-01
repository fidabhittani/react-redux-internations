import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
const ActionBar = ({ actions, params = {} }) => {
  return (
    <div className={`action-bar`}>
      {actions.map(action => {
        let aClasses = `btn ${action.className}`;
        let route = params ? `${action.route}/${params.id}` : `${action.route}`;
        if (action.route) {
          return (
            <NavLink
              exact
              className={aClasses}
              activeClassName="active"
              to={route}
            >
              {action.text}
            </NavLink>
          );
        }

        return (
          <a
            className={aClasses}
            onClick={() => action.handleClick(params)}
            title={action.title}
          >
            {action.text}
          </a>
        );
      })}
    </div>
  );
};
ActionBar.prototype = {
  actions: PropTypes.array.isRequired
};
export default ActionBar;
