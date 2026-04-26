import { Line } from "react-chartjs-2";
import { getLightModePrimary, getLightModeSecondary } from '../../../utils/ColorTheme';
import StatBox from "./StatBox";

const SiteCard = () => {
const lightPrimary = getLightModePrimary();
const lightSecondary = getLightModeSecondary();
  const labels = ["", "", "", "", "", "", ""];
  const dataPoints = [4, 0, 6, 6, 7, 8, 10];

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        borderColor: lightPrimary,
        backgroundColor: lightPrimary,
        pointBackgroundColor: lightPrimary,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: 
      { 
        display: false 
    },
      tooltip: 
      {
         mode: "index", 
         intersect: false 
        },
    },
    scales: {
      x: {
         grid: 
         { 
            display: false 
        } 
    },
      y: 
      { 
        grid: 
        { 
            display: false 
        },  
    },
    },
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-200">
      <div className="w-full text-gray-600 font-bold text-m md:text-l px-5 py-3 bg-gray-100 border-b border-t border-gray-300">
        <span className=" font-semi-bold"><i className="ri-pages-line"></i></span> Sites
      </div>
      <div className="flex flex-col md:flex-row text-gray-900 dark:text-gray-100 text-sm border border-gray-200">
        <StatBox
          title="All published Sites"
          value="3"
          description={
            <>
              Start building your professional{" "}
              <span className="text-primary font-medium">Emails</span>
            </>
          }
          showRightBorder
        />
        <StatBox
          title="Signups"
          subtitle="Last 30 days"
          value="50"
          chartData={chartData}
          chartOptions={chartOptions}
          showRightBorder
        />
        <StatBox
          title="Avg Conversion Rate"
          subtitle="Last 30 days"
          value="70%"
          chartData={chartData}
          chartOptions={chartOptions}
        />
      </div>
    </div>
  );
};

export default SiteCard