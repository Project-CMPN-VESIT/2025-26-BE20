import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import authAxios from "../../../config/AuthAxios";
import { RadioButton } from "../../../components/form-elements/RadioButton";
import { Button } from "../../../components/form-elements/Button";
import toast from "react-hot-toast";

const formatWithTimezone = (date) => {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");

  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0") +
    "T" +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0") +
    ":00" +
    sign +
    hours +
    ":" +
    minutes
  );
};
const CampaignReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [campaignHtml, setCampaignHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [editType, setEditType] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
   const { register, watch } = useForm(); 
   const selectedOption = watch("sendOption");

  useEffect(() => {
     const fetchCampaign = async () => {
        try {
          const res = await authAxios.get(`/campaign/get-campaign/${id}`);
          setCampaign(res.data.data.campaign);
          setCampaignHtml(res.data.data.campaign.email_content);
        } catch (err) {
          toast.error("Failed to load campaign");
        }
      };
      fetchCampaign();
  }, [id]);

  const handleUpdate = async () => {
  try {
    setLoading(true);

    const meta = JSON.parse(localStorage.getItem("campaignMeta"));

    if (!meta?.segment_ids?.length) {
      toast.error("Segment data missing. Please go back.");
      return;
    }

    const payload = {
      name: campaign.name,
      subject: campaign.subject,
      preheader: campaign.preheader,
      segment_ids: meta.segment_ids, 
      from_name: campaign.from_name,
      from_email: campaign.from_email,
      reply_to_email: campaign.reply_to_email,
      [editType]: editValue,
    };

    payload[editType] = editValue;

    await authAxios.put(
      `/campaign/update-campaign/${id}`,
      payload
    );

    setCampaign((prev) => ({
      ...prev,
      [editType]: editValue,
    }));

    setEditType(null);
    toast.success("Updated successfully");
  } catch (err) {
    console.log(err.response?.data);
    toast.error("Update failed");
  } finally {
    setLoading(false);
  }
};

  const handleSend = async () => {
    try {
      if (!selectedOption) {
        toast.error("Please select Send option");
        return;
      }

      let sendAt = "";
      if (selectedOption === "now") {
        sendAt = formatWithTimezone(new Date());
      }
      if (selectedOption === "later") {
        if (!scheduleTime) {
          toast.error("Please select date & time");
          return;
        }
        sendAt = formatWithTimezone(new Date(scheduleTime));
      }

      await authAxios.post(`/campaign/schedule-campaign/${id}`, {
        send_at: sendAt,
      });

      toast.success(
        selectedOption === "now"
          ? "Campaign sent successfully"
          : "Campaign scheduled successfully"
      );
       navigate("/campaigns");
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Failed to send campaign");
    }
  };

  if (!campaign) return null;

  return (
    <div className="max-w-6xl bg-white mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Campaign details</h2>
        <Button label="Send" styleClass="text-white bg-primary px-4 py-2 rounded" onClick={handleSend} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <DetailRow
            label="Subject"
            value={campaign.subject}
            onEdit={() => {
              setEditType("subject");
              setEditValue(campaign.subject);
            }}
          />

          <DetailRow
            label="Sender"
            value={`${campaign.from_name} (${campaign.from_email})`}
            onEdit={() => {
              setEditType("from_name");
              setEditValue(campaign.from_name);
            }}
          />

          <DetailRow
            label="Reply to"
            value={campaign.reply_to_email}
            onEdit={() => {
              setEditType("reply_to_email");
              setEditValue(campaign.reply_to_email);
            }}
          />

          <DetailRow
            label="Recipients"
            value={`${campaign.total_recipients} recipients`}
            // onEdit={() => navigate(`/campaigns/edit-recipients/${id}`)}
          />
        </div>
        

        <div className="border border-gray-300 rounded-lg p-4 cursor-pointer">
          <div
            className="cursor-pointer text-center font-semibold"
            onClick={() => {
              if (!campaign?.email_template_id) {
                toast.error("No template attached to this campaign");
                return;
              }
              navigate(
                `/templates/${campaign.email_template_id.id}/content?from=campaign&campaignId=${id}&custom=${campaign.email_template_id.id}`
              );

            }}

          >
            Preview / Edit Template
          </div>
          <div className="h-60 border-2 border-dashed border-gray-300 mt-3"></div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Schedule your campaign</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label
            className={`cursor-pointer border rounded-lg p-5 transition-all
              ${
                selectedOption === "now"
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-gray-400"
              }`}
          >
            <div className="flex items-start gap-4">
              <RadioButton
                name="sendOption"
                value="now"
                register={register}
                checked={selectedOption === "now"}
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-send-plane-line text-lg text-primary" />
                  <h3 className="font-semibold">Send now</h3>
                </div>
                <p className="text-sm text-gray-500">
                  Campaign will be sent immediately
                </p>
              </div>
            </div>
          </label>
          <label
            className={`cursor-pointer border rounded-lg p-5 transition-all
              ${
                selectedOption === "later"
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-gray-400"
              }`}
          >
            <div className="flex items-start gap-4">
              <RadioButton
                name="sendOption"
                value="later"
                register={register}
                checked={selectedOption === "later"}
              />

              <div className="w-full">
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-time-line text-lg text-primary" />
                  <h3 className="font-semibold">Send later</h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Schedule campaign for a future date & time
                </p>
                {selectedOption === "later" && (
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                )}
              </div>
            </div>
          </label>
        </div>
      </div>

      {editType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="font-bold mb-3">Edit</h3>
            <input
              className="w-full border px-3 py-2 mb-4"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button label="Cancel" styleClass="text-gray bg-white px-4 py-2 border border-gray rounded" onClick={() => setEditType(null)} />
              <Button label="Save" styleClass="text-white bg-primary px-4 py-2 rounded" onClick={handleUpdate} loading={loading} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value, onEdit }) => (
  <div className="border-b border-gray-300 pb-3 flex justify-between">
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <div className="text-sm">{value || "Not added"}</div>
    </div>
    {onEdit && <button className="text-sm hover:underline" onClick={onEdit}>Edit</button>}
  </div>
);

const ScheduleCard = ({ label, value, icon, register, selected }) => (
  <div className="border border-gray-300 rounded-lg p-4 relative">
    <div className="absolute top-4 right-4">
      <RadioButton name="sendOption" value={value} register={register} checked={selected === value} />
    </div>
    <div className="flex items-start gap-3">
      <i className={`${icon} text-xl`} />
      <h3 className="font-bold">{label}</h3>
    </div>
  </div>
);



export default CampaignReview;
