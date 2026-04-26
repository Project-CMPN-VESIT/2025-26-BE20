import React, { useState } from "react";

const SingleFaq = ({ question, answer }) => {
  const [isViewingAnswer, setIsViewingAnswer] = useState(false);

  return (
    <div
      className={` mx-auto ${
        isViewingAnswer
          ? "bg-white dark:bg-custom-green-300 border-primary"
          : "bg-transparent border-primary/50"
      } my-4 border rounded-lg border-primary/50 hover:border-primary hover:bg-white dark:hover:bg-custom-green-300`}
    >
      <div
        className="flex justify-between p-4 py-4 text-xl lg:text-2xl cursor-pointer items-center gap-4"
        onClick={() => setIsViewingAnswer(!isViewingAnswer)}
      >
        <p className="transition-effect font-bold">{question}</p>
        <i
          className={`ri-${
            isViewingAnswer ? "arrow-up-s-line" : "arrow-down-s-line"
          } text-primary ri-xl`}
        ></i>
      </div>

      {isViewingAnswer && (
        <p className="transition-effect overflow-hidden text-lg md:w-4/5 px-4 pb-4">
          {answer}
        </p>
      )}
    </div>
  );
};

export default SingleFaq;
