import React from "react";

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-3">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 w-full bg-gray-100 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
