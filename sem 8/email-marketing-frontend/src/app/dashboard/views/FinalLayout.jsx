import Dashboard from './Dashboard'
import SideBar from '../components/Sidebar'
import TopBar from '../components/Topbar'

const FinalLayout = () => {
  return (
    <div className="flex flex-1 w-full bg-gray-100 dark:bg-gray-800">
      <div className="flex items-start md:flex-row w-full">
        <div className="w-7 md:w-63">
          <SideBar />
        </div>
        <div className="flex flex-col flex-1 overflow-auto">
          <TopBar />
          <div className="mx-4 md:mx-6 pr-5 sm:pr-0">
              <Dashboard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalLayout