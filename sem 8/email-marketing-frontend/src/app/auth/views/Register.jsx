import { CustomInput } from "../../../components/form-elements/CustomInput";
import { Button } from "../../../components/form-elements/Button";
import { useForm, Controller, set } from "react-hook-form";
import { TextArea } from "../../../components/form-elements/TextArea";
import Lottie from "lottie-react";
import animation from "../../../assets/auth-animation.json"
import logo from "../../../assets/light-logo.png";
// import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { guestAxios } from "../../../config/guestAxios";
import {
  addressValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  phoneNumberValidation,
  zipValidation,
} from "../../../utils/validations";
import toast from "react-hot-toast";

function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    control,
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      organization: {
        name: "",
        email: "",
        phone_number: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },
    },
  });

  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger([
        "user.first_name",
        "user.last_name",
        "user.email",
        "user.password",
        "user.password_confirmation",
      ]);
    } else if (currentStep === 2) {
      isValid = await trigger([
        "organization.name",
        "organization.email",
        "organization.phone_number",
        "organization.address",
        "organization.zip",
      ]);
    }

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };


  const postalCodeCheckAndSubmitter = async (data) => { 
    const postalCode = data.organization.zip;
    setLoading(true);
    try{ 
      const response = await fetch(`https://api.postalpincode.in/pincode/${postalCode}`); 
      const result = await response.json(); 
      if (result[0].Status === "Success") { 
        const postOffice = result[0].PostOffice[0];
        const updatedData = { 
          user: {
            ...data.user,
          },
          organization: {
            name: data.organization.name,
            email: data.organization.email,
            phone_number: parseInt(data.organization.phone_number),
            address: data.organization.address,
            zip: data.organization.zip.toString(),
            city: postOffice.District,
            state: postOffice.State,
            country: postOffice.Country,
          },
        } 
        console.log(updatedData); 
        onSubmit(updatedData) 
      }
      else{ 
        setError("organization.zip", {
          type: "manual",
          message: "Invalid postal code",
        });
        setLoading(false);
      } 
    }catch(error){ 
      console.error("Error fetching postal code data:", error);
      toast.error("Error fetching postal code data.")
      setLoading(false);
    } 
  };

  const onSubmit = async(data) => {
    setLoading(true);
    try{
      const response  = await guestAxios("/auth/signup",{
          method:"POST",
          data:data,
      })
      console.log(response);
      if(response.status===200){
          //request successful
          toast.success(response.data.message || "OTP sent to your email");
          console.log(response);

          navigate('/otp', {
            state: {
              cameFrom: "register",
              email: data.user.email
            }
          });
      }
  }catch(e){
      if(e.response){
          const errors = e.response.data.errors;
          const firstError = Object.values(errors)?.[0]?.[0];
          console.log("errors:",firstError);
          toast.error(firstError || e.response.data.message || "Something went wrong!");
      }
  }
  finally{
      setLoading(false)
  }
  };
  console.log("errors",errors);

  return (
    <div className={`flex flex-col md:flex-row min-h-screen bg-secondary dark:bg-gray-900`}>
      {/* Sidebar */}

      <div className="md:flex md:w-1/3 bg-secondary dark:bg-gray-900 items-center justify-center p-8 transition-effect">
        <div className="flex flex-col items-center justify-center text-center w-full">

          <img src={logo} alt="" className="w-1/2"/>

          <div className="hidden md:block md:w-65 md:h-65 md:mb-6">
            <Lottie animationData={animation} loop={true} />
          </div>

          <h1 className="text-xl lg:text-3xl font-semibold mb-5 leading-snug text-gray-800 dark:text-gray-100">
            Automate Your <span className="text-primary-900 font-bold">Email Marketing</span><br />
            Grow Your <span className="text-primary font-bold">Business</span>.
          </h1>

          <p className="text-base lg:text-lg text-[#303030] mb-8 font-light dark:text-gray-400">
            Send campaigns, segment audiences, and track results with ease.
          </p>

            <Button
              type="button"
              label="Explore Features →"
              styleClass="cursor-pointer py-3 px-8 text-[#F4E8D4] bg-[#2F8481] font-bold rounded-full hover:bg-[#236361] hover:shadow-md transition-effect text-lg"
            />
        </div>
      </div>

      {/* Form Panel */}
      <div className={`lg:h-auto md:h-auto md:w-2/3 flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 lg:mb-8 lg:rounded-bl-4xl lg:shadow-xl md:mb-5 rounded-bl-2xl md:shadow-sm relative `}>
        <div className="w-full max-w-2xl">


          {/* <div role="status" className={`rounded-bl-2xl absolute inset-0 flex items-center justify-center overflow-y-auto z-10 bg-white ${loading ? 'opacity-70' : '' }`} style={{ display: loading ? 'flex' : 'none' }}>
              <svg aria-hidden="true" class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div> */}


          <form onSubmit={handleSubmit(postalCodeCheckAndSubmitter)} className="space-y-8" autoComplete="off" noValidate>
          {/* <AnimatePresence mode="wait"> */}
            {currentStep === 1 && (
              // <motion.div
              // key="step1"
              // initial={{ opacity: 0, x: 50 }}
              // animate={{ opacity: 1, x: 0 }}
              // exit={{ opacity: 0, x: -50 }}
              // transition={{ duration: 0.3 }}
              // >
              <div className="sm:p-5 md:p-0 lg:p-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-7 text-center text-gray-800 dark:text-gray-100">
                Welcome to <span className="text-primary">MailedIt</span>
                </h1>
                <p className="md:text-sm mb-10 text-center text-gray-600 dark:text-gray-400"> 
                  Register to create your first account and start sending campaigns, segment audiences, track results and much more with ease.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomInput 
                  label="First Name" 
                  type="text" 
                  name="user.first_name" 
                  placeholder="Enter first name" 
                  register={register} 
                  validations={firstNameValidation} 
                  errors={errors.user?.first_name} 
                  labelStyleClass="text-gray-900 text-lg dark:text-gray-300" 
                  dataTestId="user-first-name"
                  />

                  <CustomInput 
                  label="Last Name" 
                  type="text" 
                  name="user.last_name" 
                  placeholder="Enter last name" 
                  register={register} 
                  validations={lastNameValidation} 
                  errors={errors.user?.last_name} 
                  labelStyleClass="text-gray-900 text-lg dark:text-gray-300" 
                  dataTestId="user-last-name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                  <CustomInput 
                  label="Email" 
                  type="email" 
                  name="user.email" 
                  placeholder="e.g., user@email.com" 
                  register={register} 
                  validations={emailValidation} 
                  errors={errors.user?.email} 
                  labelStyleClass="text-gray-900 text-lg dark:text-gray-300"
                  dataTestId="user-email"
                  />
                  <div className="flex items-center gap-2 relative">
                    <div className="flex-1">
                      <CustomInput 
                        label="Password" 
                        type={showPassword ? "text" : "password"} 
                        name="user.password" 
                        placeholder="Minimum 8 characters" 
                        register={register} 
                        validations={passwordValidation} 
                        errors={errors.user?.password} 
                        labelStyleClass="text-gray-900 text-lg dark:text-gray-300" 
                        dataTestId="user-password"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer text-gray-900 dark:text-gray-300 transition-effect absolute top-9 right-3"
                      data-test-id="user-show-hide-password-button"
                    >{!showPassword ?
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                      
                     : 
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                     }</button>
                  </div>
                  <div className="flex items-center gap-2 relative">
                    <div className="flex-1">
                      <CustomInput
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      name="user.password_confirmation"
                      placeholder="confirm password"
                      register={register}
                      dataTestId="user-confirm-password"
                      validations={{
                        ...passwordValidation,
                        validate: (value) => {
                          if (value !== watch("user.password")) return "Passwords do not match";
                          return true;
                        }                
                      }}
                      errors={errors.user?.password_confirmation}
                      labelStyleClass="text-gray-900 text-lg dark:text-gray-300"
                    />
                    </div>
                    <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer text-gray-900 dark:text-gray-300 transition-effect absolute top-9 right-3"
                    data-test-id="user-show-hide-confirm-password-button"
                  >{!showConfirmPassword ?
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                     : 
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                   }</button>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button 
                  type="button" 
                  onClick={handleNext} 
                  label="Next" 
                  isFullWidth = 'true'
                  dataTestId="next-button"
                  styleClass="cursor-pointer w-full py-2.5 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg"/>
                  
                </div>
                <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
                  Already have an account? <a onClick={(e)=>{
                    e.preventDefault();
                    navigate('/login');
                  }} className="text-primary font-semibold hover:underline cursor-pointer"
                  data-test-id="login-link">Log In</a>
                </div>
              </div>
              // </motion.div>
            )}

            {currentStep === 2 && (
            //   <motion.div
            //   key="step2"
            //   initial={{ opacity: 0, x: 50 }}
            //   animate={{ opacity: 1, x: 0 }}
            //   exit={{ opacity: 0, x: -50 }}
            //   transition={{ duration: 0.3 }}
            // >
              <div className="space-y-6 md:h-auto lg:h-auto sm:p-5 md:p-0 lg:p-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-7 text-center text-gray-800 dark:text-gray-100">
                  Add Your
                  <span className="text-primary"> Organization </span>
                  Details
                </h2>
                <p className="md:text-sm text-center text-gray-600 dark:text-gray-400 mb-8">
                  This information is used in your email footers and helps ensure your emails comply with anti-spam laws and global email regulations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                  <CustomInput 
                  label="Name" 
                  type="text" name="organization.name" 
                  placeholder="e.g., OrgName" 
                  register={register} 
                  dataTestId="org-name"
                  validations={{
                    required: 'Org name is required',
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Only alphabets are allowed"
                    }
                  }} 
                  errors={errors.organization?.name} 
                  labelStyleClass="ttext-gray-900 text-lg dark:text-gray-300" 
                  />
                  <CustomInput 
                  label="Email" 
                  type="email" 
                  name="organization.email" 
                  placeholder="e.g., admin@org.com" 
                  dataTestId="org-email"
                  register={register} 
                  validations={emailValidation} 
                  errors={errors.organization?.email} 
                  labelStyleClass="text-gray-900 text-lg dark:text-gray-300" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 md:gap-3 sm:gap-1">
                  <CustomInput 
                  label="Phone" 
                  type="number" 
                  name="organization.phone_number" 
                  placeholder="e.g., 1234567890" 
                  dataTestId="org-phone-number"
                  register={register} 
                  validations={phoneNumberValidation} 
                  errors={errors.organization?.phone_number} 
                  labelStyleClass="text-gray-900 text-lg dark:text-gray-300" 
                  /> 

                  <CustomInput
                    label="Postal Code"
                    name="organization.zip"
                    placeholder="e.g., 560001"
                    register={register}
                    validations={zipValidation}
                    errors={errors.organization?.zip}
                    onChange={() =>
                      setError("organization.zip", { message: "" })
                    }
                    dataTestId="org-postal-code"
                  />
                </div>


                <TextArea 
                label="Address" 
                name="organization.address" 
                placeholder="e.g., 123, Main Street, Maharashtra" 
                dataTestId="org-address"
                register={register} 
                validations={addressValidation} 
                errors={errors.organization?.address} 
                rows={2} 
                labelStyleClass={"text-gray-900 text-lg dark:text-gray-300"}
                />

                <div className="flex justify-between mt-8 sm:pb-5 md:pb-0 lg:pb-0">
                  <Button 
                  type="button" 
                  onClick={handleBack} 
                  label="Back" 
                  styleClass="cursor-pointer px-6 py-2.5 rounded-lg font-semibold hover:border hover:border-[#2F8481] hover:text-white hover:bg-[#2F8481] font-bold rounded-full bg-white border border-[#2F8481] text-[#2F8481] transition-effect text-lg me-4" 
                  dataTestId="back-button"
                  />
                  <Button 
                  type="submit" 
                  label="Register" 
                  loading={loading} 
                  isFullWidth = 'true'
                  styleClass="cursor-pointer w-full py-2.5 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg" 
                  dataTestId="register-send-otp-button"
                  />
                </div>
                <div className="text-center text-sm mt-4 text-gray-700 dark:text-gray-300">
                  You can edit these details later from Account Settings. 
                </div>
              </div>
              // </motion.div>
            )}
            {/* </AnimatePresence> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;