import React from "react";
import { Line } from "react-chartjs-2";

const StatBox = ({
  title,
  subtitle,
  value,
  description,
  chartData,
  chartOptions,
  showRightBorder = false,
}) => {
  return (
    <div
      className={`w-full p-10 flex flex-col justify-center ${
        showRightBorder ? "md:border-r border-gray-200" : ""
      } min-h-[180px]`}
    >
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>

      {subtitle && (
        <p className="text-xs text-gray-400 mb-1">{subtitle}</p>
      )}

      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        {value}
      </div>

      {description && (
        <p className="text-sm text-gray-600 mt-1 overflow-hidden max-h-[40px]">
          {description}
        </p>
      )}

      {chartData && (
        <div className="w-full h-[60px] mt-2">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default StatBox;
