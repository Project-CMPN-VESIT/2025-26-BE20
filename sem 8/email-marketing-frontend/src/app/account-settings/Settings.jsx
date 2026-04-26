import React, { useEffect, useState } from "react";
import { CustomInput } from "./../../components/form-elements/CustomInput";
import { Controller, set, useForm } from "react-hook-form";
// import { Select } from "../../components/form-elements/Select";
import { ToggleSwitch } from "../../components/form-elements/toggleSwitch/ToggleSwitch";
import { Button } from "./../../components/form-elements/Button";
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import { useFetchAuth } from "../../hooks/useFetchAuth";
import { data } from "react-router-dom";
import toast from "react-hot-toast";
import { phoneNumberValidation, zipValidation } from "../../utils/validations";
import authAxios from "../../config/AuthAxios";
import {useAuth} from "../../context/AuthContext";



const Settings = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
      defaultValues: {
        orgName: "",
        phoneNumber: "",
        address: "",
        postalcode: "",
      },
    });

  // const {data:orgData, isLoading:orgDataLoading, error:orgDataError} = useFetchAuth("/auth/get-organization-details");
  const [orgName, setOrgName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const {org:orgData, loading, updateOrg} = useAuth();
  const [isSavingChanges, setIsSavingChanges] = useState(false);


useEffect(() => {
    if (orgData) {

      reset({
        orgName: orgData.name,
        phoneNumber: orgData.phone_number,
        address: orgData.address,
        postalcode: orgData.zip
      });
      setOrgName(orgData.name);
      setPhoneNumber(orgData.phone_number);
    }
  }, [orgData, reset]);



  const postalCodeCheckAndSubmitter = async (data) => {
    const postalCode = data.postalcode;
    setIsSavingChanges(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${postalCode}`);
      const result = await response.json();

      if (result[0].Status === "Success") {
        const updatedData = {
          ...data,
          city: result[0].PostOffice[0].District,
          state: result[0].PostOffice[0].State,
          country: result[0].PostOffice[0].Country,
        }
        console.log(updatedData);
        submitter(updatedData)

      } else {
        toast.error("Invalid postal code.")
        setIsSavingChanges(false);
      }
    } catch (error) {
      console.error("Error fetching postal code data:", error);
      alert("Failed to fetch postal code data.");
      setIsSavingChanges(false);
    }
  };

  const submitter = async(data) =>{
    // console.log("data from submitter", data);

    const payload = {
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.postalcode?.toString(),
      country: data.country,
      name: data.orgName,
      phone_number: data.phoneNumber,
    };

    // if (data.orgName !== orgName) {
    //   payload.name = data.orgName;
    // }
    // if (data.phoneNumber !== phoneNumber) {
    //   payload.phone_number = data.phoneNumber;
    // }
    console.log("data from submitter", payload);

    try {
      const response = await authAxios('auth/update-organization',{ 
        method: 'PUT',
        data:payload
      });
      if (response.status === 200) {
        console.log(response);
        updateOrg(response.data.data.organization);
        toast.success('Reset successfully.');
      }
    } catch (e) {
        console.error('error:', e);
        if (e.response) {
            console.log(e.response.data.data);
            toast.error(e.response.data.message || "Something went wrong!");

        }
    }
    finally{
      setIsSavingChanges(false);
    }
  }

  return (
    <div className="mt-5 bg-white pr-15 rounded-lg p-8">
      <form action="" onSubmit={handleSubmit(postalCodeCheckAndSubmitter)}>
        <div className="flex justify-between items-center pb-7">
          <div>
            <h2 className="font-semibold text-xl mb-1">
              Organization Information
            </h2>
            <p className="text-gray-500">
              The following information will help us automatically build your
              email footers to comply with the CAN-SPAM act and international
              anti-spam laws.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-5">
              <CustomInput
                label={"Organization name"}
                type={"text"}
                name={"orgName"}
                register={register}
                placeholder={"Enter organization name"}
              />
              <CustomInput
                label="Phone" 
                  type="number" 
                  name="phoneNumber" 
                  placeholder="e.g., 1234567890" 
                  dataTestId="org-phone-number"
                  register={register} 
                  validations={phoneNumberValidation} 
                  errors={errors.phoneNumber} 
                  labelStyleClass="text-gray-900 text-lg dark:text-gray-300" 
              />
              <CustomInput
              label={"Address"}
              type={"text"}
              name={"address"}
              register={register}
              placeholder={"Enter organization's address"}
              />
              <CustomInput
              label={"Postal Code"}
              type={"number"}
              name={"postalcode"}
              register={register}
              validations={zipValidation}
              errors={errors.postalcode}
              placeholder={"Enter postal code"}
              />
        </div>
        <div className="flex justify-end mb-6">
          <Button 
          label={"Submit"} 
          loading={isSavingChanges}
          styleClass="cursor-pointer w-full py-2.5 px-4 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] text-lg dark:hover:text-[#2F8481] dark:bg-[#2F8481] dark:text-gray-900 dark:hover:bg-gray-900 border border-[#2F8481] transition-effect"
          />
        </div>
      </form>
    </div>
  );
};

export default Settings;
