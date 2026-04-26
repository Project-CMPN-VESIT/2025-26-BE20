export const Select = ({label,name,options,placeholder,register,validation, errors, labelStyleClass, dataTestId, selectStyleClass})=>{
    return(
        <div className="col-md-12 mb-3 flex flex-col">
            <label htmlFor={name} className={`form-label self-start block mb-2 text-sm font-medium ${labelStyleClass}`}>{label}</label>
            <select 
                className={"form-label form-control border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" + " " + (selectStyleClass || "")}
                id={name}
                {...register(name,validation)}
                data-test-id={dataTestId}
            >
                <option value={""}>{placeholder}</option>
                {
                    options && options.map((option)=>(
                        <option key={option.value} value={option.id}>{option.name}</option>
                    ))
                }
            </select>
            {
                // console.log(errors)
                errors && <p className={"mt-1 text-danger"}>{errors.message}</p>
            }
        </div>
    )
}