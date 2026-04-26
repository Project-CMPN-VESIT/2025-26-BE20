import { Line } from "react-chartjs-2";
import { getLightModePrimary, getLightModeSecondary } from '../../../utils/ColorTheme';
import StatBox from "./StatBox";

const FormCard = () => {
const lightPrimary = getLightModePrimary();
const lightSecondary = getLightModeSecondary();

  const labels = ["", "", "", "", "", "", ""];
  const dataPoints = [4, 0, 4, 5, 6, 6,5];

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
        <span className=" font-semi-bold"><i className="ri-file-line "></i></span> Forms
      </div>
      <div className="flex flex-col md:flex-row text-gray-900 dark:text-gray-100 text-sm border border-gray-200">
        <StatBox
          title="All active forms"
          value="1"
          description={
            <>
              Make it easy for people to share their email with you by using{" "}
              <span className="text-primary font-medium">signup forms.</span>
            </>
          }
          showRightBorder
        />

        <StatBox
          title="Signups"
          subtitle="Last 30 days"
          value="0"
          chartData={chartData}
          chartOptions={chartOptions}
          showRightBorder
        />

        <StatBox
          title="Avg. Conversion rate"
          subtitle="Last 30 days"
          value="0%"
          chartData={chartData}
          chartOptions={chartOptions}
        />
      </div>
    </div>
  );
};

export default FormCard