export const RadioButton = ({name, value, label, register, validations, checked, disabled = false, wrapperClass = "flex items-center gap-2", inputClass = "", labelClass = "",}) => {const id = `${name}-${value}`;
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer ${wrapperClass}`}
    >
      <input
        id={id}
        type="radio"
        value={value}
        disabled={disabled}
        {...register(name, validations)}
        checked={checked}
        onChange={(e) => register(name).onChange(e)}
        style={{ accentColor: "var(--color-primary)" }}
        className={`h-4 w-4 cursor-pointer disabled:opacity-50 ${inputClass}`}
      />
      <span
        className={`text-sm font-medium text-gray-700 ${
          disabled ? "opacity-50" : ""
        } ${labelClass}`}
      >
        {label}
      </span>
    </label>
  );
};
