const CountCard = ({ title, count, className = '' }) => {
  return (
    <div
      data-test-id="Count-card"
      className={`
        bg-white
        border border-gray-200
        text-center
        flex flex-col justify-center items-center
        min-h-[120px]
        ${className}
      `}
    >
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      <p data-test-id="count" className="text-2xl font-bold mt-2">
        {count}
      </p>
    </div>
  );
};

export default CountCard;
