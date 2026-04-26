import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from '../../../assets/auth-animation.json';
import logo from '../../../assets/light-logo.png';
import { CustomInput } from '../../../components/form-elements/CustomInput';
import { Button } from '../../../components/form-elements/Button';
import { emailValidation } from '../../../utils/validations';
import { guestAxios } from '../../../config/guestAxios';
import toast from 'react-hot-toast';

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(window.location.origin);
    setLoading(true);
    try {
      const response = await guestAxios('/auth/forgot-password',{ 
        method: 'POST',
        data:{
            email: data.email,
            redirect_url: `${window.location.origin}/reset-password`,
        },
        }
      );

      if (response.status === 200) {
        console.log(response);
        // navigate('/reset-password', {
        //   state: {
        //     email: data.email,
        //   },
        // });
        // alert('Password reset link sent to your email.');
        toast.success('Password reset link sent to your email.');
        navigate('/login', {
          state: {
            email: data.email,
          },
        });
      }
    } catch (e) {
        console.error('Forgot password error:', e);
        if (e.response) {
            console.log(e.response.data.data);
            toast.error(e.response.data.message || "Something went wrong!");

        }
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
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
      </div>

      <div className="lg:h-auto md:h-auto h-full md:w-2/3 flex flex-col items-center justify-center bg-white dark:bg-gray-800 overflow-y-auto p-6 sm:p-10 lg:mb-8 lg:rounded-bl-4xl lg:shadow-xl md:mb-5 rounded-bl-2xl md:shadow-sm">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-7 text-center text-gray-800 dark:text-gray-100">
            Forgot Password
          </h1>
          <p className="md:text-sm mb-10 text-center text-gray-600 dark:text-gray-400">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CustomInput
              label="Email"
              type="email"
              name="email"
              placeholder="e.g., user@example.com"
              register={register}
              validations={emailValidation}
              errors={errors.email}
              labelStyleClass="text-gray-900 text-lg dark:text-gray-300"
              dataTestId="forgot-password-email"
            />

            <div className="mt-6">
            <Button
              type="submit"
              label="Send Reset Link"
              loading={loading}
              isFullWidth = 'true'
              styleClass="cursor-pointer w-full py-2.5 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg"
              dataTestId="forgot-password-send-reset-link"
            />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;