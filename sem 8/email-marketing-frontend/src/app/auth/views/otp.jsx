import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import animation from '../../../assets/auth-animation.json';
import logo from '../../../assets/light-logo.png';
import { CustomInput } from '../../../components/form-elements/CustomInput';
import { Button } from '../../../components/form-elements/Button';
import { guestAxios } from '../../../config/guestAxios';
import { LONG_LIVE_TOKEN } from '../../../constants/constants';
import { setCookie, getCookie } from '../../../utils/cookie-helper';
import OtpInput from 'react-otp-input';
import toast from 'react-hot-toast';
import {useAuth} from '../../../context/AuthContext';

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const {setToken} = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (location.state && location.state.email) {
      setUserEmail(location.state.email);
    } else {
      navigate('/register');
    }
  }, [location.state, navigate]);


  const getVerifyOtpEndpoint = () => {
  switch (location.state.cameFrom) {
    case "register":
      return "/auth/verify-otp";
    case "login":
      return "/auth/verify-otp-for-login";
    case "invitation":
      return "/invitation/verify-otp-to-accept-invitation";
    default:
      return "/auth/verify-otp";
  }
};

const getResendOtpEndpoint = () => {
  return location.state.cameFrom === "invitation"
    ? "/invitation/resend-otp"
    : "/auth/resend-otp";
};


  const onSubmit = async () => {

    setLoading(true);
    try {
      const response = await guestAxios(getVerifyOtpEndpoint(),{
        method:"POST",
        data: {
          email: userEmail,
          otp: parseInt(otp),
        }
        })

      if (response.status === 201 || response.status === 200) {

        setCookie(LONG_LIVE_TOKEN, response.data.data.token, 1);
        setToken(response.data.data.token);
        toast.success("OTP verified successfully");
        navigate('/dashboard');
      }
    } 
    catch(e) {

      if(e.response){
        console.log(e.response.data.data)
        toast.error(e.response.data.message || "Something went wrong!");

    }
    } 
    finally{
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      const response = await guestAxios(getResendOtpEndpoint(), {
        method: 'POST',
        data: {
          email: userEmail,
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message || 'OTP has been re-sent to your email.');
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.data);
        toast.error(e.response.data.message || 'Failed to resend OTP.');
      }
    } finally {
      setResendLoading(false);
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
            Verify your <span className="text-primary font-bold">Account.</span><br />
            Secure your <span className="text-primary font-bold">Emails.</span>
          </h1>
          <p className="text-base lg:text-lg text-[#303030] mb-8 font-light dark:text-gray-400">
            A one-time password has been sent to your email. Please enter it to complete your registration.
          </p>
        </div>
      </div>

      <div className="lg:h-auto md:h-auto h-full md:w-2/3 flex flex-col items-center justify-center bg-white dark:bg-gray-800 overflow-y-auto p-6 sm:p-10 lg:mb-8 lg:rounded-bl-4xl lg:shadow-xl md:mb-5 rounded-bl-2xl md:shadow-sm">
        <div className="w-full max-w-2xl">
            <button
            className="cursor-pointer mb-4"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB+klEQVR4nO2WPU9UQRSGn+hGCzdg7ISGBBcIFoKLfwPktyAfPUoLsq2yFDRUFiQQuNBR8QNUtgKFBqIJoEsFS07yXjPZ7N47c3dJLPZNJrmZ+54zZ87nQAf+GARmgV3gG/BHy74jYAYY4B4wBuwBNc9lBhbbcXAOKAG3UvwL+ASMyxtPtOx7AvgsTk0yy9KRCU+dW/8F5oEuDznjvAeqjjdMVxByEjQFJwpBKF4BR9IRhXqiJMEfQA/ZYbI/pWvJV6io+JnbRxN4z4AvQF+KvtcKx02Kvn+IXW8xb4Zu4EC8LdLxQdydNOKgk+3NEs6yfl+8CvDcwwAz+LdkCknEOZGs1BrhsW4c50ea+12sSG46iRSJZDVdj0fAplMZ/YRh0icMFZFe1O0/BNb17wwYJhxxeL8nka5Eyjt7D4C1gDbsLhd57dkZTXF5jwZ0ae8iyYBDkQYSQnAOvCQcQ5K3ydlyEp42yBPfJNxOIs2IZFOt3WW4Krmp/7oRua3YRmq7WvGCj/vrh1FVg6TVYWSj/FrDaARPLMtiG6W9ZEevM44XW3mQvMlwuN32OOuDBD2j4rKsaqRa7NPQrZhfO70/+EkWw6z+qPjVlMll4K0aS15rSHVedrL9Rm7P/Ch1YZ1vI6AFRykJnBkFzfMdtdQrra8qsXcZOmQHHXAHY+zMssREaZEAAAAASUVORK5CYII=" alt="Go Back"/>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-7 text-center text-gray-800 dark:text-gray-100">
            Verify OTP
          </h1>
          <p className="md:text-sm text-center text-gray-600 dark:text-gray-400 mb-2">
            Please enter the 4-digit verification code sent to your email address below.
          </p>

          {userEmail && (
            <p className="text-center mb-10 text-gray-700">
              Code sent to: <span className="text-primary font-semibold">{userEmail}</span>
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="otp"
              control={control}
              rules={{
                required: 'OTP is required',
                validate: (value) =>
                  /^\d{4}$/.test(value) || 'OTP must be a 4-digit number',
              }}
              render={({ field }) => (
                <OtpInput
                  {...field}
                  value={field.value}
                  onChange={(val) => {
                    setOtp(val);
                    field.onChange(val);
                  }}
                  data-test-id="otp"
                  numInputs={4}
                  renderInput={(props) => <input {...props} />}
                  renderSeparator={<span className="mx-2 text-gray-400"></span>}
                  shouldAutoFocus={true}
                  inputStyle={{
                    width: '3.5rem',
                    height: '3.5rem',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f3f4f6',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  focusStyle={{
                    borderColor: '#2F8481',
                    boxShadow: '0 0 0 2px #2F8481',
                  }}
                  containerStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.5rem',
                  }}
                  inputType="tel"
                />
              )}
            />

            {errors.otp && (
              <p className="text-danger text-center text-sm mt-2">{errors.otp.message}</p>
            )}

            <div className="w-full mt-6">
              <Button
                type="submit"
                label="Submit OTP"
                loading={loading}
                isFullWidth="true"
                styleClass="cursor-pointer w-full py-2.5 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg"
                dataTestId="submit-otp"
              />
            </div>

            <div className="text-center mt-4">
              <p className="text-gray-600 dark:text-gray-300">
                Didn't receive the OTP?{' '}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendLoading}
                  className={`cursor-pointer text-primary font-bold ${resendLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                  data-test-id="resend-otp"
                >
                  {resendLoading ? 'Resending...' : 'Resend OTP'}
                </button>
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;