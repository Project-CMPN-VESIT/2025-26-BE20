import React, { useEffect, useRef, useState } from "react";
import { CustomInput } from "./../../components/form-elements/CustomInput";
import { set, useForm } from "react-hook-form";
import { Select } from "../../components/form-elements/Select";
import { ToggleSwitch } from "../../components/form-elements/toggleSwitch/ToggleSwitch";
import { Button } from "./../../components/form-elements/Button";
import { Checkbox } from "../../components/form-elements/Checkbox";
import { useLocation } from "react-router-dom";
// import { useQuill } from 'react-quilljs';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Table from "../subscribers/components/Table";
import { useFetchAuth } from "../../hooks/useFetchAuth";
import authAxios from "../../config/AuthAxios";
import toast from "react-hot-toast";
import { form, image } from "framer-motion/client";

const getInitialDefaultImageUrl = () =>
  `https://gravatar.com/avatar/?d=mp`;

const DefaultSettings = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      image:null,
    }
  });

  const {data:defaultData, isLoading:defaultDataLoading, error:defaultDataError} = useFetchAuth("/settings/get-account-settings");

  const [socialLinks, setSocialLinks] = useState([]);
  const [selectedImage, setSelectedImage] = useState(getInitialDefaultImageUrl());
  const [imageInfo, setImageInfo] = useState(null);
  const [isSavingChanges, setIsSavingChanges] = useState(false);

  // Normalizes backend social_links into [{ handle: "", url: "" }, ...]
  const initializeSocialLinks = (rawValue) => {
    if (!rawValue) return [];

    let parsed = rawValue;

    // Backend sends JSON string → parse it
    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch {
        console.error("Error parsing social_links JSON:", parsed);
        return [];
      }
    }

    // If backend sends object like { Facebook: "...", Twitter: "..." }
    if (!Array.isArray(parsed) && typeof parsed === "object") {
      return Object.entries(parsed).map(([key, value]) => ({
        handle: key,
        url: value,
      }));
    }

    // If it's an array but missing handle/url fields
    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({
        handle: item.handle || item.network || "",
        url: item.url || item.link || "",
      }));
    }

    // Anything else → empty array
    return [];
  };

  // Convert File to data URL (base64)
  // const fileToDataURL = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result); // e.g. "data:image/png;base64,...."
  //     reader.onerror = reject;
  //     reader.readAsDataURL(file);
  //   });
  // };



  useEffect(() => {
    if(defaultData){
      reset({
      senderName: defaultData.settings.sender_name,
      senderEmail: defaultData.settings.sender_email,
      recipientName: defaultData.settings.add_recipients_name,
      // forceUpdateLogo: defaultData.settings.force_update_logo,
      campaignTrackOpens: defaultData.settings.campaign_track_opens,
      campaignGoogleTracking: defaultData.settings.campaign_google_analytics_tracking,
      // automationTrackOpens: defaultData.settings.automation_track_opens,
      // automationGoogleTracking: defaultData.settings.automation_google_analytics_tracking,
      forceUpdateSocialLinks: defaultData.settings.force_update_social_links,
      forceUpdateCompanyDetails: defaultData.settings.force_update_organization_details,
      unsubscribeLinkText: defaultData.settings.email_unsubscribe_link_text,
      forceUpdateUnsubscribeDisclaimer: defaultData.settings.force_update_email_unsubscribe_link_text,
      emailPreferenceLinkText: defaultData.settings.email_preference_link_text,
      forceUpdateEmailPreferenceLinkText: defaultData.settings.force_update_email_preference_link_text,
      })

      if (defaultData?.settings) {
        const settings = defaultData.settings;

        // Normalize and set social links
        const normalized = initializeSocialLinks(settings.social_links);
        setSocialLinks(normalized);
      }

      if (companyDetailsQuillRef.current?._quill) {
      companyDetailsQuillRef.current._quill.root.innerHTML =
        defaultData.settings.organization_details || "";
      }
      if (unsubscribeDisclaimerQuillRef.current?._quill) {
        unsubscribeDisclaimerQuillRef.current._quill.root.innerHTML =
          defaultData.settings.unsubscribe_disclaimer || "";
      }

      if (defaultData?.settings.default_logo) {
        setSelectedImage(defaultData.settings.default_logo);
      } else {
        setSelectedImage(
          getInitialDefaultImageUrl(defaultData?.settings.sender_name)
        );
      }

    }
  },[defaultData, reset]);

  const recipientsNameValue = watch("recipientName", false);
  // const forceUpdateLogoValue = watch("forceUpdateLogo", false);
  const campaignTrackOpensValue = watch("campaignTrackOpens", false);
  const campaignGoogleTrackingValue = watch("campaignGoogleTracking", false);
  // const automationTrackOpensValue = watch("automationTrackOpens", false);
  // const automationGoogleTrackingValue = watch("automationGoogleTracking", false);
  const forceUpdateSocialLinksValue = watch("forceUpdateSocialLinks", false);
  const forceUpdateUnsubscribeDisclaimerValue = watch("forceUpdateUnsubscribeDisclaimer", false);
  const forceUpdateEmailPreferenceLinkTextValue = watch("forceUpdateEmailPreferenceLinkText", false);
  const forceUpdateCompanyDetailsValue = watch("forceUpdateCompanyDetails", false);

  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState(null);
  const companyDetailsQuillRef = useRef(null);
  const unsubscribeDisclaimerQuillRef = useRef(null);

  const socialNetworks = [
    "Facebook",
    "Twitter",
    "Instagram",
    "LinkedIn",
    "YouTube",
    "TikTok",
  ];


const handleSocialChange = (idx, field, value) => {
  const updated = [...socialLinks];
  updated[idx][field] = value;
  setSocialLinks(updated);
};

const handleAddSocialLink = () => {
  setSocialLinks([...socialLinks, { handle: "Facebook", url: "" }]);
};

const handleDeleteSocialLink = (idx) => {
  setSocialLinks(socialLinks.filter((_, i) => i !== idx));
};




  useEffect(() => {
    if (companyDetailsQuillRef.current) {
      if (!companyDetailsQuillRef.current._quill) {
        companyDetailsQuillRef.current._quill = new Quill(companyDetailsQuillRef.current, {
          theme: "snow",
          placeholder: "Enter detailed description...",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ script: "sub" }, { script: "super" }],
              ["blockquote", "code-block"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              [{ direction: "rtl" }, { align: [] }],
            ],
          },
        });
      }
    }
  }, []);

  // Effect for Email Unsubscribe Disclaimer Quill
  useEffect(() => {
    if (unsubscribeDisclaimerQuillRef.current) {
      if (!unsubscribeDisclaimerQuillRef.current._quill) {
        unsubscribeDisclaimerQuillRef.current._quill = new Quill(unsubscribeDisclaimerQuillRef.current, {
          theme: "snow",
          placeholder: "Enter unsubscribe disclaimer...",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ script: "sub" }, { script: "super" }],
              ["blockquote", "code-block"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              [{ direction: "rtl" }, { align: [] }],
            ],
          },
        });
      }
    }
  }, []);

  const companyDetailsQuill = companyDetailsQuillRef.current?._quill;
  const unsubscribeDisclaimerQuill = unsubscribeDisclaimerQuillRef.current?._quill;


  const submitter = async (data) => {
    const companyDetailsHtml = companyDetailsQuill?.root.innerHTML;
    const unsubscribeDisclaimerHtml = unsubscribeDisclaimerQuill?.root.innerHTML;

    const formData = new FormData();

    formData.append("sender_name", data.senderName);
    formData.append("sender_email", data.senderEmail);
    formData.append("add_recipients_name", data.recipientName ? 1 : 0);//

    formData.append("campaign_track_opens", data.campaignTrackOpens ? 1 : 0);//
    formData.append("campaign_google_analytics_tracking", data.campaignGoogleTracking ? 1 : 0);//
    formData.append("automation_track_opens", data.automationTrackOpens ? 1 : 0);//
    formData.append("automation_google_analytics_tracking", data.automationGoogleTracking ? 1 : 0);//

    // formData.append("social_links", JSON.stringify(socialLinks));
    socialLinks.forEach((link, index) => {
      formData.append(`social_links[${index}][handle]`, link.handle);
      formData.append(`social_links[${index}][url]`, link.url);
    });

    formData.append("force_update_social_links", data.forceUpdateSocialLinks ? 1 : 0);//
    formData.append("force_update_organization_details", data.forceUpdateCompanyDetails ? 1 : 0);//

    formData.append("email_unsubscribe_link_text", data.unsubscribeLinkText);
    formData.append("force_update_email_unsubscribe_link_text", data.forceUpdateUnsubscribeDisclaimer ? 1 : 0);//
    formData.append("email_preference_link_text", data.emailPreferenceLinkText);
    formData.append("force_update_email_preference_link_text", data.forceUpdateEmailPreferenceLinkText ? 1 : 0);//

    formData.append("organization_details", companyDetailsHtml);
    formData.append("unsubscribe_disclaimer", unsubscribeDisclaimerHtml);

    if (data.image && data.image instanceof File) {
      formData.append("default_logo_image", data.image);
    }

    console.log("Submitting form data:", formData);

    setIsSavingChanges(true);

    try {
      const response = await authAxios("/settings/update-settings",{
        method: "POST",
        data: formData,
      });
      toast.success(response.data.message || "Settings updated successfully!");
    } catch (e) {
      toast.error(e.response?.data?.message || "Something went wrong!");
    }finally {
      setIsSavingChanges(false);
      setImageInfo(null);
    }reset({
      ...data,
      image: null,
    });

  };


  useEffect(() => {
    switch (hash) {
      case "#campaigns":
        setActiveTab("campaigns");
        break;
      case "#automations":
        setActiveTab("automations");
        break;
      default:
        setActiveTab("campaigns");
        break;
    }
  }, [hash]);

  return (
    <div className="mt-5 bg-white rounded-lg p-8">
      <form onSubmit={handleSubmit(submitter)} encType="multipart/form-data">
        <div className="flex justify-between items-center pb-7">
          <div>
            <h2 className="font-semibold text-xl mb-1">Default sender</h2>
            <p className="text-gray-500">
              This will be displayed in the "From" field of your recipient’s
              email client. We recommend using your own email and name.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex gap-3">
            <div className="flex-1">
              <CustomInput
                label={"Sender name"}
                type={"text"}
                name={"senderName"}
                register={register}
                placeholder={"Enter organization name"}
              />
            </div>
            <div className="flex-1">
              <CustomInput
                label={"Sender email"}
                type={"email"}
                name={"senderEmail"}
                register={register}
                placeholder={"Enter organization's website URL"}
              />
            </div>
          </div>
        </div>

        {/* Horizontal line */}
        <div className="h-[1px] bg-gray-200 dark:bg-gray-500 my-9"></div>

        <div className="flex justify-between items-center pb-5">
          <div>
            <h2 className="font-semibold text-xl mb-1">Add recipient’s name</h2>
          </div>
        </div>

        <Checkbox
          name="recipientName"
          register={register}
          label='If enabled, the recipient’s name will be displayed in the "To" field of their email client.'
          checked={recipientsNameValue}
        />

        {/* Horizontal line */}
        <div className="h-[1px] bg-gray-200 dark:bg-gray-500 my-9"></div>

        <div className="flex justify-between items-center pb-7">
          <div>
            <h2 className="font-semibold text-xl mb-1">Default logo</h2>
            <p className="text-gray-500">
              This logo will be displayed anywhere you have a logo placeholder
              in campaigns or landing pages.
            </p>
          </div>
        </div>

        {/* ????????????????????????? */}

        <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg">
                        <img
                          src={selectedImage}
                          className="w-16 h-16"
                          alt="Profile"
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                      </div>

                      <div>
                        <div className="">
                          <label
                            className="min-w-48 py-3 px-4 mt-3.5 cursor-pointer rounded-lg font-semibold hover:border hover:border-[#2F8481] hover:text-white hover:bg-[#2F8481] dark:bg-gray-900 dark:hover:text-gray-900 border border-[#2F8481] text-[#2F8481] transition-effect"
                            htmlFor="image"
                          >
                            Choose a Photo
                          </label>
                        </div>
                        <input
                          className="hidden text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={async(e) => {
                            //handling image preview and setValue here
                            const file = e.target.files[0];
                            if (file) {

                              if (file.size > 1024 * 1024 * 2) { // 2MB limit
                              toast.error("Image must be under 2MB");
                              return;
                            }
                              setSelectedImage(URL.createObjectURL(file));
                              setValue("image", file);
                              try {
                                // const dataUrl = await fileToDataURL(file);
                                // setValue("defaultLogoDataUrl", dataUrl);   //base64 string
                                setImageInfo({
                                  name: file.name,
                                  size: (file.size / 1024).toFixed(2), // KB
                                  type: file.type,
                                });
                              } catch (err) {
                                // console.error("Error converting file to data URL", err);
                                toast.error("Failed to read image");
                              }
                            } else {
                              // setSelectedImage(defaultImageUrl);
                              setValue("image", null);
                              setImageInfo(null); // clearing image info
                            }
                          }}
                        />
                        {errors.image && <p>{errors.image.message}</p>}
                      </div>
                    </div>
                    {/* Image Info */}
                        {imageInfo && (
                          <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                            <p><b>Name:</b> {imageInfo.name}</p>
                            <p><b>Size:</b> {imageInfo.size} KB</p>
                            <p><b>Type:</b> {imageInfo.type}</p>
                          </div>
                        )}


        {/* ????????????????????????? */}

        {/* Horizontal line */}
        <div className="h-[1px] bg-gray-200 dark:bg-gray-500 my-9"></div>

        <div className="flex justify-between items-center pb-7">
          <div>
            <h2 className="font-semibold text-xl mb-1">Campaign tracking options</h2>
            <p className="text-gray-500">
              Choose which metrics you would like to track in future campaigns.
            </p>
          </div>
        </div>

{/* 
        <div className="mb-6">
        <nav className="hidden md:flex tabs justify-start border-b-1 border-gray-200 dark:border-gray-500  gap-5 font-medium text-base text-gray-500 dark:text-gray-400">
          <a
            href="#campaigns"
            className={`py-3 px-1 cursor-pointer ${
              activeTab === "campaigns" ? "!text-black dark:!text-white  border-b-2 border-[#2F8481]" : ""
            }`}
          >
            Campaigns
          </a>
          <a
            href="#automations"
            className={`py-3 px-1 cursor-pointer ${
              activeTab === "automations" ? "!text-black dark:!text-white  border-b-2 border-[#2F8481]" : ""
            }`}
          >
            {" "}
            Automations
          </a>
        </nav>

        <div className="block md:hidden mb-4 mt-3 mx-2">
          <select
            className="w-full border px-3 py-2 rounded text-sm text-gray-700 dark:text-white dark:bg-dark-secondary"
            value={activeTab}
            onChange={(e) => {
              const tab = e.target.value;
              setActiveTab(tab); 
              switch (tab) {
                case "campaigns":
                  window.location.href = "#campaigns";
                  break;
                case "automations":
                  window.location.href = "#automations";
                  break;
                default:
                  break;
              }
            }}
          >
            <option value="campaigns">Campaigns</option>
            <option value="automations">Automations</option>
          </select>
        </div>
      </div> */}

      {/* {
        activeTab === "campaigns"
        ?
        ( */}
            <div className="campaignTracking">
          <div className="mb-5">
            <Checkbox
              name="campaignTrackOpens"
              register={register}
              label="Track opens"
              checked={campaignTrackOpensValue}
            />
            <p className="text-gray-500 -mt-3 text-sm">
            Track opens with an invisible beacon embedded in your emails.
            </p>
          </div>

          <div className="mb-5">
            <Checkbox
              name="campaignGoogleTracking"
              register={register}
              label="Google Analytics tracking"
              checked={campaignGoogleTrackingValue}
            />
            <p className="text-gray-500 -mt-3 text-sm">
            Track the links clicked in your campaign with Google Analytics.
            </p>
          </div>
        </div>
        {/* )
        :
        ( */}
        {/* <div className="automationTracking">
          <div className="mb-5">
            <Checkbox
              name="automationTrackOpens"
              register={register}
              label="Track opens"
              checked={automationTrackOpensValue}
            />
            <p className="text-gray-500 -mt-3 text-sm">
            Track opens with an invisible beacon embedded in your emails.
            </p>
          </div>
          <div className="mb-5">
            <Checkbox
              name="automationGoogleTracking"
              register={register}
              label="Google Analytics tracking"
              checked={automationGoogleTrackingValue}
            />
            <p className="text-gray-500 -mt-3 text-sm">
            Track the links clicked in your campaign with Google Analytics.
            </p>
          </div>
        </div>
        )

      } */}

      {/* Horizontal line */}
      <div className="h-[1px] bg-gray-200 dark:bg-gray-500 my-9"></div>

      <div className="flex justify-between items-center pb-7">
        <div>
          <h2 className="font-semibold text-xl mb-1">Social links</h2>
          <p className="text-gray-500">
            These links will be automatically used when you add social link blocks in emails and landing pages. 
           </p>
        </div>
      </div>

      <div className="mb-9">
        {socialLinks.length > 0 ? (
        socialLinks.map((row, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2 flex-wrap">
            <select
              className="border border-gray-300 rounded px-4 py-3"
              value={row.handle}
              onChange={e => handleSocialChange(idx, "handle", e.target.value)}
            >
              {socialNetworks.map(net => (
                <option key={net} value={net}>{net}</option>
              ))}
            </select>
            <input
              className="border border-gray-300 rounded px-4 py-3 flex-1"
              type="text"
              value={row.url}
              onChange={e => handleSocialChange(idx, "url", e.target.value)}
              placeholder="Enter url"
            />
            <button
              type="button"
              className="p-2"
              onClick={() => handleDeleteSocialLink(idx)}
            >
              <span role="img" aria-label="delete">🗑️</span>
            </button>
          </div>
        ))
        ) : null 
        }
        
        <button
          type="button"
          className="bg-[#2F8481] text-white px-3 py-1 rounded mt-2"
          onClick={handleAddSocialLink}
        >
          Add new social link
        </button>
      </div>

      <Checkbox
        name="forceUpdateSocialLinks"
        register={register}
        label="Force-update social links in drafts, ongoing automation emails, templates and published landing pages."
        checked={forceUpdateSocialLinksValue}
      />

      

      {/* Horizontal line */}
      <div className="h-[1px] bg-gray-200 dark:bg-gray-500 my-9"></div>

        <div className="flex justify-between items-center pb-7">
          <div>
            <h2 className="font-semibold text-xl mb-1">Company details and unsubscribe disclaimer</h2>
            <p className="text-gray-500">
            This information will be automatically embedded in your email and landing page footers. 
            </p>
          </div>
        </div>

        {/* <div className="border border-gray-1" ref={quillRef} /> */}

        <div className="mb-8">
          <h2 className="font-semibold mb-2">Company details</h2>
          <div
            ref={companyDetailsQuillRef}
            style={{ minHeight: 100, background: "#fff" }}
          />
          <p className="text-gray-500 mb-3 text-sm">
          Add your company profile information. 
          </p>
        </div>

        <Checkbox
          name="forceUpdateCompanyDetails"
          register={register}
          label="Force-update company details in drafts, ongoing automation emails, templates and published landing pages"
          checked={forceUpdateCompanyDetailsValue}
        />

        <div className="mb-8 mt-8">
          <h2 className="font-semibold mb-2">Email unsubscribe Disclaimer</h2>
          <div
            ref={unsubscribeDisclaimerQuillRef}
            style={{ minHeight: 100, background: "#fff" }}
          />
          <p className="text-gray-500 mb-3 text-sm">
          Inform subscribers about your opt-out process. 
          </p>
        </div>

        <div>
            <CustomInput
                label={"Email unsubscribe link text"}
                type={"text"}
                name={"unsubscribeLinkText"}
                register={register}
            />
            <p className="text-gray-500 -mt-2 mb-3 text-sm">
            Add a call to action text that links to the unsubscribe page. 
            </p>

            <Checkbox
                name="forceUpdateUnsubscribeDisclaimer"
                register={register}
                label="Force-update the unsubscribe link text in drafts, ongoing automation emails and templates."
                checked={forceUpdateUnsubscribeDisclaimerValue}
            />
        </div>

        <div>
            <CustomInput
                label={"Email preference link text"}
                type={"text"}
                name={"emailPreferenceLinkText"}
                register={register}
            />
            <p className="text-gray-500 -mt-2 mb-3 text-sm">
            Add a call to action text that links to the preference page. 
            </p>

            <Checkbox
                name="forceUpdateEmailPreferenceLinkText"
                register={register}
                label="Force-update the preference link text in drafts, ongoing automation emails and templates."
                checked={forceUpdateEmailPreferenceLinkTextValue}
            />
        </div>

        {/* Horizontal line */}
      <div className="h-[1px] bg-gray-200 dark:bg-gray-500 my-9"></div>


        <div className="flex justify-end mb-6">
          <Button 
          label={"Save Changes"} 
          styleClass="cursor-pointer w-full py-2.5 px-4 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] text-lg dark:hover:text-[#2F8481] dark:bg-[#2F8481] dark:text-gray-900 dark:hover:bg-gray-900 border border-[#2F8481] transition-effect"
          loading={isSavingChanges} />
        </div>
      </form>
    </div>
  );
};

export default DefaultSettings;
