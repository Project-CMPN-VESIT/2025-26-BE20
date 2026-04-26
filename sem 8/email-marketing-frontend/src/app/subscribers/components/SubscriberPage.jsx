import React, { useState } from "react";
import { Button } from "../../../components/form-elements/Button";
import { useNavigate } from "react-router-dom";
import SubscriberNav from "./SubscriberNav";
import { useFetchAuth } from "../../../hooks/useFetchAuth";
import Table from "./Table";
import TableSkeleton from "../../../components/skeletons/TableSkeleton";
const SubscriberPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [submittedSearchValue, setSubmittedSearchValue] = useState("");


  // const { data, loading, error } = useFetchAuth(`/contacts?page=${page}`);
  const {
    data: contactsData,
    loading: contactsLoading,
    error: contactsError,
  } = useFetchAuth(`/contacts?page=${page}`);

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useFetchAuth(
    isSearching
      ? `/contacts/search-contacts?value=${submittedSearchValue}&page=${searchPage}`
      : null
  );



  const columns = [
    { label: "Email", key: "email" },
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
  ];

  const goToPrevious = () => {
    if (isSearching) {
      setSearchPage((p) => Math.max(1, p - 1));
    } else {
      setPage((p) => Math.max(1, p - 1));
    }
  };

  const goToNext = () => {
    if (!tableData) return;

    if (isSearching) {
      setSearchPage((p) => Math.min(tableData.last_page, p + 1));
    } else {
      setPage((p) => Math.min(tableData.last_page, p + 1));
    }
  };


  const tableData = isSearching ? searchData : contactsData;
  const loading = isSearching ? searchLoading : contactsLoading;



  return (
    <div className="pl-1 pt-8">
      <nav>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Subscribers</span>
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Button
              type="button"
              styleClass="cursor-pointer w-full p-2 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg"
              label="Add Subscribers"
              onClick={() => navigate("/subscribers/add")}
              data-test-id="add-subscriber-button"
            />
          </div>
        </div>
      </nav>

      {/* searchbar */}
      <div className="mt-6 flex items-center gap-3">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search subscribers..."
          className="w-full md:w-80 border border-gray-300 px-4 py-2 rounded-lg
               focus:outline-none focus:ring-1 focus:ring-primary"
        />

        <Button
          label="Search"
          onClick={() => {
            if (!searchValue.trim()) return;
            setSubmittedSearchValue(searchValue);
            setIsSearching(true);
            setSearchPage(1);
          }}

          styleClass="px-4 py-2 text-white rounded-lg bg-primary"
        />


        {isSearching && (
          <button
            onClick={() => {
              if (!searchValue.trim()) return;
              setSearchValue("");
              setSubmittedSearchValue("");
              setIsSearching(false);
              setSearchPage(1);
              setPage(1);

            }}

            className="text-sm text-gray-500 hover:underline"
          >
            Clear
          </button>

        )}
      </div>


      {/* <SubscriberNav /> */}
      <div className="mt-3 bg-white p-6 mb-10 rounded shadow">

        {loading && (
          <TableSkeleton rows={5} columns={3} />
        )}

        {!loading && tableData?.data?.length === 0 && (
          <p className="text-gray-500">No subscribers yet.</p>
        )}

        {!loading && tableData?.data?.length > 0 && (
          <>
            <Table
              columns={columns}
              data={tableData.data}
              dataTestId="subscriber"
            />

            <div className="mt-6 flex items-center justify-between gap-2
                border-t border-gray-200 pt-4 overflow-x-auto">

              <button
                label="← Previous"
                disabled={!tableData.prev_page_url}
                onClick={goToPrevious}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium whitespace-nowrap
      ${!tableData.prev_page_url
                    ? "!bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:opacity-90"}
    `}
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-700 flex-shrink-0">
                <span className="font-medium">
                  <span className="pr-2">Page</span>{tableData.current_page}
                </span>
                <span>/</span>
                <span className="font-medium">
                  {tableData.last_page}
                </span>
              </div>

              <button
                disabled={!tableData.next_page_url}
                onClick={goToNext}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium whitespace-nowrap
      ${!tableData.next_page_url
                    ? "!bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:opacity-90"}
    `}
              >Next →</button>

            </div>

          </>

        )}

      </div>
    </div>

  );
};

export default SubscriberPage;
