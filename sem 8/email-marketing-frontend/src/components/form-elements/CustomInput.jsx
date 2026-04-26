export const CustomInput = ({label,type,name,placeholder,register,validations, errors, labelStyleClass, dataTestId, inputStyleClass})=>{
    return(
        <div className="mb-3  flex flex-col">
            {label && <label htmlFor={name} className={`form-label self-start block mb-2 text-sm font-medium ${labelStyleClass}`}>{label}</label>}
            <input
                type={type}
                placeholder={placeholder} 
                {...register(name,validations)} 
                className={"form-control border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none " + " " + (inputStyleClass || "")} 
                data-test-id={dataTestId}
            />
            {errors && <p className="mt-1 text-danger">{errors?.message}</p>}
        </div>
        
    )
}