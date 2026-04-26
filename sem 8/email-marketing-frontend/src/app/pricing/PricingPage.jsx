// import React, { useCallback, useEffect, useState } from "react";
// import Header from "./../landing-page/components/Header";
// import "./css/rangeslider.css";
// import PricingPlanCard from "./components/PricingPlanCard";
// import { Button } from "../../components/form-elements/Button";
// import { Link, useNavigate } from "react-router-dom";
// import PlansComparisonTable from "./components/PlansComparisonTable";
// import useScrollToHash from "../../hooks/useScrollToHash";
// import Footer from "./../landing-page/components/Footer";
// import { useFetchGuest } from "../../hooks/useFetchGuest";

// const PricingPage = ({ darkMode, onDarkModeChange }) => {
//   const minSubscribers = 500;
//   const maxSubscribers = 50000;
//   const step = 500;
//   const [isYearlyPlan, setIsYearlyPlan] = useState(true); // if false, then it's a monthly plan
//   const [rangeValue, setRangeValue] = useState(minSubscribers);
//   const [showComparisonTable, setShowComparisonTable] = useState(false);
//   const [rangePercentage, setRangePercentage] = useState(0);

  // const {
  //   data: plans,
  //   error: plansError,
  //   loading: plansLoading,
  // } = useFetchGuest("/plans");

//   const featureMatrix = {
//     "Monthly email sends": ["Unlimited", "Unlimited", "12,000"],
//     "User seats": ["Unlimited", "10", "1"],
//     Support: ["24/7 chat & email", "Email only", "None"],
//   };
//   const navigate = useNavigate();

//   useScrollToHash();

//   const handleShowComparisonTableClick = () => {
//     setShowComparisonTable(true);
//     navigate("/pricing#plans-comparison-table");
//   };

//   const calculateSubscribersBubbleLeftMargin = useCallback(() => {
//     const min = parseInt(minSubscribers);
//     const max = parseInt(maxSubscribers);
//     const val = parseInt(rangeValue);
//     const percent = ((val - min) / (max - min)) * 100;

//     return percent;
//   }, [rangeValue]);

// useEffect(() => {
//   setRangePercentage(calculateSubscribersBubbleLeftMargin());
// }, [rangeValue, calculateSubscribersBubbleLeftMargin]);

//   const sliderStyle = {
//     background: `linear-gradient(to right, #2f8481a1 0%, #2f8481a1 ${calculateSubscribersBubbleLeftMargin()}%, #ccc ${calculateSubscribersBubbleLeftMargin()}%, #ccc 100%)`,
//   };

//   return (
//     <>
//       <div className="bg-gray-[#FEFEFE] dark:bg-dark-secondary dark:text-white">
//         <Header darkMode={darkMode} onDarkModeChange={onDarkModeChange} />
//         <div className="w-9/10 m-auto">
//           <div className="my-10 md:mt-10 md:mb-10">
//             <h1 className="text-5xl font-semibold mb-4">Pricing</h1>
//             <p className=" text-xl ">
//               Whether you're just starting out or scaling up, our pricing adapts
//               to your needs - without breaking the bank.
//             </p>
//           </div>

//           <div className="flex flex-col-reverse md:flex-row gap-6 pt-10 mb-10 md:mb-15 md:pt-15 border-t-2 border-gray-200 dark:border-gray-400">
//             <div className="md:w-1/2 text-xl">
//               <h2 className="font-bold text-2xl mb-4">
//                 Scale Smart, Not Expensive
//               </h2>
//               <p className="text-lg">
//                 Adjust the slider to set your contact limit—pricing updates in
//                 real time. Each plan is designed to match your needs, offering
//                 the right mix of campaign tools, templates, automation,
//                 analytics, and more. Choose what fits best, and scale when
//                 you're ready.
//               </p>
//             </div>
//             <div className="flex md:w-1/2">
//               <div className="flex flex-col w-full">
//                 <span className="mb-12 text-xl font-medium text-left">
//                   How many subscribers do you have?
//                 </span>
//                 <div className="w-full flex flex-col items-center justify-center gap-3">
//                   {/* <div className={` mb-4 relative`}>
//                     <div
//                       className="absolute -top-8 transform -translate-x-1/2"
//                       style={{ left: `calc(${rangePercentage}% + 50px)` }}
//                     >
//                       <div className="bg-primary text-white text-base font-bold px-3 py-1 rounded-md">
//                         {rangeValue}
//                       </div>

//                       <div
//                         className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0
//               border-l-8 border-r-8 border-t-8
//               border-l-transparent border-r-transparent border-t-primary"
//                       ></div>
//                     </div>
//                   </div> */}
//                   <div className={`mb-4`}>
//                     <div
//                       className="relative w-fit"
//                     >
//                       <div className="bg-primary text-white text-base font-bold px-3 py-1 rounded-md">
//                         {rangeValue}
//                       </div>
//                       <div
//                         className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0
//               border-l-8 border-r-8 border-t-8
//               border-l-transparent border-r-transparent border-t-primary"
//                       ></div>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-center w-full">
//                     <span className="text-base font-semibold text-gray-400 mr-2 mt-1">
//                       {minSubscribers}
//                     </span>
//                     <input
//                       type="range"
//                       className={`w-full trackrange appearance-none `}
//                       min={minSubscribers}
//                       max={maxSubscribers}
//                       step={step}
//                       style={sliderStyle}
//                       value={rangeValue}
//                       onChange={(e) => setRangeValue(Number(e.target.value))}
//                     />
//                     <span className="text-base font-semibold text-gray-400 ml-2 mt-1">
//                       500K
//                     </span>
//                   </div>
//                 </div>
//                 <div className=" transition duration-150 ease-out pt-6 ml-12 flex items-center text-xl">
//                   <span className="mr-2 fill-current text-gray-400 opacity-80">
//                     <svg
//                       className="h-4 animate-bounce motion-safe:animate-bounce"
//                       viewBox="0 0 14 14"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M3.11104 3.11112L3.11104 2.65544L1.09972 4.66674L1.5591e-07 3.5668L3.33899 0.22784C3.6421 -0.0759468 4.13488 -0.0759468 4.43871 0.22784L7.77793 3.5668L6.67798 4.66674L4.66667 2.65544L4.66667 3.11112C4.66667 8.26706 8.84707 12.443 14 12.4444L14 14C7.98793 13.9984 3.11104 9.12592 3.11104 3.11112Z"></path>
//                     </svg>
//                   </span>
//                   <span className="">Use the slider above</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row items-center gap-4 my-3">
//             <div className="flex flex-row p-1 bg-secondary dark:bg-secondary-100 text-nowrap gap-1 rounded-lg w-full md:w-fit">
//               <span
//                 className={`p-2 px-4 rounded-lg text-black/60 hover:text-black/100 cursor-pointer w-full md:w-fit text-center text-lg md:text-base ${
//                   isYearlyPlan
//                     ? "bg-primary text-white/70 hover:text-white/100"
//                     : ""
//                 } transition-effect`}
//                 onClick={() => setIsYearlyPlan(true)}
//               >
//                 Billed yearly
//               </span>
//               <span
//                 className={`p-2 px-4 rounded-lg text-black/60 hover:text-black/100 w-full md:w-fit cursor-pointer text-center text-lg md:text-base ${
//                   isYearlyPlan
//                     ? ""
//                     : "bg-primary text-white/70 hover:text-white/100"
//                 } transition-effect`}
//                 onClick={() => setIsYearlyPlan(false)}
//               >
//                 Billed monthly
//               </span>
//             </div>
//             <p className="opacity-60 text-lg md:text-sm">
//               Save 10% by paying yearly
//             </p>
//           </div>
//           <div className="flex gap-8 items-end flex-col lg:flex-row-reverse">
//             {!plansLoading &&
//               !plansError &&
//               plans &&
//               plans["plans"]
//                 .filter((plan) =>
//                   isYearlyPlan
//                     ? plan.billing_type === "free" ||
//                       plan.billing_type === "yearly"
//                     : plan.billing_type === "free" ||
//                       plan.billing_type === "monthly"
//                 )
//                 .sort((a, b) => a.price - b.price)
//                 .map((plan, index, sorted) => (
//                   <PricingPlanCard
//                     name={plan.name}
//                     key={index}
//                     noOfContacts={plan.subscriber_limit}
//                     noOfMonthlyEmails={plan.email_limit}
//                     planExclusiveFeatures={plan.features}
//                     amountInDollars={plan.price}
//                     previousPlanName={index > 0 ? sorted[index - 1].name : null}
//                     isYearlyPlan={isYearlyPlan}
//                     isPlanApplicable={rangeValue <= plan.subscriber_limit}
//                     tag={index === sorted.length - 1 ? "Best Value" : null}
//                   />
//                 ))}
//             {/* <PricingPlanCard
//               name={"Advanced"}
//               tag={"Best value"}
//               isPlanApplicable={true}
//               amountInDollars={100}
//               noOfMonthlyEmails={"Unlimited"}
//               noOfUserSeats={"Unlimited"}
//               previousPlanName={"Free"}
//               planExclusiveFeatures={[
//                 "Smart sending",
//                 "Custom HTML Editor",
//                 "AI writing assitant",
//               ]}
//               isYearlyPlan={isYearlyPlan}
//               noOfContacts={12000}
//             />
//             */}
//           </div>
//           <div className="my-3 py-3">
//             <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
//               <Link to="/register" className="mt-5 sm:mt-0 size-large">
//                 <Button
//                   label={"Sign up free"}
//                   styleClass={
//                     "w-full py-3 px-4 text-center text-white rounded-lg text-lg"
//                   }
//                 />
//               </Link>

//               <Button
//                 children={
//                   <>
//                     <span>Full pricing plan comparison</span>
//                     <i className="ri-arrow-down-line ri-lg ml-2 "></i>
//                   </>
//                 }
//                 styleClass={
//                   "bg-transparent text-md font-medium flex flex-row gap-3 items-center hover:text-primary cursor-pointer"
//                 }
//                 onClick={() => handleShowComparisonTableClick()}
//               ></Button>
//             </div>
//             <div className="pt-4 text-md text-gray-500 text-center">
//               Get a free 30-day trial of premium features | No credit card
//               required
//             </div>
//           </div>
//           <div
//             className={`${
//               showComparisonTable
//                 ? ""
//                 : "max-h-[500px] relative overflow-hidden"
//             }`}
//           >
//             {!showComparisonTable && (
//               <div className="transition-effect">
//                 {" "}
//                 <Button
//                   label={"Show full comparison table"}
//                   styleClass={`bg-primary p-4 text-xl text-white z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-2xl/30 shadow-black cursor-pointer mx-auto transition-effect`}
//                   onClick={() => setShowComparisonTable(true)}
//                 />{" "}
//               </div>
//             )}
//             <div
//               className={`overflow-x-auto mt-20 pb-20 overflow-y-auto ${
//                 showComparisonTable ? "" : "opacity-10 pointer-events-none"
//               } `}
//               id="plans-comparison-table"
//             >
//               <table className="table-auto min-w-[1000px] w-full xl:overflow-visible ">
//                 <tbody className="text-lg divide-y divide-gray-200 dark:divide-gray-400">
//                   <tr className="divide-x divide-gray-200 dark:divide-gray-400">
//                     <td className="w-1/4 py-7">
//                       <h4 className="font-bold text-xl pl-2">Compare Plans</h4>
//                     </td>
//                     <td className="w-1/4 ">
//                       <div className="p-7 flex flex-col">
//                         <span className="font-medium text-lg">Advanced</span>
//                         <div className="mt-3">
//                           <span className="font-semibold text-4xl">
//                             $18
//                             <sup>.00</sup>
//                           </span>
//                           <span className="text-lg font-normal text-gray-400">
//                             / month
//                           </span>
//                           <div className="mt-3">
//                             <span className="tracking-wide font-normal text-gray-500 text-base flex flex-wrap">
//                               <span>
//                                 <span className="font-semibold text-black dark:text-white">
//                                   $216.00
//                                 </span>{" "}
//                                 billed yearly for up to{" "}
//                                 <span className="font-semibold text-black dark:text-white">
//                                   500
//                                 </span>{" "}
//                                 subscribers
//                               </span>
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="w-1/4">
//                       <div className="p-7 flex flex-col">
//                         <span className="font-medium text-lg">
//                           Growing Business
//                         </span>
//                         <div className="mt-3">
//                           <span className="font-semibold text-4xl">
//                             $9
//                             <sup>.00</sup>
//                           </span>
//                           <span className="text-lg font-normal text-gray-400">
//                             / month
//                           </span>
//                           <div className="mt-3">
//                             <span className="tracking-wide font-normal text-gray-500 text-base flex flex-wrap">
//                               <span>
//                                 <span className="font-semibold text-black dark:text-white">
//                                   $108.00
//                                 </span>{" "}
//                                 billed yearly for up to{" "}
//                                 <span className="font-semibold text-black dark:text-white">
//                                   500
//                                 </span>{" "}
//                                 subscribers
//                               </span>
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="w-1/4">
//                       <div className="p-7 flex flex-col">
//                         <span className="font-medium text-lg">Free</span>
//                         <div className="mt-3">
//                           <span className="font-semibold text-4xl">
//                             $0
//                             <sup></sup>
//                           </span>

//                           <div className="mt-3">
//                             <span className="inline-block tracking-wide text-base flex flex-wrap min-h-[50px]">
//                               For up to{" "}
//                               <span className="font-semibold text-black dark:text-white">
//                                 1000
//                               </span>{" "}
//                               subscribers
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr className="border-b-1 border-gray-200 dark:border-gray-400">
//                     <td className="w-1/4"></td>
//                     <td className="w-full py-3" colSpan={"3"}>
//                       <Link to="/register">
//                         <Button
//                           label={"Sign Up Free"}
//                           isFullWidth={true}
//                           type={"button"}
//                           styleClass={
//                             "p-2 rounded-lg mx-auto w-full text-white text-base cursor-pointer transition-effect"
//                           }
//                         />
//                       </Link>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//               <div>
//                 <PlansComparisonTable
//                   label={"Grow Your Audience"}
//                   featurePlanOfferObject={featureMatrix}
//                 />
//                 <PlansComparisonTable
//                   label={"Send amazing email campaigns"}
//                   featurePlanOfferObject={featureMatrix}
//                 />
//                 <PlansComparisonTable
//                   label={"Automate your work"}
//                   featurePlanOfferObject={featureMatrix}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PricingPage;

import { useState, useEffect } from "react";
import { Button } from "../../components/form-elements/Button";
import { Check, ArrowRight, Crown, Loader2 } from "lucide-react";
import Header from "../landing-page/components/Header";
import Footer from "../landing-page/components/Footer";
import CookieConsent from "../landing-page/components/Cookies";
import { useFetchGuest } from "../../hooks/useFetchGuest";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const [plans, setPlans] = useState([]);

  const {data,error,loading} = useFetchGuest('/plans');
  
  useEffect(() => {
    console.log(data);
    if(data){
      setPlans(data.plans);
    }
  },[data]);

  // Get free plan and filtered plans based on billing cycle
  const freePlan = plans.find((p) => p.billing_type === "free");
  const paidPlans = plans.filter((p) => p.billing_type === billingCycle);

  // Combine for display: Free + paid plans for current cycle
  const displayPlans = freePlan ? [freePlan, ...paidPlans] : paidPlans;

  // Calculate yearly savings
  const getYearlySavings = (planName) => {
    const monthlyPlan = plans.find((p) => p.name === planName && p.billing_type === "monthly");
    const yearlyPlan = plans.find((p) => p.name === planName && p.billing_type === "yearly");
    if (monthlyPlan && yearlyPlan) {
      const savings = Math.round(((monthlyPlan.price - yearlyPlan.price) / monthlyPlan.price) * 100);
      return savings;
    }
    return 0;
  };

  const formatLimit = (limit) => {
    if (typeof limit === "string") return limit;
    return limit.toLocaleString();
  };

  const getHighlightedIndex = () => {
    return displayPlans.findIndex((p) => p.name === "Growing Business");
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-10 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            Simple, honest pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Choose your plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start free and upgrade when you need more. All plans include a 14-day free trial.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                billingCycle === "monthly"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-primary-900/60"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                billingCycle === "yearly"
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-primary/80"
              }`}
            >
              Yearly
            </button>
            {/* {billingCycle === "yearly" && (
              <span className="text-xs font-semibold text-success bg-success/10 px-3 py-1 rounded-full">
                Save up to 10%
              </span>
            )} */}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive">{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Try again
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {displayPlans.map((plan, index) => {
                const isHighlighted = index === getHighlightedIndex();
                const savings = billingCycle === "yearly" ? getYearlySavings(plan.name) : 0;

                return (
                  <div
                    key={plan.id}
                    className={`relative bg-card border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg ${
                      isHighlighted
                        ? "border-primary ring-1 ring-primary/20 lg:-mt-4 lg:mb-4"
                        : "border-border"
                    }`}
                  >
                    {isHighlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-6 pt-2">
                      <h2 className="text-xl font-bold text-foreground mb-1">{plan.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {plan.billing_type === "free"
                          ? "Perfect for getting started"
                          : plan.name === "Growing Business"
                          ? "Best for growing businesses"
                          : "For large organizations"}
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-foreground tabular-nums">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground ml-1">/month</span>
                      </div>
                      {savings > 0 && billingCycle === "yearly" && (
                        <p className="text-xs text-success font-medium mt-1">
                          Save {savings}% vs monthly
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        Up to {formatLimit(plan.subscriber_limit)} subscribers
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatLimit(plan.email_limit)} emails
                        {plan.billing_type !== "free" && "/month"}
                      </p>
                    </div>

                    <Button
                      styleClass={`w-full h-11 !flex !justify-center !items-center rounded-lg px-2 font-semibold mb-8 ${
                        isHighlighted
                          ? "bg-primary hover:bg-primary-900/90 text-white"
                          : "bg-secondary hover:bg-secondary/80 text-primary-900"
                      }`}
                    >
                      {plan.price === 0 ? "Start for free" : "Start free trial"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        Features included
                      </p>
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-success" />
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Have questions?</h2>
            <p className="text-muted-foreground mb-8">
              Our team is ready to help you find the perfect plan for your needs.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button styleClass={`px-4 py-2 rounded-lg border border-2 border-primary-900 bg-transparent text-primary-900`}>
                Read FAQ
              </Button>
              <Button styleClass={`px-4 py-2.5 rounded-lg text-white`}>Contact sales</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </main>
  );
};

export default Pricing;
