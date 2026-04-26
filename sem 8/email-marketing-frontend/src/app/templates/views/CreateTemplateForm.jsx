import React, { useState } from "react";
import { CustomInput } from "../../../components/form-elements/CustomInput";
import { useForm } from "react-hook-form";
import { Select } from "../../../components/form-elements/Select";
import { Button } from "../../../components/form-elements/Button";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { useFetchAuth } from "../../../hooks/useFetchAuth";
import toast from "react-hot-toast";
import authAxios from "../../../config/AuthAxios";

const CreateTemplateForm = () => {
  const [currentStep, setCurrentStep] = useState("details");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const fromCampaign = searchParams.get("from") === "campaign";
  const campaignId = searchParams.get("campaignId");

  const {data:templateCategories} = useFetchAuth("/template-categories")  
  
  const handleCancelClick = () => {
    navigate(`/templates${fromCampaign ? `?from=campaign&campaignId=${campaignId}` : ""}`);
  }

  const onSubmit = async (data) => {
    const postData = {
      name: data?.name,
      template_category_id: data?.categories,
    };

    try {
      setLoading(true);
      const response = await authAxios.post(
        "/custom_templates/create",
        postData
      );

      if (response.status === 201) {
        console.log(response);
        toast.success(response.data.message);
        setCurrentStep("starting-point");
        navigate(`/templates/${response.data.data.id}/starting-point${
            fromCampaign ? `?from=campaign&campaignId=${campaignId}` : ""
          }`);
        };
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to create template"
      );
    }finally {
      setLoading(false);
    }
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="my-10">
      <div className="flex flex-col mb-10">
        <ol className="breadcrumbs flex text-xs text-gray-600">
          <li className={`${
                currentStep === "starting-point" || currentStep === "content"
                  ? "text-black font-medium"
                  : "cursor-not-allowed"
              }`}>
            <a
              href="#"
              className={`${
                currentStep === "details"
                  ? "text-black font-medium"
                  : "cursor-not-allowed"
              }`}
            >
              Name
            </a>
            <i className="ri-arrow-right-s-line mx-1"></i>{" "}
          </li>
          <li className={`${
                currentStep == "content"
                  ? "text-black font-medium"
                  : "cursor-not-allowed"
              }`}>
            <a
              href="#"
              className={`${
                currentStep == "starting-point"
                  ? "text-black font-medium"
                  : "cursor-not-allowed"
              }`}
            >
              Starting point
            </a>{" "}
            <i className="ri-arrow-right-s-line mx-1"></i>{" "}
          </li>
          <li>
            <a
              href="#"
              className={`${
                currentStep == "content"
                  ? "text-black font-medium"
                  : "cursor-not-allowed"
              }`}
            >
              Content
            </a>
          </li>
        </ol>
        <h1 className="mt-1 text-3xl font-semibold dark:text-white">New Template</h1>
      </div>
      <div className="p-4 rounded-lg bg-white w-full dark:bg-dark-secondary">
        <p className="text-xl font-semibold mb-5 dark:text-white">Template details</p>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10">
            <div className="mb-5">
              <CustomInput
                label={"Template name"}
                register={register}
                name={"name"}
                type={"text"}
                labelStyleClass={"!text-base"}
                placeholder={"Name your template"}
                errors={errors}
              />
              <p className="text-sm text-gray-500">
                Give your template an easily recognizable name. Recipients won't
                see it, it's just for you and your team.
              </p>
            </div>
            <div className="mb-5">
              <Select
                label={"Template Category"}
                register={register}
                options={templateCategories?.data ? templateCategories.data : []}
                name={"categories"}
                placeholder={templateCategories?.data ? "Select template category" : ""}
                labelStyleClass={"!text-base"}
                errors={errors}
              />
              <p className="text-sm text-gray-500">
                Choose the type of email you're creating to help organize your
                templates.
              </p>
            </div>
          </div>
          <div className="flex justify-end w-full gap-2 border-t border-gray-200 py-10">
            <Button
              label={"Cancel"}
              styleClass={
                "px-5 py-2 w-full rounded-md bg-transparent border-2 border-primary text-base text-primary font-medium cursor-pointer transition-effect"
              } onClick={() => handleCancelClick() }
              type={"button"}
            />
            <Button
              label={"Save and continue"}
              styleClass={
                "px-5 py-2 w-full text-white rounded-md font-medium text-base cursor-pointer transition-effect border-2  border-primary"
              } 
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplateForm;
