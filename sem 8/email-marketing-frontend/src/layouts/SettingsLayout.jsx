import React, { useEffect, useState } from "react";
import { Outlet, useLocation, NavLink, useNavigate } from "react-router-dom";

const SettingsLayout = () => {
  const { pathname } = useLocation();

  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  const baseClass =
    "py-3 px-1 cursor-pointer transition-colors";

  const activeClass =
    "!text-black dark:!text-white border-b-2 border-primary";

  const inactiveClass =
    "text-gray-500 dark:text-gray-400";

  useEffect(() => {
    switch (pathname) {
      case "/account/profile":
        setActiveTab("profile");
        break;
      case "/configuration/default":
        setActiveTab("default");
        break;
      case "/configuration/domains":
        setActiveTab("domain");
        break;
    }
  }, [pathname]);

  return (
    <div className="my-10">
      <div className="mb-10">
        <h1 className="font-bold text-2xl mb-1 dark:text-white">
          Account Settings
        </h1>
        <nav className="hidden md:flex tabs justify-start border-b-1 border-gray-400 gap-5 font-medium text-base text-gray-500 dark:text-gray-400">

          <NavLink
            to="/account/profile"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass
              }`
            }
          >
            Company profile

          </NavLink>
          <NavLink
            to="/configuration/default"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass
              }`
            }
          >
            Default Settings
          </NavLink>
          {/* <NavLink
            to="/configuration/domains"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass
              }`
            }
          >
            Domains

          </NavLink> */}

        </nav>

        <div className="block md:hidden mb-4 mt-3 mx-2">
          <select
            className="w-full border px-3 py-2 rounded text-sm text-gray-700 dark:text-white dark:bg-dark-secondary"
            value={activeTab}
            onChange={(e) => {
              const tab = e.target.value;
              setActiveTab(tab);
              switch (tab) {
                case "profile":
                  navigate("/account/profile");
                  break;
                case "default":
                  navigate("/configuration/default");
                  break;
                case "domain":
                  navigate("/configuration/domains");
                  break;
                default:
                  break;
              }
            }}
          >
            <option value="profile">Company profile</option>
            <option value="default">Default Settings</option>
            <option value="domain">Domains</option>
          </select>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SettingsLayout;
