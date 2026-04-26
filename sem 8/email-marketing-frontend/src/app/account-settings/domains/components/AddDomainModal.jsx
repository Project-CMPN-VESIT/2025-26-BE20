import React from "react";
import { Button } from "../../../../components/form-elements/Button";
import { useForm } from "react-hook-form";
import { CustomInput } from "../../../../components/form-elements/CustomInput";
import authAxios from "../../../../config/AuthAxios";
import toast from "react-hot-toast";
import { Checkbox } from "../../../../components/form-elements/Checkbox";
import { emailValidation } from "../../../../utils/validations/validations";

const AddDomainModal = ({ showAddDomainModal, setShowAddDomainModal, fetchData }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const email = watch("example_email");
  const is_default = watch("is_default");

  const handleAddDomain = async () => {
    try {
      const response = await authAxios("/domain/create-domain", {
        method: "POST",
        data: {
          example_email: email,
          is_default: is_default,
        },
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status === 201) {
        toast.success("Added Domain Successfully");
        setShowAddDomainModal(!showAddDomainModal);
        fetchData();
        reset();
      }
    } catch (e) {
      // if (e.response?.status === 422) {
      //   const serverErrors = e.response.data.data;
      //   if (serverErrors.example_email) {
      //     setError("example_email", {
      //       type: "server",
      //       message: serverErrors.example_email[0],
      //     });
      //   }
      //   if (serverErrors.is_default) {
      //     setError("is_default", {
      //       type: "server",
      //       message: serverErrors.is_default[0],
      //     });
      //   }
      // }
      if (e.response?.status === 422) {
        setError("example_email", {
          type: "server",
          message: e.response?.data?.message || "Invalid domain",
        });
        return;
      }

      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        className= {`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  h-full bg-black/50 dark:bg-black/60 dark:backdrop-blur-[1px] ${showAddDomainModal ? "" : "hidden"}`}
      >
        <div className="relative p-4 m-2 md:m-0 w-full md:max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex flex-col gap-2 p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <div className="flex items-center justify-between items-center ">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Domain
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-primary rounded-lg text-sm p-2 justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <i
                    className="ri-close-line ri-xl cursor-pointer"
                    onClick={() => {setShowAddDomainModal(!showAddDomainModal); reset();}}
                  ></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            {/* <!-- Modal body --> */}
            <form
              onSubmit={handleSubmit(handleAddDomain)}
              className="mt-2 p-4 md:px-5 md:py-4" data-test-id={`domain-add-form`}
            >
              <p className="text-gray-400 mb-5">
                Enter an email address of the domain you want to verify. We'll
                guide you through adding DNS entries to authenticate your
                domain.
              </p>
              <CustomInput
                register={register}
                label={"Email Address"}
                name={"example_email"}
                placeholder={"email@domain.com"}
                labelStyleClass={"!text-base mt-3"}
                errors={errors?.example_email}
                type={"text"}
                validations={emailValidation}
              />
              <div className="mt-5" data-test-id={`domain-default-input`}>
              <Checkbox register={register} label={"Default Domain"} name={"is_default"} errors={errors?.is_default} wrapperClassName={"flex-col-reverse !items-start gap-2"} labelClassName={"!ml-0 !font-medium !text-black !text-base dark:!text-white"}/></div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center mt-7 py-4 gap-2 md:gap-2 justify-end" data-test-id={`domain-add-modal-btn`}>
                <Button
                  label={"Cancel"}
                  styleClass={
                    "!bg-white text-primary text-base py-2 px-3 border-2 rounded-lg cursor-pointer transition-effect w-25 hover:opacity-60 w-full"
                  }
                  onClick={() => {setShowAddDomainModal(!showAddDomainModal); reset();}}
                />
                <Button
                  label={"Add"}
                  styleClass={
                    "w-25 text-white text-base py-2 px-3 border-2 rounded-lg cursor-pointer transition-effect border-primary hover:bg-primary-900 hover:border-primary-900 w-full "
                  }
                  type={"submit"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDomainModal;
