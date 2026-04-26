import React from "react";

const SingleTemplate = ({ image, index }) => {
  return (
    <a href="#" className="group relative block group-hover:cursor-pointer">
      <div>
        <img
          src={image}
          alt="Template"
          className={`w-80 inline-block group-hover:opacity-40 mb-4 ${index === 8 || index == 9 ? "" :"2xl:mr-6"} 2xl:mb-6  overflow-hidden`}
        />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-0 group-hover:opacity-100 inline-block">
          Preview Template
        </p>
      </div>
    </a>
  );
};

export default SingleTemplate;
