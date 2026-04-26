import React, { useEffect, useState } from "react";
import { Button } from "../../../components/form-elements/Button";
import DragDropSvg from "../../../assets/templates-section/drag-and-drop.svg";
import PreviewTemplate from "../components/TemplatePreviewCard";
import { useNavigate, useParams ,useSearchParams} from "react-router-dom";
import authAxios from "../../../config/AuthAxios";
import Loader from "../../../components/Loader";

const ChooseTemplate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromCampaign =  searchParams.get("from") === "campaign";
  const campaignId = searchParams.get("campaignId");
  
  const param = useParams();

  const handleChooseClick = (id) => {
    navigate(`/templates/${id}/content?custom=${id}${
        fromCampaign ? `&from=campaign&campaignId=${campaignId}` : ""
      }`);
  };

  const [predefinedTemplates, setPredefinedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPredefinedTemplates() {
      setLoading(true);
      const data = await authAxios.get("/predefined_templates/");

      if (data.status === 200) {
        setLoading(false);
        setPredefinedTemplates(data.data.data.data);
      } else {
        setPredefinedTemplates([]);
      }
    }

    fetchPredefinedTemplates();
  }, []);
  return (
    <div className="my-10">
      <div>
        <div className="flex flex-col">
          <p className="text-3xl md:text-2xl font-semibold mb-5 dark:text-white">
            Create a Template
          </p>
          <div className="flex flex-col md:flex-row bg-white dark:bg-dark-secondary rounded-xl p-6 gap-6 items-center mb-10">
            <img
              src={DragDropSvg}
              alt="Drag and Drop Thumbnail"
              className="w-64 bg-gray-100 rounded-lg p-2"
            />
            <div className="flex flex-col">
              <p className="font-semibold text-lg dark:text-white mb-3">
                Drag and Drop Editor
              </p>
              <p className="text-base text-gray-800 mb-3 dark:text-gray-500">
                Design like a pro with our easy-to-use visual editor. Drag,
                drop, and customize content blocks to build responsive emails
                that look perfect on every device. Fast, flexible, and fun to
                use!
              </p>
              <Button
                label={"Choose"}
                styleClass={
                  "text-white px-5 py-2 rounded-md text-base cursor-pointer transition-effect hover:bg-primary-900"
                }
                onClick={() =>navigate(`/templates/${param.id}/content?custom=${param.id}${
                    fromCampaign ? `&from=campaign&campaignId=${campaignId}` : ""}`
                )}
              ></Button>
            </div>
          </div>
          <div className="bg-white p-6 lg:p-8 rounded-xl dark:bg-dark-secondary">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:flex-row xl:flex-wrap xl:gap-2 gap-4 lg:gap-8 mb-8">
              {predefinedTemplates.length > 0 ? (
                predefinedTemplates.map((template) => (
                  <PreviewTemplate
                     key={template.id}
                    template={template}
                    onClick={handleChooseClick}
                  />
                ))
              ) : loading ? (
                <div className="w-full col-span-full">
                  <Loader text="Templates Loading.." />
                </div>
              ) : (
                <div className="flex justify-center">
                  <p className="text-amber-600 font-medium text-2xl">
                    No Templates Found
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center border-t-2 border-t-gray-200 pt-5 ">
              <p className="text-gray-700 dark:text-gray-500">
                Showing{" "}
                <span className="text-black dark:text-gray-200 font-medium">
                  61
                </span>{" "}
                to{" "}
                <span className="text-black font-medium dark:text-gray-200">
                  72
                </span>{" "}
                of{" "}
                <span className="text-black dark:text-gray-200 font-medium">
                  94
                </span>{" "}
                results
              </p>
              <div className="flex flex-row gap-3 justify-stretch">
                <Button
                  label={"Previous"}
                  styleClass={
                    "flex-1 py-2 px-4 text-sm font-medium !bg-gray-300 rounded-md text-gray-800 cursor-pointer w-[90px] hover:!bg-gray-200"
                  }
                />
                <Button
                  label={"Next"}
                  styleClass={
                    "flex-1 py-2 px-4 text-sm font-medium !bg-gray-300 rounded-md text-gray-800 cursor-pointer w-[90px] hover:!bg-gray-200"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseTemplate;
