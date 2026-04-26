import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/form-elements/Button";
import { useFetchAuth } from "../../../../hooks/useFetchAuth";
import "./../css/scrollbar.css";
import toast from "react-hot-toast";
import authAxios from "../../../../config/AuthAxios";

const ResolveDomainModal = ({
  showResolveDomainModal,
  setShowResolveDomainModal,
  resolveId,
  verificationErrors,
  fetchData,
}) => {
  const [currentRecord, setCurrentRecord] = useState(-1);
  const [expandedRecords, setExpandedRecords] = useState([0]);
  const [copied, setCopied] = useState({});
  const [domainErrors, setDomainErrors] = useState(null);

  useEffect(() => {
    if (showResolveDomainModal) {
      setDomainErrors(verificationErrors || null);
    }
  }, [showResolveDomainModal, resolveId, verificationErrors]);

  console.log("verificationErrors", verificationErrors);

  const errorMap = {
    "CNAME": domainErrors?.dkim,
    "TXT": domainErrors?.spf,
    "TXT (Verification)": domainErrors?.txt
  };


  const {
    data: dnsRecords,
    error,
    loading,
  } = useFetchAuth(`/domain/get-dns-records/${resolveId}`);

  useEffect(() => {
    if (!dnsRecords?.records) return;

    // finding indexes that have errors
    const indexesToExpand = dnsRecords.records
      .map((record, idx) => {
        const err = errorMap[record.type];
        return err ? idx : null;
      })
      .filter((v) => v !== null);

    // if no errors, defaulting to first record
    setExpandedRecords(indexesToExpand.length ? indexesToExpand : [0]);

  }, [dnsRecords, domainErrors]);

  const expandOrCollapseRecord = (id) => {
    if (expandedRecords.indexOf(id) === -1) {
      setExpandedRecords([...expandedRecords, id]);
    } else {
      setExpandedRecords(expandedRecords.filter((recordId) => recordId != id));
    }
  };

  useEffect(() => {
    setCurrentRecord(-1);
    setExpandedRecords([0]);
  }, [showResolveDomainModal]);

  useEffect(() => {
    if (expandedRecords.indexOf(currentRecord + 1) === -1) {
      setExpandedRecords([...expandedRecords, currentRecord + 1]);
    }
  }, [currentRecord]);

  const handleVerifyDomain = async (e, id, index) => {
    e.preventDefault();
    try {
      const response = await authAxios(`/domain/verify-domain/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
      });
      if (response.status === 200) {
        setDomainErrors(null);
        setCurrentRecord(index);
        toast.success("Domain Verified Successfully");
        setShowResolveDomainModal(false);
        fetchData();
      }
    } catch (e) {
      const apiErrors = e?.response?.data?.errors;

      if (apiErrors) {
        // Replacing displayed errors with new ones from backend
        setDomainErrors(apiErrors);
      }

      toast.error(e?.response?.data?.message || "Could not resolve domain");
    }

  };

  const handleCopy = async (textToCopy, id, isName) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied({ ...copied, id: id, isName: isName });
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const hasError = (record) => {
    return Boolean(errorMap[record.type]);
  };

  const hasAnyErrors =
    Boolean(domainErrors?.dkim || domainErrors?.spf || domainErrors?.txt);


  return (
    <div>
      <div
        id="default-modal"
        tabindex="-1"
        aria-hidden="true"
        d className={`overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black/20 dark:bg-black/10 mb-20 ${showResolveDomainModal ? "" : "hidden"
          }`}
      >
        <div className="relative p-4 w-full md:max-w-3xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex flex-col gap-2 p-4 md:px-5 md:py-4 border-b rounded-t dark:border-gray-600 border-gray-200">
              <div className="flex items-center justify-between items-center ">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Resolve Domain
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-primary rounded-lg text-sm p-2 justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <i
                    className="ri-close-line ri-xl cursor-pointer"
                    onClick={() => {
                      setShowResolveDomainModal(false);
                      fetchData()
                    }
                    }
                  ></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            {/* <!-- Modal body --> */}
            <div className="mb-5 mt-2 p-4 md:px-5 md:py-4 flex flex-col">
              <p className="text-gray-400 text-base font-normal">
                Resolving your domain ensures emails are sent from the correct
                servers, boosting deliverability and avoiding spam.
              </p>
              <div>
                {loading && (
                  <div className="flex justify-center text-base my-5">
                    <p>Loading...</p>
                  </div>
                )}
                {error && (
                  <div className="flex justify-center text-center mx-auto mt-5">
                    <p>
                      Error while fetching DNS records. Please refresh the page.
                    </p>
                  </div>
                )}
                {dnsRecords?.records &&
                  dnsRecords.records.map((record, key) => (
                    <div className="my-5 border-b-1 border-gray-200 pb-3" key={key}>
                      <div
                        className="flex gap-3 md:gap-2 cursor-pointer md:items-center mb-5"
                        onClick={() => expandOrCollapseRecord(key)}
                      >
                        <span
                          className={`p-2 w-9 h-9 flex items-center justify-center rounded-full border-2
    ${hasError(record)
                              ? "bg-red-100 border-red-300"
                              : currentRecord >= key
                                ? "bg-green-400 border-green-400"
                                : "border-gray-200"
                            }`}
                        >
                          {hasError(record) ? (
                            <i className="ri-close-line text-red-600"></i>
                          ) : currentRecord >= key ? (
                            <i className="ri-check-line text-white"></i>
                          ) : (
                            `${key + 1}`
                          )}
                        </span>

                        <div className="flex flex-col">
                          <p
                            className={` font-normal text-lg ${expandedRecords.indexOf(key) == -1
                                ? "text-gray-400 dark:text-gray-400"
                                : "text-gray-800 dark:text-gray-100"
                              }`}
                            data-test-id={`record-type-${key}`}
                          >
                            Create <span>{record.type}</span> record
                          </p>
                          {expandedRecords.indexOf(key) !== -1 && (
                            <p className={`text-sm text-gray-700 dark:text-gray-300`}>
                              Add a new record with values provided below.
                            </p>
                          )}
                        </div>
                      </div>

                      {expandedRecords.indexOf(key) !== -1 && (
                        <>

                          {errorMap[record.type] && (
                            <div className="mb-3 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                              <i className="ri-error-warning-line text-red-600"></i>
                              {errorMap[record.type].message}
                            </div>
                          )}
                          <div className="grid md:grid-cols-2 gap-4 transition-effect">
                            <div className="flex flex-col gap-2">
                              <span className="font-normal">Name</span>
                              <div className="p-5 bg-gray-700 dark:bg-dark-secondary whitespace-nowrap text-white relative rounded-md md:min-h-30 max-w-full">
                                <pre className="block overflow-x-auto max-w-full font-normal text-base tracking-wide scrollbar pb-1 mb-2 break-all" data-test-id={`record-name-${key}`}>
                                  {record.name}
                                </pre>
                                <div className="flex justify-end absolute right-2 bottom-2 cursor-pointer" onClick={() => handleCopy(record.name, key, true)}>
                                  <p className=" text-xs font-normal bg-white text-black w-fit px-2 py-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-400 md:whitespace-nowrap">
                                    <i className="ri-clipboard-fill ri-md"></i>{" "}
                                    {copied.id === key && copied.isName ? "Copied" : "Copy"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <span className="font-normal">Value</span>
                              <div className="p-5 pt-8 bg-gray-700 dark:bg-dark-secondary relative text-white rounded-md md:min-h-30 max-w-full">
                                <p className="overflow-x-auto max-w-full block pb-1 scrollbar font-normal text-base md:whitespace-nowrap break-all tracking-wide mb-7" data-test-id={`domain-value-${key}`}>
                                  {record.value}
                                </p>
                                <div className="flex justify-end absolute right-2 bottom-2 cursor-pointer" onClick={() => handleCopy(record.value, key, false)}>
                                  <p className="text-xs font-normal bg-white text-black w-fit px-2 py-1 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-400">
                                    <i className="ri-clipboard-fill ri-md"></i>{" "}
                                    {copied.id === key && copied.isName === false ? "Copied" : "Copy"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {key != dnsRecords.records.length - 1 && (
                              <Button
                                label={`Next: Create ${dnsRecords.records[key + 1].type
                                  } record`}
                                styleClass={
                                  "p-2 text-white rounded-md text-base hover:bg-primary-900 dark:hover:opacity-50 cursor-pointer transition-effect"
                                }
                                type={"button"}
                                onClick={() => setCurrentRecord(key)}
                              />
                            )}
                          </div>
                          {key === dnsRecords.records.length - 1 && (
                            <form
                              onSubmit={(e) => handleVerifyDomain(e, resolveId, key)}
                              data-test-id="domain-resolve"
                              className="mt-4"
                            >
                              {hasAnyErrors && (
                                <div className="mt-7 mb-4 border-1 border-amber-200 bg-amber-50 p-3 rounded-md text-red-700 flex items-center gap-2">
                                  <p className="text-sm text-sm text-amber-800">
                                    Your records haven't been authenticated yet. It can take up to 24 hours for authentication, but usually takes just a couple of hours.
                                  </p>
                                </div>
                              )}

                              <Button
                                label="Resolve Domain"
                                styleClass="p-2 text-white rounded-md text-base cursor-pointer hover:bg-primary-900 dark:hover:opacity-50 transition-effect"
                                type="submit"
                              />
                            </form>
                          )}
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolveDomainModal;
