import React, { useState } from "react";
import { Button } from "../../../components/form-elements/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import AddSubscriberNav from "./AddSubscriberNav";
import authAxios from "../../../config/AuthAxios";
import toast from "react-hot-toast";
import { CustomInput } from "../../../components/form-elements/CustomInput";
import { listNameValidation, listDescriptionValidation } from "../../../utils/list-validation";
import { useNavigate } from "react-router-dom";

const fields = [
  {
    label: "Email",
    key: "email",
    fieldType: {
      type:"input"
    },
    validations : [
      {
        rule: "required",
        errorMessage: "invalid credentials",
        level: "error",
      },
    ],
  },
    {
    label: "First Name",
    key: "first_name",
    fieldType: {
      type:"input"
    },
    validations : [
      {
        rule: "required",
        errorMessage: "invalid credentials",
        level: "error",
      },
    ],
  },
  {
    label: "Last Name",
    key: "last_name",
    fieldType: {
      type:"input"
    },
    validations : [
      {
        rule: "required",
        errorMessage: "invalid credentials",
        level: "error",
      },
    ],
  },
];

const onFormSubmit = () => {
  const { listName, listDescription } = getValues();

  if (!listName || !listDescription) {
    toast.error("Please enter list name and description.");
    return;
  }
  setIsOpen(true);
};


const AddSubscriber = () => {
  const [isOpen , setIsOpen] = useState(false);
  const [failedModalOpen, setFailedModalOpen] = useState(false);
  const [failedListId, setFailedListId] = useState(null);
  const {register, handleSubmit, formState: { errors }, getValues,reset} = useForm();
  const navigate = useNavigate();

  const handleModal = (e) => {
    setIsOpen(true);
    e.preventDefault();
  };
  const onSubmit = () => {
    setIsOpen(true);
    reset();
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
  };
  const handleImportSubmit = async (data, file) => {
    const { listName, listDescription } = getValues();

      if (!listName || !listDescription) {
        toast.error("Please enter list name and description.");
        return;
      }

      try{
      const formData = new FormData();
      formData.append("name", listName);
      formData.append("description", listDescription);
      formData.append("file", file);

      const response = await authAxios.post("/email-lists/import", formData);
      const { list, failed_contacts_exists } = response.data.data;
      if(failed_contacts_exists) {
        setFailedListId(list.id);
        setFailedModalOpen(true);
        toast.error("Some contacts failed to import. Download the failed contacts list.");
      } else {
        toast.success("Import successful!");
        navigate("/subscribers");
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Import failed:", error.response?.data || error);
       toast.error((Object.values(error.response.data.errors)[0][0] || error.response?.data?.message || "Import failed"));
      // const msg = Object.values(error.response.data.errors)[0][0];
      // toast.error(msg);

    }
  };

  const handleDownloadFailed = async () => {
    try {
      const res = await authAxios.get(
        `/email-lists/get-failed-contact-inserts/${failedListId}`,
        { responseType: "blob" }
      );

      // Try to detect if backend returned JSON instead of CSV
      const isJson =
        res.headers["content-type"]?.includes("application/json");

      if (isJson) {
        const text = await res.data.text();
        const json = JSON.parse(text);
        toast(json.message || "No failed contacts found");
        setFailedModalOpen(false);
        return;
      }

      // Otherwise -> it IS a CSV, download it
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "failed-contact-inserts.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setFailedModalOpen(false);
      toast.success("Download started");

    } catch (err) {
      toast.error("Failed to download failed contacts");
    }
  };


  return (
    <div className="pl-1 pt-10">
      <nav className="">
        <div className="">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link to="/subscribers" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  Subscribers
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <i className="ri-arrow-right-s-line"></i>
                  <Link 
                    to="/subscribers/add"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Add New
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
          <div className="flex items-center ">
            <span className="text-2xl mt-3 font-bold text-gray-900 dark:text-white">
              Add Subscribers
            </span>
          </div>
        </div>
      </nav>
      <AddSubscriberNav />

      <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white rounded-xl">
        <div className="">
        <div className=" p-6 pb-3  mt-3">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-left">List details</h2>
        <CustomInput
          label="Enter List Name"
          type="text"
          name="listName"
          placeholder="Enter list name"
          register={register}
          validations={listNameValidation}
          errors={errors.listName}
          dataTestId="list-name"
        />

        <CustomInput
          label="Enter Description"
          type="text"
          name="listDescription"
          placeholder="Enter description"
          register={register}
          validations={listDescriptionValidation}
          errors={errors.listDescription}
          dataTestId="list-description"
        />
        </div>
 
        <div className="p-6 pt-0">
          <h3 className="font-medium text-gray-900">Upload file</h3>
          <p className="text-sm text-gray-500">CSV file with your subscribers</p>
          <div data-test-id="drag-drop" className="border-2 border-dashed border-gray-300 mt-2 p-6 text-center hover:bg-gray-50 cursor-pointer rounded" 
            onDrop={handleModal}
            onDragOver={handleDragDrop}
            onClick={() => setIsOpen(true)}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-gray-200 flex items-center justify-center mb-4" ><i className="ri-upload-line"></i> </div>
              <p className="text-gray-700">Drag and drop a CSV file</p>
              <p className="text-sm text-gray-400">or select it from your computer</p>
            </div>
          </div>
              <p className="text-sm pt-4 text-left text-red-400"><span className=" font-semibold text-red-400">Note:</span>The header of the file should be as follows: for Email: email, for First Name: first_name, for Last Name: last_name</p>
        </div>

      <div className="mt-6 flex justify-end mb-2 p-6 pt-0">
        <Button
          label="Upload"
          type="submit"   
          styleClass="cursor-pointer w-full px-6 py-2 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg"
          onClick={() => setIsOpen(true)}
          data-test-id="upload-button"
        />
      </div>
      </div>
      </form>
      {isOpen && (
        <ReactSpreadsheetImport 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleImportSubmit}
          fields={fields}
      />
      )}
      {failedModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-xl font-semibold mb-2">
        Some contacts failed to import
      </h3>

      <p className="text-gray-600 mb-6">
        Download the file to review and fix the failed contacts.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          label="Close"
          styleClass="px-4 py-2 w-full sm:w-auto !bg-danger text-white rounded hover:opacity-90 cursor-pointer"
          onClick={() => setFailedModalOpen(false)}
        />

        <Button
          label="Download Failed Contacts"
          styleClass="px-4 py-2 w-full sm:w-auto bg-primary text-white rounded hover:opacity-90 cursor-pointer"
          onClick={handleDownloadFailed}
        />
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default AddSubscriber;
