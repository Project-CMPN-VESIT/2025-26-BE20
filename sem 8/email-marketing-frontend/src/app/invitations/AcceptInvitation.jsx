import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from '../../assets/auth-animation.json';
import logo from '../../assets/light-logo.png';
import { CustomInput } from '../../components/form-elements/CustomInput';
import { Button } from '../../components/form-elements/Button';
import { passwordValidation } from '../../utils/validations';
import { guestAxios } from '../../config/guestAxios';
import toast from 'react-hot-toast';

const AcceptInvitation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();    
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [email, setEmail] = useState(null);
  const [validating, setValidating] = useState(true);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid invitation link");
      navigate("/login");
      return;
    }

    const validateToken = async () => {
      try {
        const res = await guestAxios.get(`/invitation/${token}/valid`);
        setEmail(res.data.data.email);
      } catch (e) {
        toast.error(e.response?.data?.message || "Invitation link expired");
        navigate("/login");
      } finally {
        setValidating(false);
      }
    };
    validateToken();

  }, [token, navigate]);
  
      const onSubmit = async (data) => {
      setLoading(true);
      try {
        const response = await guestAxios('/invitation/accept-invitation', {
          method: 'POST',
          data: {
            token,
            user: {
              first_name: data.first_name,
              last_name: data.last_name,
              password: data.newPassword,
              password_confirmation: data.confirmPassword,
            }
          }
        });

        toast.success("OTP sent to your email");

        navigate('/otp', {
          state: {
            email: email,
            cameFrom: 'invitation'
          }
        });

      } catch (e) {
        toast.error(e.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

  
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-secondary dark:bg-gray-900">
  
        <div className="md:flex md:w-1/3 bg-secondary dark:bg-gray-900 items-center justify-center p-8 transition-effect">
          <div className="flex flex-col items-center justify-center text-center w-full">
  
            <img src={logo} alt="" className="w-1/2"/>
  
            <div className="hidden md:block md:w-65 md:h-65 md:mb-6">
              <Lottie animationData={animation} loop={true} />
            </div>  
            <h1 className="text-xl lg:text-3xl font-semibold mb-5 leading-snug text-gray-800 dark:text-gray-100">
              Forgot your <span className="text-primary font-bold">Password?</span><br />
              We can help <span className="text-primary font-bold">you.</span>
            </h1>
            <p className="text-base lg:text-lg text-[#303030] mb-8 font-light dark:text-gray-400">
              Enter your new password and we'll reset your password for your Email address.
            </p>
          </div>
        </div>
  
        <div className="lg:h-auto md:h-auto h-full md:w-2/3 flex flex-col items-center justify-center bg-white dark:bg-gray-800 overflow-y-auto p-6 sm:p-10 lg:mb-8 lg:rounded-bl-4xl lg:shadow-xl md:mb-5 rounded-bl-2xl md:shadow-sm">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
              Welcome to <span className="text-primary">MailedIt</span>
            </h1>
              <p className="md:text-sm mb-10 text-center text-gray-600 dark:text-gray-400"> 
                  Register to create your first account and start sending campaigns, segment audiences, track results and much more with ease.
              </p>
  
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <CustomInput
                label="First Name"
                name="first_name"
                register={register}
                validations={{ required: "First name is required" }}
                errors={errors.first_name}
              />
              </div>

              <div className='mt-2'>
                <CustomInput
                label="Last Name"
                name="last_name"
                register={register}
                validations={{ required: "Last name is required" }}
                errors={errors.last_name}
              />
              </div>
  
              <div className="flex items-center gap-2 relative">
                <div className="flex-1">
                  <CustomInput 
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="password"
                    register={register} 
                    validations={passwordValidation} 
                    errors={errors.newPassword}
                    labelStyleClass="text-gray-900 text-lg dark:text-gray-300"
                    dataTestId="reset-new-password"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-gray-900 dark:text-gray-300 transition-effect absolute top-9 right-3"
                  dataTestId="reset-new-password-show-hide-button"
                >{!showPassword ?
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
              <div className="flex items-center gap-2 relative">
                <div className="flex-1">
                  <CustomInput
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="confirm password"
                  register={register}
                  validations={{
                  ...passwordValidation,
                  validate: (value) => {
                    if (value !== watch("newPassword")) return "Passwords do not match";
                    return true;
                  }                
                }}
                errors={errors.confirmPassword}
                labelStyleClass="text-gray-900 text-lg dark:text-gray-300"
                dataTestId="reset-confirm-password"
                />
                </div>
                <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer text-gray-900 dark:text-gray-300 transition-effect absolute top-9 right-3"
                dataTestId="reset-confirm-password-show-hide-button"
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
  
              <div className="mt-6">
                <Button
                  type="submit"
                  label="Register"
                  loading={loading}
                  isFullWidth = 'true'
                  styleClass="cursor-pointer w-full px-6 py-2.5 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg"
                  dataTestId="reset-button"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default AcceptInvitation;
