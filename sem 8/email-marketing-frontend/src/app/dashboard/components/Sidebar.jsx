import React, { useState } from "react";
import logo from "../../../assets/light-logo.png";
import { Link } from "react-router-dom";
import NavItem from "../../subscribers/components/NavItem";
import { useAuth } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";

const SideBar = ({ setDarkOverlay, sidebarOpen, setSidebarOpen }) => {

  const activeClass =
    "bg-primary/10 border-l-4 border-primary !text-primary";
  const inactive =
    "flex items-center p-2 rounded-lg group transition-all duration-300 ease-out";

  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  const isAccountSettingsActive =
  pathname.startsWith("/account") ||
  pathname.startsWith("/configuration");

  if (loading) return null;

  return (
    <>
      {/* Top bar for mobile */}
      <div className="flex items-center justify-between h-14 bg-gray-50 dark:bg-gray-800">
        <button
          type="button"
          onClick={() => {
            setDarkOverlay(true);
            setSidebarOpen(!sidebarOpen)
          }}
          className="md:hidden inline-flex items-center justify-center p-2 w-13 h-14 bg-gray-50 text-sm text-gray-500 mr-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          data-test-id="sidebar-toggle"
        >
          <span className="sr-only">Open main menu</span>
          <i className="ri-menu-line text-xl" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 sm:w-64 w-45 h-screen transition-transform bg-gray-50 dark:bg-gray-800 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto relative">
          {/* Close button (mobile) */}
          <div className="md:hidden absolute top-2 right-3">
            <button
              onClick={() => {
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}
              className="inline-flex justify-center items-center w-7 h-7 hover:bg-gray-200 hover:text-gray-900 rounded-lg dark:hover:bg-gray-600 dark:hover:text-white"
              data-test-id="sidebar-close"
            >
              <i className="ri-close-line text-2xl" />
              <span className="sr-only">Close sidebar</span>
            </button>
          </div>

          {/* Logo */}
          <img
            src={logo}
            alt="mailed-it logo"
            data-test-id="sidebar-logo"
            className="sm:h-12 h-8 sm:mb-10 mb-8 sm:pl-8 pl-5 sm:mt-8 mt-5"
          />

          {/* Navigation */}
          <ul className="space-y-5 font-semibold text-lg">
            <li
            onClick={()=>{
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}>
              <NavItem
                to="/dashboard"
                className={inactive}
                activeClass={activeClass}
                page={
                  <>
                    <i className="ri-pie-chart-fill text-xl mr-3" />
                    <span>Dashboard</span>
                  </>
                }
              />
            </li>

            <li
            onClick={()=>{
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}>
              <NavItem
                to="/campaigns"
                className={inactive}
                activeClass={activeClass}
                page={
                  <>
                    <i className="ri-mail-line text-xl mr-3" />
                    <span>Campaigns</span>
                  </>
                }
              />
            </li>

            <li
            onClick={()=>{
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}>
              <NavItem
                to="/subscribers"
                className={inactive}
                activeClass={activeClass}
                page={
                  <>
                    <i className="ri-user-line text-xl mr-3" />
                    <span>Subscribers</span>
                  </>
                }
              />
            </li>

            <li
            onClick={()=>{  
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}>
              <NavItem
                to="/segment"
                className={inactive}
                activeClass={activeClass}
                page={
                  <>
                    <i className="ri-team-line text-xl mr-3" />
                    <span>Segments</span>
                  </>
                }
              />
            </li>

            {/* <li
            onClick={()=>{
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}>
              <NavItem
                to="/forms"
                className={inactive}
                activeClass={activeClass}
                page={
                  <>
                    <i className="ri-file-line text-xl mr-3" />
                    <span>Forms</span>
                  </>
                }
              />
            </li>

            <li
            onClick={()=>{
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}>
              <NavItem
                to="/automation"
                className={inactive}
                activeClass={activeClass}
                page={
                  <>
                    <i className="ri-refresh-line text-xl mr-3" />
                    <span>Automation</span>
                  </>
                }
              />
            </li> */}

            <li
            onClick={() => {
              setDarkOverlay(false);
              setSidebarOpen(false);
            }}
          >
            <NavItem
              to="/account/profile"
              className={`${inactive} ${
                isAccountSettingsActive ? activeClass : ""
              }`}
              page={
                <>
                  <i className="ri-settings-3-line text-xl mr-3" />
                  <span>Account Settings</span>
                </>
              }
            />
          </li>


            {/* <li
            onClick={()=>{
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}>
              <NavItem
                to="/integrations"
                className={inactive}
                activeClass={activeClass}
                page={
                  <>
                    <i className="ri-link-m text-xl mr-3" />
                    <span>Integrations</span>
                  </>
                }
              />
            </li> */}

            {/* <li
            onClick={()=>{
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}>
              <NavItem
                to="/files"
                className={inactive}
                activeClass={activeClass}
                page={
                  <>
                    <i className="ri-folder-2-line text-xl mr-3" />
                    <span>File Manager</span>
                  </>
                }
              />
            </li> */}

            <li
            onClick={()=>{  
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}>
              <NavItem
                to="/templates"
                className={inactive}
                activeClass={activeClass}
                page={
                  <>
                    <i className="ri-image-2-line text-xl mr-3" />
                    <span>My Templates</span>
                  </>
                }
              />
            </li>

            <li
            onClick={()=>{  
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}>
              <NavItem
                to="/domains"
                className={inactive}
                activeClass={activeClass}
                page={
                  <>
                    <i className="ri-global-line text-xl mr-3" />
                    <span>Domain</span>
                  </>
                }
              />
            </li>

            {user?.role === "workspace_admin" && (
              <li
              onClick={()=>{
                setDarkOverlay(false);
                setSidebarOpen(false)
              }}
              >
                <NavItem
                  to="/team"
                  className={inactive}
                  activeClass={activeClass}
                  page={
                    <>
                      <i className="ri-user-community-line text-xl mr-3" />
                      <span>Team Management</span>
                    </>
                  }
                />
              </li>
              
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
