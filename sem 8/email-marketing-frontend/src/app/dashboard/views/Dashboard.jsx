import React, { use, useEffect, useState } from "react";
import EmailCard from "../components/EmailCard";
import FormCard from "../components/FormCard";
import SiteCard from "../components/SiteCard";
import {
  getLightModeSecondary,
  getLightModePrimary,
} from "../../../utils/ColorTheme";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import useDynamicTitle from "../../../hooks/useDynamicTitle";
import { useFetchAuth } from "../../../hooks/useFetchAuth";

const Dashboard = () => {
  const [lightPrimary, setLightPrimary] = useState("");
  const [lightSecondary, setLightSecondary] = useState("");
  useEffect(() => {
    setLightPrimary(getLightModePrimary());
    setLightSecondary(getLightModeSecondary());
  }, []);
  const { data: lineData, loading: lineDataLoading, error: lineDataError } = useFetchAuth("/fetch-monthwise-opens-count");
  const { data: monthwiseSubsData, loading: monthwiseSubsDataLoading, error: monthwiseSubsDataError } = useFetchAuth("/fetch-monthwise-subscribers-vs-unsubscribers");
  const { data: campaignsData, loading: campaignsDataLoading, error: campaignsDataError } = useFetchAuth("/fetch-campaigns-info");
  const {data: moreSubsData, loading: moreSubsDataLoading, error: moreSubsDataError} = useFetchAuth("/fetch-more-information-on-subscribers")
  useDynamicTitle("Dashboard | Mailed IT");
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 w-full">
        <div className=" flex  w-full ">
          <div className="flex-1 p-3 overflow-auto">
            <div className="my-6">
              <div className="grid grid-cols-1 md:gap-10 gap-5">
                <LineChart lineData={lineData} lineDataLoading={lineDataLoading} lineDataError={lineDataError} />
                <BarChart monthwiseSubsData={monthwiseSubsData} monthwiseSubsDataLoading={monthwiseSubsDataLoading} monthwiseSubsDataError={monthwiseSubsDataError} moreSubsData={moreSubsData} moreSubsDataLoading={moreSubsDataLoading} moreSubsDataError={moreSubsDataError}/>
              </div>

              <div className="grid grid-cols-1 mt-5 md:mt-10 md:gap-10 gap-5">
                <EmailCard campaignsData={campaignsData} campaignsDataLoading={campaignsDataLoading} campaignsDataError={campaignsDataError} />
                {/* <FormCard />
                <SiteCard /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
