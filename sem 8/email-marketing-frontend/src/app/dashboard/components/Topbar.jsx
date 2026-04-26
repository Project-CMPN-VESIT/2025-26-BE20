import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getLightModePrimary, getLightModeSecondary } from '../../../utils/ColorTheme';
import logo from '../../../assets/light-logo.png'
import logoSm from '../../../assets/light-logo-sm.png'
import {useAuth} from '../../../context/AuthContext'
const TopBar = () => {
const lightPrimary = getLightModePrimary();
const lightSecondary = getLightModeSecondary();
const { user, org, loading, logout } = useAuth();

if (loading) {
  return null;
}

const getInitialDefaultImageUrl = (firstName = "User", lastName = "") =>
  `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=16&background=2F8481&color=fff`;


const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login",{replace:true});
}
  return (
    <div className="h-14 flex items-center justify-between ml-2 md:ml-0 px-3 bg-gray-50 dark:bg-gray-800" >
      <div className="flex items-center">
        <img  src={logo}  className="!block sm:!hidden !h-7 !h-8  !mb-8 !pl-1 !mt-8 " alt="mailed-it logo" data-test-id="mailedit-logo" />
        <div data-test-id="mail-icon" className="hidden sm:flex w-13 h-9 flex justify-center items-center rounded">
            <span className="text-white">
              <img  src={logoSm}  className="!hidden sm:!block !h-7 !h-5 !mb-8 !pl-1 !mt-8 " alt="mailed-it logo" data-test-id="mailedit-logoSm" />
            </span>
          </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-black hidden sm:block dark:text-gray-100">{org?.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 relative group cursor-pointer">
          <div data-test-id="user-details" className="text-right">
            <div className="text-sm font-semibold">{user?.first_name + ' ' + user?.last_name}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
          </div>

          {/* User Icon For All Devices */}
          <div className="w-8 h-8 flex justify-center items-center rounded bg-primary">
            <span className="text-white">
              {/* <i className="ri-user-line"></i> */}
              <img
                src={user.profile_image || getInitialDefaultImageUrl(user.first_name, user.last_name)}
                className="w-8 h-8 rounded"
                alt="Profile"
                style={{ maxWidth: "64px", maxHeight: "64px" }}
              />
            </span>
          </div>
          <i className="ri-arrow-drop-down-line ri-2x ml-[-10px]"></i>

          {/* Hover Dropdown for All Devices */}
          <div className="absolute top-full right-0 w-40 bg-white shadow-md z-50 hidden group-hover:block">
            <div
              onClick={() => navigate("/user/profile")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <i class="ri-user-line mr-2"/>
              <span>My Profile</span>
            </div>
            <div
              onClick={handleLogout}
              className="px-4 py-2 text-danger hover:bg-gray-100 cursor-pointer"
            >
              <i class="ri-shut-down-line mr-2"></i>
              <span>Logout</span>
            </div>
          </div>
        </div>

        {/* Mobile User Icon */}
        <div className="sm:hidden relative group cursor-pointer">
          <div className="w-8 h-8 flex justify-center items-center rounded bg-primary">
            <img
              src={user.profile_image || getInitialDefaultImageUrl(user.first_name, user.last_name)}
              className="w-8 h-8 rounded"
              alt="Profile"
              style={{ maxWidth: "64px", maxHeight: "64px" }}
            />
          </div>

          {/* Mobile Dropdown */}
          <div className="absolute top-full right-0 w-40 bg-white z-50 hidden group-hover:block">
            <div onClick={() => navigate("/user/profile")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <i class="ri-user-line mr-2"/>
              <span>My Profile</span>
            </div>
            <div
              onClick={handleLogout}
              className="px-4 py-2 text-danger hover:bg-gray-100 cursor-pointer"
            >
              <i class="ri-shut-down-line mr-2"></i>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
