import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/form-elements/Button';
import templates from '../../../assets/campaign.png';
import { useNavigate } from 'react-router-dom';
import authAxios from "../../../config/AuthAxios";
import toast, { Toaster } from "react-hot-toast";
import CampaignNav from './CampaignNav';


const CampaignPage = () => {
const navigate = useNavigate();

const [campaigns, setCampaigns] = useState([]);
const [loading, setLoading] = useState(true);
const [page, setPage] = useState(1); 
const [pagination, setPagination] = useState(null);

  useEffect(() => {
    setLoading(true);
    authAxios
      .get(`/campaign/get-all-campaigns?page=${page}`)
      .then((res) => {
        const paginatedData = res?.data?.data;
        setCampaigns(paginatedData?.data || []);
        setPagination(paginatedData);
      })
      .catch((err) => {console.error("Failed to fetch campaigns", err);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await authAxios.delete(`/campaign/delete-campaign/${id}`);
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
      toast.success("Campaign deleted successfully");
    } catch (err) {
      console.error("Failed to delete campaign", err);
      toast.error("Failed to delete campaign");
    }
  };

  const goToPrevious = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const goToNext = () => {
    setPage((p) => Math.min(pagination.last_page, p + 1));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
if (!campaigns || campaigns.length === 0) {
  return (
    <div>
        <div className="p-12 w-full flex justify-center">
          <div data-test-id="campaign-card" className="flex bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img data-test-id="campaign-image" src={templates} className="object-cover  rounded-l-lg h-auto" alt="campaign image"
            />
            <div className=" flex flex-col justify-between p-6 leading-normal">
              <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Create your first campaign
              </h5>
              <p className=" font-normal text-left text-gray-700 dark:text-gray-400">
               Design your campaign, then enhance it with these advanced features using our Drag and Drop Editor.
              </p>
              <ul className="list-disc text-left list-outside pl-5 text-gray-700 dark:text-gray-400 space-y-2">
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400  pt-1">Auto resend gives subscribers a second chance to open</li>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400  pt-1">Pre-designed templates let you craft emails that match your goals</li>
                <li className="mb-3 font-normal text-gray-700 dark:text-gray-400  pt-1">Surveys, dynamic content, and social media blocks increase engagement</li>
              </ul>
              <div className="flex justify-end">
                <Button 
                      type="button"
                      styleClass="text-white px-4 py-2 rounded bg-primary text-right"
                      label="Create"
                      onClick={() => navigate("/campaigns/create")}
                      data-test-id="create-button"
                    />
              </div>
              
            </div>
          </div>
        </div>
      </div>
  );
}
return (
    <div className="bg-white px-5">
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
       <div className="mt-6 bg-white px-10">
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
      <div className="mt-6 flex justify-between items-center pb-4 pt-4">
          <button
            disabled={!pagination?.prev_page_url}
            onClick={goToPrevious}
            className={`px-3 py-1.5 rounded
              ${!pagination?.prev_page_url
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white"}`}
          >
            ← Previous
          </button>

          <span className="text-sm font-medium">
            Page {pagination?.current_page} / {pagination?.last_page}
          </span>

          <button
            disabled={!pagination?.next_page_url}
            onClick={goToNext}
            className={`px-3 py-1.5 rounded
              ${!pagination?.next_page_url
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-white"}`}
          >
            Next →
          </button>
        </div>
    </div>
    </div>
  );
};

export default CampaignPage;
