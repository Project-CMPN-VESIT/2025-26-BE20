import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const AddSubscriberNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="my-6">
      {/* Desktop tabs */}
      <nav className="hidden md:flex border-b border-gray-400 gap-6 font-medium text-base text-gray-500 dark:text-gray-400">
        <NavLink
          to="/subscribers/add"
          end
          className={({ isActive }) =>
            `py-3 px-1 cursor-pointer transition-colors ${
              isActive ? "!text-black dark:!text-white border-primary border-b-2 " : ""
            }`
          }
        >
          Import from CSV
        </NavLink>

        <NavLink
          to="/subscribers/addSingleSubscriber"
          className={({ isActive }) =>
            `py-3 px-1 cursor-pointer transition-colors ${
              isActive ? "!text-black dark:!text-white border-primary border-b-2 " : ""
            }`
          }
        >
          Add Single Subscriber
        </NavLink>
      </nav>

      {/* Mobile dropdown */}
      <div className="block md:hidden mt-4">
        <select
          className="w-full border px-3 py-2 rounded text-sm text-gray-700 dark:text-white dark:bg-dark-secondary"
          value={
            pathname.startsWith("/subscribers/addSingleSubscriber")
              ? "single"
              : "csv"
          }
          onChange={(e) => {
            if (e.target.value === "csv") {
            //   window.location.href = "/subscribers/add";
                navigate("/subscribers/add");
            } else {
            //   window.location.href = "/subscribers/addSingleSubscriber";
                navigate("/subscribers/addSingleSubscriber");
            }
          }}
        >
          <option value="csv">Import from CSV</option>
          <option value="single">Add Single Subscriber</option>
        </select>
      </div>
    </div>
  );
};

export default AddSubscriberNav;
