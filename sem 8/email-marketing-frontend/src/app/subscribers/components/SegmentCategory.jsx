import React, { useEffect, useState } from 'react';
import { Link, replace, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Checkbox } from '../../../components/form-elements/Checkbox';
import { Select } from "../../../components/form-elements/Select";
import { Button } from '../../../components/form-elements/Button';
import { set, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import authAxios from '../../../config/AuthAxios';
import Table from './Table';
import { filter } from '@chakra-ui/system';
import TableSkeleton from '../../../components/skeletons/TableSkeleton';
import { div } from 'framer-motion/client';
import BreadcrumbSkeleton from '../../../components/skeletons/BreadcrumbSkeleton';

const SegmentCategory = () => {
  const { id: segmentId } = useParams();
  const [filteredSubscribers, setFilteredSubscribers] = useState([]); 
  const [filterValue, setFilterValue] = useState("");
  const [showResults, setShowResults] = useState(false); 
  const { register, getValues, setValue } = useForm();
  const [existingRule, setExistingRule] = useState(null);
const [isSavingChanges, setIsSavingChanges] = useState(false);
const [segmentName, setSegmentName] = useState("");
const [page, setPage] = useState(1);
const [categoryLoading, setCategoryLoading] = useState(false);
const [tableLoading, setTableLoading] = useState(false);
const [isExistingContacts, setIsExistingContacts] = useState(false);
const [contactNames, setContactNames] = useState();

const ITEMS_PER_PAGE = 10;

const [loadingFilter, setLoadingFilter] = useState(false);

const navigate = useNavigate();
const location = useLocation();

  const ruleOptions = [
    { name: "EQUALS", value: "EQUALS" },
    { name: "NOT EQUALS", value: "NOT EQUALS" },
    { name: "CONTAINS", value: "CONTAINS" },
    { name: "NOT CONTAINS", value: "NOT CONTAINS" },
    { name: "LIKE", value: "LIKE" },
  ];


useEffect(() => {
  const initPage = async () => {
    setCategoryLoading(true);

    try {
      // Fetch segment meta ONLY
      const res = await authAxios.get(
        `/segments/get-segment-rules/${segmentId}`
      );

      const { segment } = res.data.data;

      if (segment?.name) {
        setSegmentName(segment.name);
      }
    } catch (err) {
      console.error("Failed to load segment metadata", err);
    } finally {
      //stop breadcrumb loading immediately
      setCategoryLoading(false);
    }

    //Fetch contacts independently (non-blocking)
    fetchExistingContacts();
  };

  if (segmentId) {
    initPage();
  }
}, [segmentId]);


const paginatedData = filteredSubscribers.slice(
  (page - 1) * ITEMS_PER_PAGE,
  page * ITEMS_PER_PAGE
);

const fetchExistingContacts = async () => {
  setTableLoading(true);
  setShowResults(true);

  try {
    const res = await authAxios.get(
      `/segments/${segmentId}/exisiting-contacts`
    );

    setFilteredSubscribers(res.data.data.contacts || []);
    setContactNames("Saved")
    setIsExistingContacts(true);
    setPage(1);
  } catch (err) {
    console.error("Failed to fetch existing contacts:", err);
    setFilteredSubscribers([]);
  } finally {
    setTableLoading(false);
  }
};



const handleFilterApply = async () => {
  const selectedOperator = getValues("operator");
  console.log("Selected Operator:", selectedOperator);

  if (!selectedOperator || !filterValue || !segmentId) {
    toast.error("Please fill all fields");
    return;
  }

  setLoadingFilter(true);
  setTableLoading(true);

  try {
    await authAxios.post(`/segments/${segmentId}/rules`, {
      rules: [
        {
          field: "email",
          operator: selectedOperator,
          value: filterValue,
          condition_type: "OR",
        },
      ],
    });

    const res = await authAxios.post(`/segments/get-contacts`, { 
      segmentId,
      operator: selectedOperator, 
    });

    const contactList = res.data.data;

    setFilteredSubscribers(contactList);
    setContactNames("Filtered")
    setIsExistingContacts(false);
    setPage(1);      // reset page
    setShowResults(true);

  } catch (err) {
    console.error("Failed to filter:", err);
    setFilteredSubscribers([]);
    setShowResults(true);
  } finally {
    setLoadingFilter(false);
    setTableLoading(false);
  }
};

const handleClearFilter = async () => {
  // reset UI state
  setFilterValue("");
  setValue("operator", "");
  setPage(1);
  setShowResults(true);

  // fetch existing contacts again
  await fetchExistingContacts();
};



  const handleSubmitSelect = async () => {
    setIsSavingChanges(true);
    const ids = filteredSubscribers.map(c => c.id);
    try{
      await authAxios.post("/segments/save-contact", {
        segmentId,
        contactIds: ids,
      });
      toast.success("Contacts saved to segment");
    } catch (error) {
      console.error("Failed to save contacts:", error);
      toast.error("Saving contacts failed");
    } finally {
      setIsSavingChanges(false);
    }
  };
  const columns = [
    { label: "Email", key: "email" },
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
  ];

  return (
    <div className="pl-1 pt-10 mb-10">
      {categoryLoading ? (
        <BreadcrumbSkeleton/>
      ):(
                    <nav className="">
        <div className="">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li>
                <div className="flex items-center">
                  <Link 
                    to="/segment"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Segments
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <i class="ri-arrow-right-s-line"></i>
                  <Link 
                    // to={`/subscribers/segment/${segmentId}`}
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {segmentName}
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
          <div className="flex items-center ">
            <span className="text-2xl mt-3 font-bold text-gray-900 dark:text-white">
              {segmentName}
            </span>
          </div>
        </div>
      </nav>


      )}
     <div className="bg-white mt-7 p-6 md:p-8 border border-gray-200 rounded-lg mb-6 flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <Select
            label="Choose a Filter"
            name="operator"
            placeholder="Choose a filter"
            options={ruleOptions}
            register={register}
            validation={{ required: "Select filter" }}
            selectStyleClass="border-gray-300"
            labelStyleClass="text-gray-700 !text-md"
            data-test-id="choose-filter"
          />
        </div>
        <div className="col-md-12 mb-3 flex flex-col flex-1">
          <label className="block mb-2 text-gray-700 text-sm font-medium">Filter Value</label>
          <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="e.g. gmail.com"
            className="w-full border border-gray-300 px-4 py-[9px] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
            data-test-id="input-filter-value"
          />
        </div>
<div className="flex items-center gap-2 mb-3 h-full">
  <Button
    type="button"
    label={"Apply Filter"}
    styleClass={"text-white px-4 py-2 rounded bg-primary"}
    loading={loadingFilter ? "Filtering..." : null}
    onClick={handleFilterApply}
    data-test-id="apply-filter-button"
  />

  {(filterValue || getValues("operator")) && (
    <button
      type="button"
      onClick={handleClearFilter}
      title="Clear filters"
      className="p-2 rounded border border-gray-300 text-gray-500
                 hover:bg-gray-100 hover:text-gray-700 transition"
      data-test-id="clear-filter-button"
    >
      🗑
    </button>
  )}
</div>

      </div>
      {(tableLoading || showResults) && (
        <>
        <div data-test-id="results" className="bg-white p-4 rounded border border-gray-200">
          <h2 className="text-lg text-gray-700 font-normal mb-4"><span className=' text-2xl font-semibold text-gray-700'>{!tableLoading && filteredSubscribers.length}{" "}</span> {contactNames} Emails</h2>

           {tableLoading && <TableSkeleton rows={5} columns={3} />}

              {!tableLoading && filteredSubscribers.length > 0 && (<>
                
              <Table
                columns={columns}
                data={paginatedData}
                dataTestId="subscriber-row"
              />
              <div className="mt-6 flex items-center justify-between">

                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-3 py-1.5 bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer hover:opacity-90"
                >
                  ← Previous
                </button>

                <span>
                  Page {page} / {Math.ceil(filteredSubscribers.length / ITEMS_PER_PAGE)}
                </span>

                <button
                  disabled={page === Math.ceil(filteredSubscribers.length / ITEMS_PER_PAGE)}
                  onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1.5 bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer hover:opacity-90"
                >
                  Next →
                </button>

              </div>
              </>)}
            </div>

   {!tableLoading &&
  filteredSubscribers.length > 0 &&
  !isExistingContacts && (   // 👈 key condition
    <div className="flex justify-end mt-5 mb-5">
      <Button
        type="button"
        label="Save Selected Contacts"
        onClick={handleSubmitSelect}
        data-test-id="save-button"
        loading={isSavingChanges}
        styleClass="cursor-pointer w-full py-2.5 px-4 rounded-lg font-semibold
          bg-[#2F8481] border border-[#2F8481] text-white
          hover:bg-white hover:border hover:border-[#2F8481]
          hover:text-[#2F8481] transition-effect"
      />
    </div>
)}

              </>
      )}
    </div>
  );
};

export default SegmentCategory;
