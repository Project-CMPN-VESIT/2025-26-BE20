import { Outlet } from 'react-router-dom'
import SideBar from '../app/dashboard/components/Sidebar'
import TopBar from '../app/dashboard/components/Topbar'
import { useEffect, useState } from 'react';

const SidebarTopbarLayout = () => {
  const [darkOverlay, setDarkOverlay] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
  document.body.style.overflow = darkOverlay ? "hidden" : "auto";
}, [darkOverlay]);


  return (
    <div className="flex flex-1 min-h-screen w-full bg-gray-100 dark:bg-gray-800">
      <div className="flex items-start md:flex-row w-full">
        <div className="w-7 md:w-63">
          <SideBar setDarkOverlay={setDarkOverlay} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        </div>
        {darkOverlay && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => {
              setDarkOverlay(false)
              setSidebarOpen(false)
            }}
          />
        )}
        <div className="flex flex-col flex-1 overflow-auto">
          <TopBar />
          <div className="mx-4 md:mx-6 pr-5 md:pr-0">
              <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarTopbarLayout