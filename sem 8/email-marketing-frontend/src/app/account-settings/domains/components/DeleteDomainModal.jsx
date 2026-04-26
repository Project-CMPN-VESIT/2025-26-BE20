import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/form-elements/Button";

const DeleteDomainModal = ({
  showDeleteDomainModal,
  setShowDeleteDomainModal,
  onDelete,
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black/20 ${
          showDeleteDomainModal ? "" : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex flex-col gap-2 p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <div className="flex items-center justify-between items-center ">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delete Domain
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-primary rounded-lg text-sm p-2 justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <i
                    className="ri-close-line ri-xl cursor-pointer"
                    onClick={() =>
                      setShowDeleteDomainModal(!showDeleteDomainModal)
                    }
                  ></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            {/* <!-- Modal body --> */}
            <div className="mb-5 mt-2 p-4 md:px-5 md:py-4 flex flex-col">
              <p className="text-gray-400">
                Removing a domain might affect deliverability. We recommend you
                only delete domains you are not using.
              </p>
              <form onSubmit={handleSubmit(onDelete)} className=" md:px-7 py-2">
                {/* <!-- Modal footer --> */}
                <div className="flex items-center py-4 gap-2 justify-end" data-test-id={`cancel-delete-buttons`}>
                  <Button
                    label={"Cancel"}
                    styleClass={
                      "w-full !bg-white text-primary text-base py-2 px-3 border-2 rounded-lg cursor-pointer transition-effect md:w-25 hover:opacity-60"
                    }
                    onClick={() =>
                      setShowDeleteDomainModal(!showDeleteDomainModal)
                    }
                  />
                  <Button
                    label={"Delete"}
                    styleClass={
                      "w-full md:w-25 text-white text-base py-2 px-3 border-2 rounded-lg cursor-pointer transition-effect border-primary hover:bg-primary-900 hover:border-primary-900 dark:hover:opacity-50"
                    }
                    register={register}
                    type={"submit"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDomainModal;
