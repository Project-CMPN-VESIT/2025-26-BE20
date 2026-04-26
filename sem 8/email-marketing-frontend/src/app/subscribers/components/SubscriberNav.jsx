import React, { useEffect, useState } from "react";
import { useLocation,NavLink, useNavigate } from "react-router-dom";


const SubscriberNav = () => {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.startsWith("/subscribers/segment")) {
      setActiveTab("segment");
    } 
    // else if (pathname.startsWith("/subscribers/fields")) {
    //   setActiveTab("fields");
    // } else if (pathname.startsWith("/subscribers/stats")) {
    //   setActiveTab("stats");
    // } 
    else {
      setActiveTab("all");
    }
  }, [pathname]);

    const baseClass =
    "py-3 px-1 cursor-pointer transition-colors";

    const activeClass =
    "!text-black dark:!text-white border-b-2 border-primary";

    const inactiveClass =
    "text-gray-500 dark:text-gray-400";

  return (
    <div className="mb-10">

      {/* Desktop tabs */}
      <nav className="hidden md:flex justify-start border-b border-gray-400 gap-5 font-medium text-base text-gray-500 dark:text-gray-400">
        <NavLink
  to="/subscribers"
  end
  className={({ isActive }) =>
    `${baseClass} ${isActive ? activeClass : inactiveClass}`
  }
>
  All Subscribers
</NavLink>

<NavLink
  to="/subscribers/segment"
  className={({ isActive }) =>
    `${baseClass} ${isActive ? activeClass : inactiveClass}`
  }
>
  Segments
</NavLink>

{/* <NavLink
  to="/subscribers/fields"
  className={({ isActive }) =>
    `${baseClass} ${isActive ? activeClass : inactiveClass}`
  }
>
  Fields
</NavLink>

<NavLink
  to="/subscribers/stats"
  className={({ isActive }) =>
    `${baseClass} ${isActive ? activeClass : inactiveClass}`
  }
>
  Stats
</NavLink> */}

      </nav>

      {/* Mobile dropdown */}
      <div className="block md:hidden mb-4 mt-3">
        <select
          className="w-full border px-3 py-2 rounded text-sm text-gray-700 dark:text-white dark:bg-dark-secondary"
          value={activeTab}
          onChange={(e) => {
            const tab = e.target.value;
            setActiveTab(tab);
            switch (tab) {
              case "all":
                // window.location.href = "/subscribers";
                navigate("/subscribers");
                break;
              case "segment":
                // window.location.href = "/subscribers/segment";
                navigate("/subscribers/segment");
                break;
              // case "fields":
              //   // window.location.href = "/subscribers/fields";
              //   navigate("/subscribers/fields");
              //   break;
              // case "stats":
              //   // window.location.href = "/subscribers/stats";
              //   navigate("/subscribers/stats");
              //   break;
              default:
                break;
            }
          }}
        >
          <option value="all">All Subscribers</option>
          <option value="segment">Segments</option>
          {/* <option value="fields">Fields</option>
          <option value="stats">Stats</option> */}
        </select>
      </div>
    </div>
  );
};

export default SubscriberNav;
