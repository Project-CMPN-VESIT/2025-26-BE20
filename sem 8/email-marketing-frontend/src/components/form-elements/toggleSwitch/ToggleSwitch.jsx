import "./ToggleSwitch.css"; 
export const ToggleSwitch = ({ label, name, register, checked, errors, validations, labelStyleClass, dataTestId}) => {
  return (
    <div className=" mb-4">
    <div className="toggle-wrapper">
      {label && <label htmlFor={name} className={`toggle-label self-start block text-sm font-medium me-3 ${labelStyleClass}`}>{label}</label>}
      
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={name}
          id={label}
          checked={checked}
          {...register(name, validations)}
          onChange={(evt) => {register(name).onChange(evt)}}
          data-test-id={dataTestId}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
    {
      errors && <p className="mt-1 text-danger">{errors.message}</p>
    }
    </div>
  );
};

/**********************To use this component:********************************/

// include watch in useForm()

// const watchToggleValue = watch('your name', defaultValue(true/false));

// sets a watch on the given name all the time and gives its newest value. takes single name or multiple values. default value is optional, is set when the value doesnt have anything.

// props passed:
// <ToggleSwitch 
//       label={"labelName"} 
//       name="your name"
//       register={register}
//       checked={watchToggleValue}
//       validations={{required: "condition"}}
//       errors={errors.your mame}
// />