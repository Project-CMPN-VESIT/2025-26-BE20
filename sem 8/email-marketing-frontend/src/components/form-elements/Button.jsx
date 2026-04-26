export const Button = ({
  type,
  variant = "primary",
  styleClass,
  style,
  loading = false,
  label,
  onClick,
  children,
  isFullWidth = false,
  dataTestId,
}) => {
  return (
    <div className={`${isFullWidth ? "w-full" : "w-full md:w-fit"}`}>
      <button
        disabled={loading}
        className={`btn bg-${variant} ${styleClass} ${
          children ? "inline" : ""
        } cursor-pointer`}
        onClick={onClick}
        type={type}
        data-test-id={dataTestId}
        style={style}
      >
        {loading ? "loading..." : label}
        {children}
      </button>
    </div>
  );
};
