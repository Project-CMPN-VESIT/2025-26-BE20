import React, { useState } from "react";
import { Button } from "../../../components/form-elements/Button";
import AddDomainModal from "./components/AddDomainModal";
import { useFetchAuth } from "../../../hooks/useFetchAuth";
import DeleteDomainModal from "./components/DeleteDomainModal";
import toast from "react-hot-toast";
import authAxios from "../../../config/AuthAxios";
import ResolveDomainModal from "./components/ResolveDomainModal";

const Domains = () => {
  const { data, error, loading, fetchData } = useFetchAuth(
    "/domain/get-all-domains"
  );

  const [showAddDomainModal, setShowAddDomainModal] = useState(false);
  const [showDeleteDomainModal, setShowDeleteDomainModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showResolveDomainModal, setShowResolveDomainModal] = useState(false);
  const [resolveId, setResolveId] = useState(null);
  const [resolveErrors, setResolveErrors] = useState(null);

  const handleDeleteIconClick = (id) => {
    setDeleteId(id);
    setShowDeleteDomainModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await authAxios(`/domain/delete-domain/${deleteId}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        toast.success("Deleted Domain Successfully");
        fetchData();
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Some server issue");
    } finally {
      setShowDeleteDomainModal(false);
    }
  };

  const handleDefaultDomainChange = async (e, id) => {
    e.preventDefault();
    try {
      const response = await authAxios(`/domain/change-default-domain/${id}`, {
        method: "PUT",
        data: {
          is_default: true,
        },
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status === 200) {
        fetchData();
        toast.success("Set Domain as Default Successfully");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  };

  const handleResolveClick = (domain) => {
    setResolveId(domain.id);
    setResolveErrors(domain.verification_errors || null);
    setShowResolveDomainModal(true);
  };

  return (
    <div className="mt-5 bg-white md:pr-15 rounded-lg p-8 dark:text-white dark:bg-dark-secondary">
      <div className="flex justify-between md:items-center flex-col md:flex-row gap-3 md:gap-0">
        <h2 className="font-semibold text-xl">Email Domains</h2>
        <div data-test-id="add-domain" className="w-full md:w-fit">
          <Button
            label={"Add domain"}
            styleClass={"w-full md:w-fit p-3 rounded-md text-white hover:bg-primary-900 dark:hover:opacity-50 cursor-pointer transition-effect"}
            onClick={() => setShowAddDomainModal(true)} isFullWidth={true}
          />
        </div>
      </div>
      <AddDomainModal
        showAddDomainModal={showAddDomainModal}
        setShowAddDomainModal={setShowAddDomainModal}
        fetchData={fetchData}
      />
      <div className="mt-10 overflow-x-auto">
        {/* Header row. */}
        <div className="grid grid-cols-[3fr_2fr_1fr_1fr_1fr] font-medium pb-3 mb-3 border-b-1 gap-x-5 min-w-[600px]">
          <div>Domain</div>
          <div>Status</div>
          <div>Action</div>
          <div className="flex justify-end text-right">Default Domain</div>
          <div></div>
        </div>
        {loading && (
          <div className="flex justify-center text-base my-5">
            <p>Loading...</p>
          </div>
        )}
        {error && (
          <div className="flex justify-center text-center mx-auto mt-5">
            <p>
              Error while fetching domains. Please refresh the page or try again
              after some time.
            </p>
          </div>
        )}
        <div className="flex flex-col">
          {data?.domains &&
            data.domains.map((domain, index) => (
              <div key={index}>
                <div className="grid grid-cols-[3fr_2fr_1fr_1fr_1fr] min-w-[600px] font-medium py-3 items-center gap-x-5">
                  <p data-test-id={`domain-name-${index}`}>
                    {domain.domain_name}
                  </p>
                  <div
                    className={`capitalize p-2 w-22 text-center rounded-lg text-sm font-medium ${
                      domain.status == "resolved"
                        ? "text-green-800 bg-green-50 dark:text-green-100 dark:bg-green-500 "
                        : "text-red-800 dark:text-red-100 bg-red-50 dark:bg-red-500"
                    }`}
                    data-test-id={`domain-status-${index}`}
                  >
                    {domain.status}
                  </div>
                  {domain.status === "unresolved" ? (
                    <div
                      onClick={() => handleResolveClick(domain)}
                      data-test-id={`domain-resolve-${index}`}
                    >
                      {domain.status === "unresolved" && (
                        <p className="p-2 rounded-lg bg-gray-200 w-fit cursor-pointer dark:text-black dark:hover:bg-gray-400 hover:bg-gray-300 transition-effect">
                          Resolve
                        </p>
                      )}
                    </div>)
                    : (<span className="text-gray-500" data-test-id={`domain-resolve-${index}`}>-</span>)
                  }
                  <div
                    className="flex justify-end"
                    data-test-id={`domain-default-${index}`}
                  >
                    <input
                      type="radio"
                      name="defaultDomain"
                      checked={domain.is_default === true}
                      className={"accent-primary w-4 h-4 text-right"}
                      onChange={(e) => handleDefaultDomainChange(e, domain.id)}
                    />
                  </div>
                  <div
                    className="flex justify-end cursor-pointer"
                    onClick={() => handleDeleteIconClick(domain.id)}
                    data-test-id={`domain-delete-${index}`}
                  >
                    <i className="ri-delete-bin-line ri-xl text-primary px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md w-fit"></i>
                  </div>
                </div>
              </div>
            ))}
          <DeleteDomainModal
            setShowDeleteDomainModal={setShowDeleteDomainModal}
            showDeleteDomainModal={showDeleteDomainModal}
            onDelete={handleDelete}
          />
          <ResolveDomainModal
            key={resolveId}
            setShowResolveDomainModal={setShowResolveDomainModal}
            showResolveDomainModal={showResolveDomainModal}
            resolveId={resolveId}
            verificationErrors={resolveErrors}
            fetchData={fetchData}
          />
        </div>
      </div>
    </div>
  );
};

export default Domains;
