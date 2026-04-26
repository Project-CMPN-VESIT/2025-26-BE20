import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getLightModePrimary, getLightModeSecondary } from '../../../utils/ColorTheme';
import CountCard from './CountCard';
import StatBox from './StatBox';

const BarChart = ({ monthwiseSubsData, monthwiseSubsDataLoading, monthwiseSubsDataError, moreSubsData, moreSubsDataLoading, moreSubsDataError }) => {
  const lightPrimary = getLightModePrimary();
  const lightSecondary = getLightModeSecondary();

  const labels = Array.isArray(monthwiseSubsData)
    ? monthwiseSubsData.map(item => item.month)
    : [];

  const subscribersData = Array.isArray(monthwiseSubsData)
    ? monthwiseSubsData.map(item => item.subscribers)
    : [];

  const unsubscribersData = Array.isArray(monthwiseSubsData)
    ? monthwiseSubsData.map(item => item.unsubscribers)
    : [];

  const data = {
    labels,
    datasets: [
      {
        label: "Subscribers",
        data: subscribersData,
        backgroundColor: lightPrimary,
        barPercentage: 0.8,
        borderRadius: 6,
      },
      {
        label: "Unsubscribers",
        data: unsubscribersData,
        backgroundColor: "#dbc9b8",
        barPercentage: 0.8,
        borderRadius: 6,
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        ticks: {
          precision: 0,
          maxTicksLimit: 5,
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

    if (moreSubsDataLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-white border">
        Loading chart...
      </div>
    );
  }

  if (moreSubsDataError) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-white border text-red-500">
        Failed to load data
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 gap-5">

      {/* LEFT: BAR CHART */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 rounded-3xl border-b border-t border-gray-200 shadow-lg">
        <div className="w-full text-gray-600 text-m md:text-lg font-medium px-5 py-6 border-b border-gray-200">
          <span><i class="ri-user-3-line bg-primary text-white p-2 rounded-lg opacity-90 mr-2"></i> Number of Subscribers & Unsubscribers</span>
        </div>


        <div className="h-[300px] sm:h-[400px] lg:h-[500px] px-6 py-6">
          {monthwiseSubsDataLoading && (
            <p className="text-center text-gray-500">Loading chart…</p>
          )}

          {monthwiseSubsDataError && (
            <p className="text-center text-red-500">
              Failed to load subscriber data
            </p>
          )}

          {!monthwiseSubsDataLoading && !monthwiseSubsDataError && (
            <Bar data={data} options={options} />
          )}
        </div>
      </div>

      {/* RIGHT: SUBSCRIBER INFO */}
      <div className="bg-white dark:bg-gray-900 flex flex-col h-full border border-gray-200 rounded-3xl border-b border-t border-gray-200 shadow-lg">

        <div className="w-full text-gray-600 text-m md:text-lg font-medium px-5 py-6 border-b border-gray-200">
          <span><i class="ri-information-line bg-primary text-white p-2 rounded-lg opacity-90 mr-2"></i>More information about Subscribers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 flex-1">
          {/* TOTAL */}
          <div className="sm:col-span-2">
            <CountCard
              title="Total active subscribers"
              count={moreSubsData?.total_active_subscribers ?? 0}
              className="h-full flex flex-col justify-center rounded-xl"
            />
          </div>

          <CountCard title="New subscribers today" count={moreSubsData?.new_subscribers_today ?? 0} className='rounded-xl' />
          <CountCard title="New subscribers this month" count={moreSubsData?.new_subscribers_this_month ?? 0} className='rounded-xl' />
          <CountCard title="New (Last 30 days)" count={moreSubsData?.new_subscribers_in_last_30_days ?? 0} className='rounded-xl'/>
          <CountCard title="Unsubscribed (Last 30 days)" count={moreSubsData?.unsubscribes_in_last_30_days ?? 0} className='rounded-xl'/>
        </div>
      </div>

    </div>
  );
};
export default BarChart;
