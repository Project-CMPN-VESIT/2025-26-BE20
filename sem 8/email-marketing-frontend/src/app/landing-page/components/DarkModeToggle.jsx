import React from "react";

const DarkModeToggle = ({ darkMode, onDarkModeChange }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        className={`flex items-center p-1 bg-primary cursor-pointer w-15 h-8 md:w-19 md:h-10 toggle-button rounded-full relative
        }`}
        onClick={() => onDarkModeChange() }
      >
        <div
          className={`flex w-6 h-6 md:w-8 md:h-8 rounded-full toggle-circle absolute ${
            darkMode
              ? "move-left bg-gray-800 text-white hover:bg-white hover:text-gray-800"
              : "move-right md:md-move-right bg-yellow-50 text-yellow-500 hover:bg-yellow-500 hover:text-yellow-50"
          } items-center justify-center transition-effect`}
        > 
          <i
            className={`${
              darkMode ? "ri-moon-clear-fill" : "ri-sun-line"
            } my-auto ri-md md:ri-md text-center`}
          ></i>
        </div>
      </button>
    </div>
  );
};

export default DarkModeToggle;
