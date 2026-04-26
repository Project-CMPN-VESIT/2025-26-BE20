import { CustomInput } from "../../../components/form-elements/CustomInput";
import { Button } from "../../../components/form-elements/Button";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import animation from "../../../assets/auth-animation.json"
import logo from "../../../assets/light-logo.png";

import { emailValidation, passwordValidation } from "../../../utils/validations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guestAxios } from "../../../config/guestAxios";
import toast from "react-hot-toast";

function Login() {
  const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        email: "",
        password: "",
    },
  });

  const onSubmit = async(data) => {
    setLoading(true);

    console.log(data);
    try{
          const response  =await guestAxios("/auth/login",{
              method:"POST",
              data:data
          })
          console.log(response);
          if(response.status===200){
              console.log(response);
    
              navigate('/otp', {
                state: {
                  cameFrom: "login",
                  email: data.email
                }
              });
          }
      }catch(e){
          if(e.response){
              console.log(e.response.data.data)
              toast.error(e.response.data.message || "Something went wrong!");

          }
      }
      finally{
          setLoading(false)
      }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-secondary dark:bg-gray-900">
      {/* Sidebar */}

      <div className="md:flex md:w-1/3 bg-secondary dark:bg-gray-900 items-center justify-center p-8 transition-effect">
        <div className="flex flex-col items-center justify-center text-center w-full">

          <img src={logo} alt="" className="w-1/2"/>

          <div className="hidden md:block md:w-65 md:h-65 md:mb-6">
            <Lottie animationData={animation} loop={true} />
          </div>

          <h1 className="text-xl lg:text-3xl font-semibold mb-5 leading-snug text-gray-800 dark:text-gray-100">
            Automate Your <span className="text-primary font-bold">Email Marketing</span><br />
            Grow Your <span className="text-primary font-bold">Business</span>.
          </h1>

    <p className="text-base lg:text-lg text-[#303030] mb-8 font-light dark:text-gray-400">
      Send campaigns, segment audiences, and track results with ease.
    </p>
  </div>
</div>

      {/* Form Panel */}
      <div className={`lg:h-auto md:h-auto md:w-2/3 flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-6 lg:mb-8 lg:rounded-bl-4xl lg:shadow-xl md:mb-5 rounded-bl-2xl md:shadow-sm relative `}>
        <div className="w-full max-w-2xl">

          <div role="status" className={`rounded-bl-2xl absolute inset-0 flex items-center justify-center z-10 bg-white ${loading ? 'opacity-70' : '' }`} style={{ display: loading ? 'flex' : 'none' }}>
              <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-7 text-center text-gray-800 dark:text-gray-100">
                  Welcome to <span className="text-primary">MailedIt</span>
                </h1>
                <p className="md:text-sm mb-10 text-center text-gray-600 dark:text-gray-400" > 
                  Sign In to your account and start sending campaigns, segment audiences, track results and much more with ease.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:gap-4 md:gap-3 sm:gap-1">
                  <CustomInput 
                  label="Email" 
                  type="email" 
                  name="email" 
                  placeholder="e.g., user@email.com" 
                  register={register} 
                  validations={emailValidation} 
                  errors={errors.email} 
                  labelStyleClass="text-gray-900 text-lg dark:text-gray-300"
                  dataTestId="login-emai" 
                  />
                  
                  <div className="flex items-center gap-2 relative">
                    <div className="flex-1">
                      <CustomInput
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Minimum 8 characters" 
                      register={register}
                      validations={passwordValidation} 
                      errors={errors.password}
                      labelStyleClass="text-gray-900 text-lg dark:text-gray-300"
                      dataTestId="login-password"
                    />
                    </div>
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-gray-900 dark:text-gray-300 transition-effect absolute top-9 right-3"
                    dataTestId="login-show-hide-password-button"
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

                </div>
                <div className="text-left mt-2">
               <a href="#" onClick={(e)=>{
                e.preventDefault();
                navigate('/forgot-password');
               }} className="text-primary hover:text-[#2c514f] text-sm font-medium transition duration-300"
               data-test-id="forgot-password-link">
                 Forgot password?
               </a>
             </div>
                
                <div className="mt-6">
                <Button 
                  type="submit" 
                  label="Login" 
                  loading={loading}
                  isFullWidth = 'true'
                  styleClass="cursor-pointer w-full py-2.5 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg" 
                  dataTestId="login-submit-otp-button"
                  />
                  
                </div>
                <div className="text-center mt-6 text-gray-700 dark:text-gray-300">
               Don't have an account?{" "}
               <a onClick={(e)=>{
                e.preventDefault();
                navigate('/register');
               }} className="text-primary hover:text-[#2c514f] font-bold transition duration-300 cursor-pointer"
               data-test-id="signup-link">
                 Sign Up
               </a>
             </div>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;