import { Line } from "react-chartjs-2";
import { getLightModePrimary, getLightModeSecondary } from '../../../utils/ColorTheme';
import CountCard from "./CountCard";

const EmailCard = ({ campaignsData, campaignsDataLoading, campaignsDataError }) => {
  const lightPrimary = getLightModePrimary();
  const lightSecondary = getLightModeSecondary();
  const labels =
    campaignsData?.opens_vs_clicks?.map(item => item.date) ?? [];

  const opens =
    campaignsData?.opens_vs_clicks?.map(item => item.opens) ?? [];

  const clicks =
    campaignsData?.opens_vs_clicks?.map(item => item.clicks) ?? [];


  const chartData = {
    labels,
    datasets: [
      {
        label: "Opens",
        data: opens,
        borderColor: "#56A241",
        backgroundColor: "#56A241",
        pointBackgroundColor: "#56A241",
        tension: 0.4,
      },
      {
        label: "Clicks",
        data: clicks,
        borderColor: lightPrimary,
        backgroundColor: lightPrimary,
        pointBackgroundColor: lightPrimary,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#333",
        borderColor: "#eee",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
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
    },
  };

  if (campaignsDataLoading) {
    return (
      <div className="bg-white border border-gray-200 p-6">
        Loading campaigns data…
      </div>
    );
  }

  if (campaignsDataError) {
    return (
      <div className="bg-white border border-red-200 p-6 text-red-500">
        Failed to load campaigns data
      </div>
    );
  }


  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 rounded-3xl border-b border-t border-gray-200 shadow-lg">
      {/* Header */}

      <div className="w-full text-gray-600 text-m md:text-lg font-medium px-5 py-6 border-b border-gray-200">
        <span><i class="ri-mail-line bg-primary text-white p-2 rounded-lg opacity-90 mr-2"></i> Campaigns Performance Overview</span>
      </div>

      {/* Metrics */}
      <div
        data-test-id="email-cards"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-5 mt-6 mb-6"
      >
        <CountCard title="Emails sent" count={campaignsData?.emails_sent ?? 0} className="h-full rounded-xl" />
        <CountCard title="Opens" count={campaignsData?.opens ?? 0} className="h-full rounded-xl" />
        <CountCard title="Clicks" count={campaignsData?.clicks ?? 0} className="h-full rounded-xl" />
        <CountCard title="CTOR" count={`${(campaignsData?.ctor ?? 0).toFixed(2)}%`} className="h-full rounded-xl" />
      </div>

      {/* Chart */}
      <div
        data-test-id="email-line-chart"
        className="px-5 pb-6 h-[200px] sm:h-[220px] lg:h-[240px]"
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default EmailCard;
