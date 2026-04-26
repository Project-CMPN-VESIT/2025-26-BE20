import { Line } from "react-chartjs-2";
import { getLightModePrimary } from "../../../utils/ColorTheme";

const LineChart = ({ lineData, lineLoading, lineError }) => {
  const lightPrimary = getLightModePrimary();
  const MONTH_MAP = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
  };
  const labels = lineData?.map(item => MONTH_MAP[item.month]) || [];
  const values = lineData?.map(item => item.opens_count) || [];
  const data = {
    labels,
    datasets: [
      {
        label: "Opens",
        data: values,
        borderColor: lightPrimary,
        fill: false,
        backgroundColor: lightPrimary,
        pointBackgroundColor: lightPrimary,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks:{
          precision:0,
          maxTicksLimit:5,
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },

  };

  if (lineLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-white border">
        Loading chart...
      </div>
    );
  }

  if (lineError) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-white border text-red-500">
        Failed to load data
      </div>
    );
  }


  return (
    <div className=' w-full overflow-hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-200 rounded-3xl border-b border-t border-gray-200 shadow-lg'>
      <div className="w-full text-gray-600 text-m md:text-lg font-medium px-5 py-6 border-b border-gray-200">
        <span><i class="ri-line-chart-line bg-primary text-white p-2 rounded-lg opacity-90 mr-2"></i> Campaigns performance over past Months</span>
      </div>
      <div className="h-[300px] sm:h-[400px] lg:h-[500px] px-6 py-6">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
