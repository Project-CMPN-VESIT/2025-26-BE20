import React from "react";

const Table = ({ columns, data, dataTestId = "" }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="border-b text-primary border-gray-200">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-3 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4"
                  data-test-id={`${dataTestId}-${col.key}-${rowIndex}`}
                >
                  {col.render
                    ? col.render(row, rowIndex)
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
