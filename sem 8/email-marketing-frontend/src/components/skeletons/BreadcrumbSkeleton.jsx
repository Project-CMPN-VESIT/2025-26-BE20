const BreadcrumbSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb row */}
      <div className="flex items-center gap-2 mb-2">
        {/* <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-3 bg-gray-200 rounded-full" /> */}
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-3 w-3 bg-gray-200 rounded-full" />
        <div className="h-3 w-28 bg-gray-200 rounded" />
      </div>

      {/* Title */}
      <div className="h-6 w-40 bg-gray-200 rounded mt-3" />
    </div>
  );
};
export default BreadcrumbSkeleton;
