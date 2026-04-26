import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/form-elements/Button';
import { set, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import SubscriberNav from './SubscriberNav';
import { useFetchAuth } from "../../../hooks/useFetchAuth";
import toast from "react-hot-toast";
import authAxios from "../../../config/AuthAxios";
import Table from "./Table";
import { CustomInput } from "../../../components/form-elements/CustomInput";
import TableSkeleton from '../../../components/skeletons/TableSkeleton';

const Segment = () => {
  const [openModal, setOpenModal] = useState(false);
  const [segment, setSegment] = useState("");
  const [storeSegments, setStoreSegments] = useState([]);
  const navigate = useNavigate();
  const { user } = useFetchAuth();
  // const orgId = user?.organization_id;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const goToPrevious = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const goToNext = () => {
    setPage((p) => Math.min(storeSegments.last_page, p + 1));
  };



  const fetchSegments = async () => {
    setLoading(true);
    try {
      const res = await authAxios.get(`/segments?page=${page}`);
      setStoreSegments(res.data.data);
    } catch (err) {
      toast.error("Failed to load segments");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSegments();
  }, [page]);

  const handleCreate = async (data) => {
    // if (!orgId) {
    //   toast.error("Organization ID not loaded yet. Please wait.");
    //   return;
    // }
    const segment = data.segment?.trim();
    if (!segment) {
      toast.error("Segment name cannot be empty");
      return;
    }

    try {
      await authAxios.post("/segments/create", { name: segment });
      toast.success("Segment created successfully");
      reset();
      setOpenModal(false);
      fetchSegments();
    } catch (err) {
      console.error("Create failed", err);
      toast.error("Failed to create segment");
    }
  };
  const ViewSegment = (segment) => {
    console.log("segment", segment);
    navigate(`/segment/${segment.id}`);
  };

  const columns = [
    { label: "Segment Name", key: "name" },
    {
      label: "Action",
      key: "action",
      render: (row, i) => (
        <Button
          type="button"
          styleClass="text-white px-3 py-1 rounded bg-primary"
          label="View Segment"
          onClick={() => ViewSegment(row)}
          data-test-id={`view-segment-${i}`}
        />
      )
    }
  ];

  return (
    <div className="pl-1 pt-8">
      <nav>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Segments</span>
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Button
              type="button"
              styleClass="cursor-pointer w-full p-2 rounded-lg font-semibold bg-[#2F8481] border border-[#2F8481] text-white font-bold rounded-full hover:bg-white hover:border hover:border-[#2F8481] hover:text-[#2F8481] transition-effect text-lg"
              label="Create Segment"
              onClick={() => setOpenModal(true)}
              data-test-id="create-segment-button"
            />
          </div>
        </div>
      </nav>

      {/* <SubscriberNav /> */}
      <div className="mt-6 bg-white mb-10 p-6 rounded shadow">
        {loading && (
          <TableSkeleton rows={5} columns={2} />
        )}
        {!loading && storeSegments?.data?.length > 0 && (
          <>
            <Table
              columns={columns}
              data={storeSegments.data}
              dataTestId="segment-row"
            />

            <div className="mt-6 flex items-center justify-between gap-2 border-t border-gray-200 pt-4 overflow-x-auto">

              <button
                disabled={!storeSegments.prev_page_url}
                onClick={goToPrevious}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium whitespace-nowrap
                  ${!storeSegments.prev_page_url
                    ? "!bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:opacity-90"
                  }
                `}
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-700 flex-shrink-0">
                <span className="font-medium">
                  <span className="pr-2">Page</span>{storeSegments.current_page}
                </span>
                <span>/</span>
                <span className="font-medium">{storeSegments.last_page}</span>
              </div>

              <button
                disabled={!storeSegments.next_page_url}
                onClick={goToNext}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium whitespace-nowrap
                  ${!storeSegments.next_page_url
                    ? "!bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:opacity-90"
                  }
               `}
              >
                Next →
              </button>

            </div>
          </>
        )}
        {!loading && storeSegments?.data?.length === 0 && (
          <p className="text-gray-500">No segments created yet.</p>
        )}
      </div>
      {openModal && (
        <div data-test-id="open-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
          <div className="bg-white p-6 rounded w-full max-w-md relative border border-gray-200">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
              data-test-id="exit"
            >
              <span aria-label="Close" role="button"><i className="ri-close-line"></i></span>
            </button>

            <h2 className="text-xl font-semibold mb-4">Create segment</h2>
            <form onSubmit={handleSubmit(handleCreate)}>
              <CustomInput
                label="Enter Segment Name"
                type="text"
                name="segment"
                placeholder="Enter segment name"
                register={register}
                validations={{ required: "Segment name is required" }}
                errors={errors}
                dataTestId="input-segment-name"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="gray-200"
                  styleClass="text-gray-700 rounded px-4 py-2"
                  label="Cancel"
                  onClick={() => setOpenModal(false)}
                  data-test-id="cancel-button"
                />
                <Button
                  type="submit"
                  styleClass="text-white rounded px-4 py-2 bg-primary"
                  label="Create"
                  data-testid="create-button"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Segment