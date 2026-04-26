import React from "react";
import NotFound from "../../assets/notFound.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/form-elements/Button";
import Footer from "../landing-page/components/Footer";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-white ">
      <div className="flex flex-col lg:flex-row items-center justify-center px-6 md:px-10 py-10 ">
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
        <Lottie animationData={NotFound} loop={true} className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px]" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col lg:pl-10 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-black mb-6">Page not found</h1>
        <p className="text-base sm:text-lg text-gray-700 mb-4">
          We couldn't find the page you were looking for.</p>
          <p className="text-base sm:text-lg text-gray-700 mb-6"> Visit our{" "}
          <Link to="/dashboard" className="text-primary font-semibold cursor-pointer" >dashboard</Link>, try searching for information or go back to previous page.
        </p>
        <div className="flex justify-center lg:justify-start">
        <Button
          label="Go Back To Previous Page"
          styleClass="text-white px-5 py-2 rounded bg-primary"
          onClick={() => navigate(-1)}
        />
        </div>
      </div>
    </div>
    </div>
      <Footer />
    </div>
  );
};

export default PageNotFound;
