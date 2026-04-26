import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "../../components/form-elements/CustomInput";
import { Button } from "../../components/form-elements/Button";
import axios from "axios";
import { RadioButton } from "../../components/form-elements/RadioButton";
import { getCookie } from "../../utils/cookie-helper";
import { LONG_LIVE_TOKEN } from "../../constants/constants";
import TopBar from "../dashboard/components/Topbar";
import SideBar from "../dashboard/components/Sidebar";
import { useFetchAuth } from "../../hooks/useFetchAuth";
import authAxios from "../../config/AuthAxios";
import toast from "react-hot-toast";
import { useAuth} from "../../context/AuthContext";



const getInitialDefaultImageUrl = (firstName = "User", lastName = "") =>
  `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=16&background=2F8481&color=fff`;

function ProfilePage({ darkMode, setDarkMode }) {
  console.log("Dark Mode:", setDarkMode);
  // const {
  //   data: userData,
  //   error: userDataError,
  //   loading: userDataLoading,
  // } = useFetchAuth("/auth/get-user-details");
  const { user, updateUser } = useAuth();

  const [isSavingChanges, setIsSavingChanges] = useState(false);
  const [isSavingPasswordChanges, setIsSavingPasswordChanges] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    getInitialDefaultImageUrl()
  );
  const [imageInfo, setImageInfo] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      image: null,
    },
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    watch: watchPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: {
      disabledPassword: "abcd1234",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const newPassword = watch("newPassword");
  const currentPassword = watch("currentPassword");
  const confirmNewPassword = watch("confirmNewPassword");
  const watchedMode = watch("mode", darkMode ? "dark" : "light");

  useEffect(() => {
    if (!user) return;

    reset({
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      email: user.email || "",
    });

    setSelectedImage(
      user.profile_image ||
      getInitialDefaultImageUrl(user.first_name, user.last_name)
    );
  }, [user, reset]);


  const handleSaveChanges = async (data) => {
    console.log("submitting data", data);
    if (data.image || data.firstName || data.lastName) {
      var formData = new FormData();

      if (data.image && data.image instanceof File) {
        formData.append("profile_image", data.image);
      }
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      console.log(formData);

      setIsSavingChanges(true);
      // console.log('Saving changes:', data);

      try {
        const response = await authAxios("/auth/update-user", {
          method: "POST",
          data: formData,
        });
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          const updatedUser = response.data.data.user;
          updateUser(updatedUser);
          toast.success(response.data.message);
        }
      } catch (e) {
        if (e.response) {
          console.log(e.response.data.data);
          toast.error(e.response.data.message);
        }
      } finally {
        setIsSavingChanges(false);
        setImageInfo(null);
      }
      reset({
        ...data,
        image: null,
      });
    }
  };

  const handlePasswordChange = async (data) => {
    if (data.currentPassword && data.newPassword && data.confirmNewPassword) {
      setIsSavingPasswordChanges(true);
      try {
        const passwordResponse = await authAxios(
          "/auth/reset-password-for-logged-in-user",
          {
            method: "PUT",
            data: {
              old_password: data.currentPassword,
              new_password: data.newPassword,
              password_confirmation: data.confirmNewPassword,
            },
          }
        );
        console.log("Password Change Response:", passwordResponse);
        if (passwordResponse.status === 200) {
          toast.success(passwordResponse.data.message);
          resetPassword({
            ...data,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          });
          setShowPasswordFields(false); // Hide password fields again
        }
      } catch (e) {
        if (e.response) {
          console.log(e.response.data.data);
          toast.error(e.response.data.message);
        }
      } finally {
        setIsSavingPasswordChanges(false);
      }
    }
  };

  return (
        <div className="container-fluid w-full">
          <div className="bg-gray-100 dark:bg-gray-800 px-8 w-full content-center">
            <div className="my-10">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-200">
                My profile
              </h2>
            </div>

            <div className="mx-auto bg-white dark:bg-dark-secondary shadow-sm rounded-md p-8 my-10">
              <div className="max-w-6xl">
                <form
                  onSubmit={handleSubmit(handleSaveChanges)}
                  encType="multipart/form-data"
                >
                  {/* Profile photo */}
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                      Profile photo
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                      You can upload your own photo or keep your default profile
                      photo.
                    </p>
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
                          onChange={(e) => {
                            //handling image preview and setValue here
                            const file = e.target.files[0];
                            if (file) {

                              if (file.size > 1024 * 1024 * 2) { // 2MB limit
                              toast.error("Image must be under 2MB");
                              return;
                            }
                              setSelectedImage(URL.createObjectURL(file));
                              setValue("image", file);
                              setImageInfo({
                                name: file.name,
                                size: (file.size / 1024).toFixed(2), // KB
                                type: file.type,
                              });
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
                  </section>

                  {/* Basic Info details */}
                  <section>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-5">
                      Basic information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CustomInput
                        label="First name"
                        type="text"
                        name="firstName"
                        register={register}
                        errors={errors.firstName}
                        labelStyleClass="text-gray-700 dark:text-gray-400"
                      />
                      <CustomInput
                        label="Last name"
                        type="text"
                        name="lastName"
                        register={register}
                        errors={errors.lastName}
                        labelStyleClass="text-gray-700 dark:text-gray-400"
                      />
                    </div>
                  </section>

                  {/* Horizontal line */}
                  <div className="h-[1px] bg-gray-200 dark:bg-gray-500 my-9"></div>

                  {/* Submit button */}
                  <section className="mx-auto flex justify-end mb-5">
                    <Button
                      type="submit"
                      label="Save changes"
                      loading={isSavingChanges}
                      styleClass="cursor-pointer w-full py-2.5 px-4 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] text-lg dark:hover:text-[#2F8481] dark:bg-[#2F8481] dark:text-gray-900 dark:hover:bg-gray-900 border border-[#2F8481] transition-effect"
                    />
                  </section>
                </form>
              </div>
            </div>

            <div className="mx-auto bg-white dark:bg-dark-secondary shadow-sm rounded-md p-8 my-10">
              <div className="max-w-6xl">
                {/* Login Details */}
                <section>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-5">
                    Login details
                  </h3>
                  <fieldset disabled>
                    <CustomInput
                      label="Email address"
                      type="email"
                      name="email"
                      register={register}
                      errors={errors.email}
                      labelStyleClass="text-gray-700 dark:text-gray-400"
                      inputStyleClass="cursor-not-allowed bg-gray-50 !text-gray-500 dark:bg-gray-800 dark:!text-gray-400"
                    />
                  </fieldset>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mt-3">
                    {showPasswordFields ? (
                      <form
                        onSubmit={handlePasswordSubmit(handlePasswordChange)}
                      >

                        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                        <div className="flex items-center gap-2 relative">
                          <div className="flex-1">
                            <CustomInput 
                              label="Current Password"
                          type={showCurrentPassword ? "text" : "password"} 
                          name="currentPassword"
                          register={passwordRegister}
                          validations={{
                            required: "Current password is required",
                            minLength: {
                              value: 8,
                              message:
                                "Password must be at least 8 characters long",
                            },
                          }}
                          errors={passwordErrors.currentPassword}
                          labelStyleClass="text-gray-700 dark:text-gray-400"
                            />

                          </div>
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="cursor-pointer text-gray-900 dark:text-gray-300 transition-effect absolute top-9 right-3"
                            data-test-id="user-show-hide-password-button"
                          >{!showCurrentPassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                            
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            }</button>
                        </div>

                        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}



                        

                        <div className="flex items-center gap-2 relative">
                          <div className="flex-1">
                            <CustomInput 
                              label="New Password"
                          type={showNewPassword ? "text" : "password"} 
                          name="newPassword"
                          register={passwordRegister}
                          validations={{
                            required: "New password is required",
                            minLength: {
                              value: 8,
                              message:
                                "Password must be at least 8 characters long",
                            },
                            validate: (value) =>
                              value !== watchPassword("currentPassword") ||
                              "New password must be different from current password",
                          }}
                          errors={passwordErrors.newPassword}
                          labelStyleClass="text-gray-700 dark:text-gray-400"
                            />

                          </div>
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="cursor-pointer text-gray-900 dark:text-gray-300 transition-effect absolute top-9 right-3"
                            data-test-id="user-show-hide-password-button"
                          >{!showNewPassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                            
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            }</button>
                        </div>


                        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                        <div className="flex items-center gap-2 relative">
                          <div className="flex-1">
                            <CustomInput 
                              label="Confirm New Password"
                          type={showConfirmPassword ? "text" : "password"} 
                          name="confirmNewPassword"
                          register={passwordRegister}
                          validations={{
                            required: "Confirm new password is required",
                            validate: (value) =>
                              value === watchPassword("newPassword") ||
                              "The passwords do not match",
                          }}
                          errors={passwordErrors.confirmNewPassword}
                          labelStyleClass="text-gray-700 dark:text-gray-400"
                            />

                          </div>
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="cursor-pointer text-gray-900 dark:text-gray-300 transition-effect absolute top-9 right-3"
                            data-test-id="user-show-hide-password-button"
                          >{!showConfirmPassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                            
                            : 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            }</button>
                        </div>

                        {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

                        {/* Horizontal line */}
                        <div className="h-[1px] bg-gray-200 dark:bg-gray-500 my-9"></div>


                        <div className="flex justify-end space-x-4">

                          <Button
                            type="button"
                            label="Cancel"
                            onClick={() => {
                                setShowPasswordFields(false)
                                resetPassword({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmNewPassword: "",
                                  disabledPassword: "abcd1234",
                                })
                              }
                            }
                            styleClass="cursor-pointer w-full py-2.5 px-4 rounded-lg font-semibold bg-white border border-[#2F8481] text-[#2F8481] font-bold rounded-full hover:bg-[#2F8481] hover:text-white text-lg dark:hover:text-gray-900 dark:bg-gray-900 dark:text-[#2F8481] dark:hover:bg-[#2F8481] border border-[#2F8481] transition-effect"
                          />
                          <Button
                            type="submit"
                            label="Change password"
                            loading={isSavingPasswordChanges}
                            styleClass="cursor-pointer w-full py-2.5 px-4 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] text-lg dark:hover:text-[#2F8481] dark:bg-[#2F8481] dark:text-gray-900 dark:hover:bg-gray-900 border border-[#2F8481] transition-effect"
                          />
                        </div>
                      </form>
                    ) : (
                      <div className="flex sm:pb-5 md:pb-0 gap-2 lg:pb-0">
                        <fieldset disabled className="w-full">
                          <CustomInput
                            label="Current Password"
                            type="password"
                            name="disabledPassword"
                            register={passwordRegister}
                            labelStyleClass="text-gray-700 dark:text-gray-400"
                            inputStyleClass="cursor-not-allowed bg-gray-50 !text-gray-500 dark:bg-gray-800 dark:!text-gray-400"
                          />
                        </fieldset>
                        <div className="flex items-center justify-center">
                          <Button
                            type="button"
                            label="Edit"
                            onClick={() => setShowPasswordFields(true)}
                            styleClass="py-3 px-4 mt-3.5 cursor-pointer rounded-lg font-semibold bg-white hover:border hover:border-[#2F8481] text-[#2F8481] hover:bg-[#2F8481] hover:text-white dark:hover:text-gray-900 dark:bg-gray-900 dark:text-[#2F8481] dark:hover:bg-[#2F8481] border border-[#2F8481] text-[#2F8481] transition-effect"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>

            {/* <div className="mx-auto bg-white dark:bg-dark-secondary shadow-sm rounded-md p-8 my-10">
              <div className="max-w-6xl">
                <section>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-5">
                    Theme
                  </h3>
                  <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li
                      className={`w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 cursor-pointer ${
                        watchedMode === "light"
                          ? "bg-gray-100 dark:bg-gray-800"
                          : ""
                      }`}
                      onClick={() => {
                        setDarkMode(false);
                        setValue("mode", "light");
                      }}
                    >
                      <div className="flex items-center p-5">
                        <RadioButton
                          name="mode" // ALL radio buttons in this group must have the SAME name
                          value="light" // Unique value for this radio
                          label="Light"
                          register={register}
                          checked={watchedMode === "light"} // Control its checked state
                          labelClass="cursor-pointer"
                        />
                      </div>
                    </li>
                    <li
                      className={`w-full border-b border-gray-200 rounded-b-lg dark:border-gray-600 cursor-pointer ${
                        watchedMode === "light"
                          ? "bg-gray-100 dark:bg-gray-800"
                          : ""
                      }`}
                      onClick={() => {
                        setDarkMode(true);
                        setValue("mode", "dark");
                      }}
                    >
                      <div className="flex items-center p-5">
                        <RadioButton
                          name="mode" // ALL radio buttons in this group must have the SAME name
                          value="dark" // Unique value for this radio
                          label="Dark"
                          register={register}
                          checked={watchedMode === "dark"} // Controlling its checked state
                          labelClass="cursor-pointer"
                        />
                      </div>
                    </li>
                  </ul>
                </section>
              </div>
            </div> */}
          </div>
        </div>
  );
}

export default ProfilePage;
