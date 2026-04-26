const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <div className="h-5 w-5 border-2 border-primary-900 border-t-transparent rounded-full animate-spin" />
      <span className="text-sm font-medium text-gray-500 animate-pulse">
        {text}
      </span>
    </div>
  );
};

export default Loader;
