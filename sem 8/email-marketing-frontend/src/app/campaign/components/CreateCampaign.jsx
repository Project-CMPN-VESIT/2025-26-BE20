import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/form-elements/Button';
import {Checkbox } from '../../../components/form-elements/Checkbox';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';
import authAxios from '../../../config/AuthAxios'


const CreateCampaign = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    campaignName: '',
    subject: '',
    senderName: '',
    senderEmail: '',
    preheader: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [segments, setSegments] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [segPage, setSegPage] = useState(1);
  const [segmentPaginator, setSegmentPaginator] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(''); 
  const [allSegments, setAllSegments] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const res = await authAxios.get(`/segments?page=${segPage}`);
        const paginator = res?.data?.data; 
        setSegments(paginator?.data || []); 
        setSegmentPaginator(paginator || null); 
      } catch (err) {
        toast.error("Failed to load segments");
        setSegments([]);
        setSegmentPaginator(null);
      }
    };

    fetchSegments();
  }, [segPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearch) {
      setAllSegments([]); 
      return;
    }

    const fetchAllSegments = async () => {
      try {
        let page = 1;
        let lastPage = 1;
        let collected = [];

        do {
          const res = await authAxios.get(`/segments?page=${page}`);
          const paginator = res?.data?.data;

          collected = [...collected, ...(paginator?.data || [])];
          lastPage = paginator?.last_page || 1;
          page++;
        } while (page <= lastPage);

        setAllSegments(collected);
      } catch {
        setAllSegments([]);
      }
    };

    fetchAllSegments();
  }, [debouncedSearch]);
  

  const filteredSegments =(debouncedSearch ? allSegments : segments).filter((seg) =>
    seg.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const onEmojiClick = (emojiData) => {
  setFormData((prev) => ({
    ...prev,
    subject: prev.subject + emojiData.emoji,
  }));
  setShowEmojiPicker(false);
};

  const toggleSegment = (id) => {
    setSelectedSegments((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCreateCampaign = async () => {
    if (!formData.campaignName || !formData.subject) {
      toast.error("Campaign name & subject required");
      return;
    }

    if (
    selectedSegments.length === 0
  ) {
    toast.error("Please Select at least one segment");
    return;
  }
    const payload = {
      name: formData.campaignName,
      subject: formData.subject,
      preheader: formData.preheader,
      segment_ids: selectedSegments,
      from_name: formData.senderName,
      from_email: formData.senderEmail,
      reply_to_email: formData.senderEmail,
    };
    if (!formData.senderEmail) {
  toast.error("Sender email is required");
  return;
}

console.log("FINAL PAYLOAD ", payload);
    

    try {
      setLoading(true);
      const res = await authAxios.post(
        "/campaign/create-campaign",
        payload
      );
      const campaignId = res?.data?.data?.campaign?.id;
      localStorage.setItem(
        "campaignMeta",
        JSON.stringify({
          id: campaignId,
          segment_ids: payload.segment_ids,
        })
      );
      toast.success("Campaign created successfully");
      navigate(`/templates?from=campaign&campaignId=${campaignId}`);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to create campaign"
      );
    } finally {
      setLoading(false);
    }
  };

  let recipientText = "";
    recipientText = `${selectedSegments.length} segments selected`;


  return (
    <div className="relative">
      <Toaster position="top-center" reverseOrder={false} />
      {loading && (
      <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
        <div className="bg-white px-5 py-3 rounded-md shadow flex items-center gap-3">
          <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></span>
          <p className="text-sm font-medium text-gray-700">
            Loading...
          </p>
        </div>
      </div>
    )}

    <div className="p-6 bg-gray-50 min-h-screen" >
    <div className="p-6">

      
      <h1 className="text-2xl font-bold mb-1 text-left">Campaign details</h1>
      <p className="mb-6 text-sm text-gray-600 text-left">
        Enter 'Subject' and other sending details. Check preview at the bottom to see how your campaign looks.
      </p>

      <div className="flex gap-6 w-full">
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 p-6 rounded-lg" >
        <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700 text-left">Campaign Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter campaign Name"
              value={formData.campaignName}
              onChange={handleChange}
              name="campaignName"
              data-test-id="input-campaign-name"
            />
          </div>
        <label className="block mb-1 font-medium text-gray-700 text-left">Subject</label>
        <div className="flex items-center mb-4">
          <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleChange}
              name="subject"
              data-test-id="input-subject"
            />
          <button 
            className=" text-xl px-0.5 pt-1 pb-0.5 bg-gray-200 rounded border border-gray-300" 
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            😊
          </button>
          {showEmojiPicker && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowEmojiPicker(false)}
            />
            <div
              className="absolute top-12 right-0 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                height={350}
                width={400}
              />
            </div>
          </>
)}
        </div>
        <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700 text-left">Sender Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter Sender Name"
              value={formData.senderName}
              onChange={handleChange}
              name="senderName"
              data-test-id="input-sender"
            />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 text-left">Sender Email</label>
              <input
                type="email"                          
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter Sender Email"
                value={formData.senderEmail}          
                onChange={handleChange}               
                name="senderEmail"                   
                data-test-id="input-sender-email"
              />
            </div>
          
        <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700 text-left">Pre-Header</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter Pre Header"
              value={formData.preheader}
              onChange={handleChange}
              name="preheader"
              data-test-id="input-preheader"
            />
          </div>
        <div className="flex justify-between mb-1 items-center ">
          <label className="block font-medium text-gray-700 text-left">Recipients</label>
          {/* <Button
          type="button"
          styleClass="text-xs text-white p-1 ml-1 bg-gray-200 rounded border bg-primary border-gray-300"
          label="Edit recipients"
          onClick={() => setShowModal(true)}
          data-test-id="edit-recipitents button"
        /> */}
      </div>
        <input
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer"
              placeholder="Select Recipients"
              value={recipientText}
              onClick={() => setShowModal(true)}
              data-test-id="input-recipients"
            />
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white w-[70vw] max-w-4xl min-h-[350px] max-h-[80vh] border border-gray-200 p-5 flex flex-col rounded">
              
                 <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Segments</h2>
                 <input
                  type="text"
                  placeholder="Search segments..."
                  className="w-full mb-5 px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="overflow-y-auto border border-gray-200 rounded-sm flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  <table className="min-w-full text-sm text-left mb-4 border border-gray-300">
                    <thead className="border-b border-gray-300">
                      <tr className="text-primary">
                        <th className="pl-4 pr-4 pt-2 pb-2">Select</th>
                        <th className="pl-4 pr-4 pt-2 pb-2">Segment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSegments && filteredSegments.length > 0 ? (filteredSegments.map((seg, i) => (
                        <tr key={i} className="border-b border-gray-200">
                          <td className="pl-4 pr-4 pt-2 pb-2">
                            <Checkbox
                              name={`segment-${seg.id}`}
                              checked={selectedSegments.includes(seg.id)}
                              register={() => ({ onChange: () => toggleSegment(seg.id) })}
                            />
                          </td>
                          <td className="pl-4 pr-4 pt-2 pb-2">{seg.name}</td>
                        </tr>
                      ))
                      ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4 text-gray-500">
                        No segments found
                      </td>
                    </tr>
                  )
                      }
                    </tbody>
                  </table>
                  </div>
                  {segmentPaginator && !debouncedSearch &&  (
                    
                    <div className="flex justify-center gap-12 mt-3">
                      <Button
                        label="Prev"
                        styleClass="text-white bg-primary mt-4 px-5 py-2 rounded"
                        disabled={segmentPaginator.current_page === 1}
                        onClick={() => setSegPage(segmentPaginator.current_page - 1)}
                      />

                      <span className="text-sm px-2 flex items-center">
                        Page {segmentPaginator.current_page} /{" "}
                        {segmentPaginator.last_page}
                    </span>
                      <Button
                        label="Next"
                        styleClass="text-white bg-primary mt-4 px-5 py-2 rounded"
                        disabled={segmentPaginator.current_page ===segmentPaginator.last_page}
                        onClick={() => setSegPage(segmentPaginator.current_page + 1)}
                      />
                    </div>
)}
              <div className="flex justify-end  gap-3 ">
               <Button 
                type="button"
                styleClass=" border  bg-white mt-4 px-5 py-2 rounded"
                label="Close"
                onClick={() => setShowModal(false)}
                data-test-id="close-button"
              />
                <Button
                type="button"
                styleClass="text-white bg-primary mt-4 px-5 py-2 rounded "
                label="Confirm"
                onClick={() => setShowModal(false)}
                data-test-id="confirm-button"
              />
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
      <div className=" border border-gray-300 rounded-lg ">
        <div data-test-id="inbox-preview" className="border-b  border-gray-300 px-4 pt-2 text-sm font-medium flex items-center ">
          <i className="ri-mail-line mr-2 "></i>
          Inbox preview
        </div>
        <div className="px-4 py-3">
          <div className=" pl-4 pt-2 pb-0.5 ">
            <hr  className="w-100 h-2  bg-gray-100 border-0 rounded-sm md:my-3 bg-gray-300"></hr>
            <hr className="w-125 h-2 mb-3  bg-gray-100 border-0 rounded-sm bg-gray-200"></hr>
          </div>
          <div className=" pl-4 pb-0.5">
            <hr  className="w-100 h-2  bg-gray-100 border-0 rounded-sm md:my-3 bg-gray-300"></hr>
            <hr className="w-125 h-2 mb-3  bg-gray-100 border-0 rounded-sm bg-gray-200"></hr>
          </div>

          <div className=" pl-4 pb-2">
            <hr  className="w-100 h-2  bg-gray-100 border-0 rounded-sm md:my-3 bg-gray-300"></hr>
            <hr className="w-125 h-2 mb-3  bg-gray-100 border-0 rounded-sm bg-gray-200"></hr>
          </div>
          <div className="border-l-4 border-primary pl-4 py-2 bg-white shadow rounded" > 
            <h2 data-test-id="preview-sender" className="text-sm text-left font-bold text-black">
              {formData.senderName || "Sender name"}
            </h2>
            <p data-test-id="preview-subject" className="text-sm text-left text-gray-700">
              {formData.subject || "Subject "}
            </p>
            <p data-test-id="preview-campaign" className="text-xs text-left text-gray-500">
              {formData.campaignName || "Campaign name "}
            </p>
          </div>
          <div className=" pl-4 pt-2 pb-0.5 ">
            <hr  className="w-100 h-2  bg-gray-100 border-0 rounded-sm md:my-3 bg-gray-300"></hr>
            <hr className="w-125 h-2 mb-3  bg-gray-100 border-0 rounded-sm bg-gray-200"></hr>
          </div>
          <div className=" pl-4 pb-0.5">
            <hr  className="w-100 h-2  bg-gray-100 border-0 rounded-sm md:my-3 bg-gray-300"></hr>
            <hr className="w-125 h-2 mb-3  bg-gray-100 border-0 rounded-sm bg-gray-200"></hr>
          </div>
          
          
        </div>
      </div>
      </div>
      </div>
      <div className="flex justify-end">
      <Button
        label={loading ? "Creating..." : "Next"} 
        type="button"
        onClick={handleCreateCampaign}
        disabled={loading}
        styleClass="text-white bg-primary mt-4 px-5 py-2 rounded"
        data-test-id="next-button"
      />
      </div>

    </div>
  </div>
  </div>
  );
};

export default CreateCampaign;
