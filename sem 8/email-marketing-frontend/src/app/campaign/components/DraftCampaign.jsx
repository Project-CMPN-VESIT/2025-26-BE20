import React, { useEffect, useState } from "react";
import { Button } from "../../../components/form-elements/Button";
import templates from "../../../assets/campaign.png";
import { useNavigate } from "react-router-dom";
import authAxios from "../../../config/AuthAxios";
import toast, { Toaster } from "react-hot-toast";
import CampaignNav from "./CampaignNav";

const DraftCampaign = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);


  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/campaign/get-all-draft-campaigns?page=${currentPage}`)
      .then((res) => {
        const response = res?.data?.data;
        setCampaigns(response?.data || []);
        setLastPage(response?.last_page || 1);
      })
      .catch((err) => {
         console.error("Failed to fetch draft campaigns", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await authAxios.delete(`/campaign/delete-campaign/${id}`);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      toast.success("Campaign deleted successfully");
    } catch (err) {
      toast.error("Failed to delete campaign");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div>
        
        <Toaster />
        <CampaignNav />
        <div className="p-12 w-full flex justify-center">
          <div className="flex bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-4xl">
            <img
              src={templates}
              className="object-cover rounded-l-lg"
              alt="campaign"
            />

            <div className="flex flex-col justify-between p-6">
              <h5 className="text-2xl font-bold text-gray-900">
                Create your first campaign
              </h5>

              <p className="text-gray-600">
                Design your campaign, then enhance it with these advanced features using our Drag and Drop Editor.
              </p>

              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Auto resend gives subscribers a second chance to open</li>
                <li>Pre-designed templates let you craft emails faster</li>
                <li>Dynamic content and surveys increase engagement</li>
              </ul>

              <div className="flex justify-end">
                <Button
                  type="button"
                  styleClass="text-white px-4 py-2 rounded bg-primary"
                  label="Create"
                  onClick={() => navigate("/campaigns/create")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6">
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center p-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white pl-2 mt-2">Campaigns</span>
                  </div>
                  <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <Button
                      type="button"
                      styleClass="text-white bg-primary px-4 py-2 rounded"
                      label="Create Campaign"
                      onClick={() => navigate("/campaigns/create")}
                      data-test-id="create-campaign-button"
                    />
                  </div>
                </div>
              </nav>
      <Toaster />
      <CampaignNav />

      <div className="mt-6 bg-white px-15">
        {campaigns.map((c) => (
<div
                    key={c.id}
                    className="flex items-stretch py-3 border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <img
                      src={templates}
                      className="w-24 h-24 object-contain mr-6"
                      alt="campaign"
                    />
                  
                    <div className="mt-5 flex flex-col justify-between flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {c.name || "Untitled"}
                        </h3>
                  
                        <span
                          className={`px-2 py-[2px] text-[10px] font-medium rounded-full border ${
                            c.status === "draft"
                              ? "bg-gray-100 text-gray-600 border-gray-300"
                              : "bg-primary text-white border-primary"
                          }`}
                        >
                          {c.status}
                        </span>
                      </div>
                      {c.status !== "completed" && (
                        <div className=" mt-2 flex items-end">
                          <button
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-sm hover:bg-teal-700 transition"
                            onClick={() => navigate(`/campaigns/review/${c.id}`)}
                          >
                            Continue editing
                          </button>
                        </div>
                      )}
                      {c.status?.toLowerCase() === "completed" && (
            <p className="mt-2 text-xs text-gray-500">
              Campaign completed
            </p>
          )}
                      </div>
                  
                  
                    <div className="flex items-center mr-4">
  <i
    className="ri-delete-bin-6-line text-xl text-gray-400 cursor-pointer hover:text-red-500 transition"
    onClick={() => handleDelete(c.id)}
  />
</div>

                  </div>

        ))}

        {lastPage > 1 && (
  <div className="mt-6 flex justify-between items-center pb-4 pt-4">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      className={`px-3 py-1.5 rounded
        ${currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-primary text-white"}`}
    >
      ← Previous
    </button>

    <span className="text-sm font-medium">
      Page {currentPage} / {lastPage}
    </span>

    <button
      disabled={currentPage === lastPage}
      onClick={() => setCurrentPage((p) => p + 1)}
      className={`px-3 py-1.5 rounded
        ${currentPage === lastPage
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-primary text-white"}`}
    >
      Next →
    </button>
  </div>
)}

      </div>
    </div>
  );
};

export default DraftCampaign;
