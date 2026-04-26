import React from "react";
import { Button } from "../../../components/form-elements/Button";
import { Link } from "react-router-dom";

const PricingPlanCard = ({
  name,
  amountInDollars = 0,
  tag,
  noOfContacts,
  isPlanApplicable,
  isYearlyPlan,
  onSignUpClick,
  noOfMonthlyEmails = 12000,
  noOfUserSeats = 1,
  previousPlanName, // You could simply make an array with plans in increasing order(so prev plan name = plans[index-1]) and then flex-row-reverse to put the cards.
  planExclusiveFeatures,
}) => {
  return (
    <div
      className={`plan-card ${isPlanApplicable ? "" : "opacity-60"} ${
        tag ? "border-primary" : "border-gray-200 dark:border-gray-400"
      } border-2 rounded-lg w-full`}
    >
      {tag && (
        <div className="flex p-2 px-4 text-center items-center bg-primary text-white text-lg justify-center gap-3 rounded-t-md">
          <i className="ri-bard-fill ri-lg"></i>
          <p className="plan-tag">{tag}</p>
        </div>
      )}
      <div className="m-5">
        <div className={`${!isYearlyPlan ? 'lg:min-h-[162px] xl:min-h-[162px] 2xl:min-h-[152px]' : ''} ${amountInDollars === 0 && isYearlyPlan ? "lg:min-h-[162px] xl:min-h-[207px] 2xl:min-h-[179px] mb-5" : ""}`}>
          <h3 className="plan-name font-medium text-2xl mb-5"> {name}</h3>
          <p className="plan-amount text-gray-500 text-xl mb-5">
            <span className="text-4xl font-semibold text-black dark:text-white">
              ${amountInDollars}
              {amountInDollars !== 0 && <sup className="text-sm align-top">.00</sup>}
            </span>
            {amountInDollars === 0 ? "" : " / month"}
          </p>
          {amountInDollars !== 0 && isYearlyPlan && (
            <p className="text-gray-500 text-xl mb-5">
              {" "}
              <span className="font-bold text-black dark:text-white">
                ${amountInDollars * 12}{" "}
              </span>{" "}
              billed yearly for up to{" "}
              <span className="font-bold text-black dark:text-white">{noOfContacts}</span>{" "}
              contacts.
            </p>
          )}
          { !isYearlyPlan || amountInDollars === 0 && (
            <p className="text-gray-500 text-xl mb-5">
              For up to{" "}
              <span className="font-bold text-black dark:text-white">{noOfContacts}</span>{" "}
              contacts.
            </p>
          )}
          {amountInDollars !== 0 && (
            <p className="text-md text-gray-500 mb-5 font-light">
              Taxes may apply,{" "}
              <span className="underline cursor-pointer transition-effect">
                learn more
              </span>
              .
            </p>
          )}
        </div>
        <Link to="/register">
        <Button
          isFullWidth={true}
          type={"button"}
          label={`${
            amountInDollars !== 0 ? "Start free trial" : "Sign up Free"
          }`}
          styleClass={
            "p-3 w-full rounded-lg text-white text-lg mb-4 cursor-pointer transition-effect"
          }
          onClick={() => onSignUpClick}
        ></Button></Link>
        <p className="text-center text-gray-500 text-md mb-5 pb-5 border-b border-gray-200">
          Try premium features for 30 days{" "}
          <i className="ri-error-warning-fill"></i>
        </p>
        <div className="lg:min-h-[469px] xl:min-h-[441px] 2xl:min-h-[440px]">
          <ul className="core-plan-features mt-5 pb-3 mb-3 text-xl text-gray-500 border-b border-gray-200">
            <li className="mb-2">
              {" "}
              <span className="font-bold text-black dark:text-white">
                {noOfMonthlyEmails}
              </span>{" "}
              {noOfMonthlyEmails === 1 ? " monthly email" : "monthly emails"}
            </li>
            {/* <li className="mb-2">
              <span className="font-bold text-black dark:text-white">{noOfUserSeats}</span>{" "}
              {noOfUserSeats === 1 ? " user seat" : "user seats"}
            </li> */}
          </ul>
          <div className="exclusive-plan-features">
            <p className="font-bold text-xl mb-5">
              {
                previousPlanName !== null ?  `All in ${previousPlanName}, plus` : 'Key Features'
              }
              
            </p>
            <ul className="pb-3">
              {planExclusiveFeatures &&
                planExclusiveFeatures.map((feature, index) => (
                  <li className="underline decoration-dashed cursor-pointer mb-3 text-xl underline-offset-5 text-gray-500 hover:text-black dark:hover:text-white" key={index}>
                    {feature}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlanCard;
