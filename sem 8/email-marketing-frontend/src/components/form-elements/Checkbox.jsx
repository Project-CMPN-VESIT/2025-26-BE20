export const Checkbox = ({ name, register, label, validations, errors, checked, disabled = false, wrapperClassName, labelClassName, dataTestId}) => {

    return (
      <div className="mb-4">
      <div className={`flex items-center ${wrapperClassName}`}>
        <input
          type="checkbox"
          id={name} 
          name={name}
          {...register(name, validations)}
          checked={checked} 
          disabled={disabled}
          onChange={(evt) => {register(name).onChange(evt);}}
          className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300"
          data-test-id={dataTestId}
        />
        <label htmlFor={name} className={`text-gray-700 ml-2 text-sm font-medium ${labelClassName}`}>
          {label}
        </label>
      </div>
      {errors && <p className="text-danger ml-2">{errors?.message}</p>}
      </div>
    );
  };

  /*************************To use this component************************************* */

  // Need to include 'watch' in useForm()

// const acceptTermsValue = watch('acceptTerms', false);

// acceptTerms: name that we want to keep watch on.
//false: default value of acceptTermsValue. optional

// acceptTermsValue islie pass kiya kyuki iss variable ke andar jo value hai uspe wach hai. taaki detect kar sake ki change hua ki navigator. agar hua toh naya value kya hai

//   <Checkbox
//           name="your name"
//           register={register}
//           label="any label"
//           validations={{required: "description"}}
//           errors={errors?.your name}
//           checked={acceptTermsValue}
//           wrapperClassName={custom styles for the div that contains checkbox and label.}
//           labelClassName{custom styles for label}
// />