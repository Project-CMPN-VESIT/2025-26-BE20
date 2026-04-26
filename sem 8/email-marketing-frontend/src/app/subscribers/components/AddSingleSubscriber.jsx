import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/form-elements/Button";
import AddSubscriberNav from "./AddSubscriberNav";
import authAxios from "../../../config/AuthAxios";
import { CustomInput } from "../../../components/form-elements/CustomInput";
import {emailValidation,firstNameValidation,lastNameValidation} from "../../../utils/validations";


const AddSingleSubscriber = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, reset, formState: { errors }} = useForm();

  const onSubmit = async (data) => {
    const { email, first_name, last_name } = data;
    try{
      const newSubscriber = {
        email: email,
        first_name,
        last_name,
        // organization_id: orgId
      };
      const response = await authAxios.post(
        "/contacts/create",
        newSubscriber
      );
      console.log(" API response:", response.data);

      if(response.status === 200){
        toast.success(response.data.message || "Subscriber added successfully");
        navigate("/subscribers");
        //
        // navigate("/subscribers");
      }
    } catch (error) {
      console.error(" Error adding subscriber:", error);
      toast.error("Failed to add subscriber");
    }
  };

  return (
    <div className="pl-1 pt-10">
      {/* <Toaster position="top-center" /> */}
      <nav className="">
        <div className="">
<nav className="flex" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center">
      <Link to="/subscribers" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white">
        Subscribers
      </Link>
    </li>
    <li>
      <div className="flex items-center">
        <i className="ri-arrow-right-s-line"></i>
        <Link 
          to="/subscribers/addSingleSubscriber"
          className="ms-1 text-sm font-medium text-gray-700 hover:text-primary md:ms-2 dark:text-gray-400 dark:hover:text-white"
        >
          Add New
        </Link>
      </div>
    </li>
  </ol>
</nav>

          <div className="flex items-center space-x-3">
            <span className="text-2xl mt-3 font-bold text-gray-900 dark:text-white">
              Add Subscribers
            </span>
          </div>
        </div>
      </nav>
      <AddSubscriberNav />
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="bg-white p-6 pb-3  mt-3 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-left">Subscriber details</h2>

            <CustomInput
              type="email"
              name="email"
              label="Email ID"
              placeholder="Enter subscriber email"
              register={register}
              validations={emailValidation}
              errors={errors.email}
              data-test-id="input-email"
            />

          <CustomInput
            type="text"
            name="first_name"
            label="First Name"
            placeholder="Enter subscriber's first name"
            register={register}
            validations={firstNameValidation}
            errors={errors.first_name}
            dataTestId="input-first-name"
          />

          <CustomInput
            type="text"
            name="last_name"
            label="Last Name"
            placeholder="Enter subscriber's last name"
            register={register}
            validations={lastNameValidation}
            errors={errors.last_name}
            dataTestId="input-last-name"
          />

           <div className="mt-6 flex justify-end mb-6 pt-8">
          <Button
            label="Add Subscriber"
            type="submit"
            styleClass="cursor-pointer w-full px-6 py-2 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg"
            data-test-id="add-subscriber-button"
          />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSingleSubscriber;
