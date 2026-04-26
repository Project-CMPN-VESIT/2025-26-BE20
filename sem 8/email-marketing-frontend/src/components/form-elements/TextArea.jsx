export const TextArea = ({label, placeholder, name, rows, cols, register, validations, errors, labelStyleClass, dataTestId})=>{

    return(
    <div className="mb-3  flex flex-col">
      {label && <label htmlFor={name} className={`form-label self-start block mb-2 text-sm font-medium ${labelStyleClass}`}>{label}</label>}

      <textarea
        id={name}
        name={name}
        {...register(name, validations)}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        className="border border-gray-300 rounded py-2 px-3 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        data-test-id={dataTestId}
      ></textarea>

      {errors && <p className="text-danger mt-1">{errors.message}</p>
      }
    </div>
    )
}

/***********************************props to be passed************************* */
{/* <TextArea
    name="your name"
    register={register}
    label="label name"
    placeholder="Tell us about your product..."
    validations={validationFunction}
    errors={errors?.your name}
    rows={10}
    cols={50} //not working for now
/> */}