import React from 'react';
import { NavLink } from 'react-router-dom';

const defaultActive = "!text-primary ";
const defaultInactive = "!text-gray-900 !dark:text-white hover:!text-primary";

const NavItem = ({to, page, dataTestId, activeClass = '', className = '', end, label}) => {

  const getStatus = ({ isActive }) => {
    const finalClass = isActive
      ? `${defaultActive} ${activeClass}` 
      : defaultInactive;

    return  `flex items-center p-2 rounded-lg transition-all duration-300 ease-in ${finalClass} ${className}`.trim(); 
  };

  return (
    <NavLink
      to={to}
      end={end}
      data-test-id={dataTestId}
      className={getStatus}
    >
      {label ? (
        <span className="whitespace-nowrap">{label}</span>
      ) : (
        page
      )}
    </NavLink>
  );
};

export default NavItem;
