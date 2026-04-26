import { Button } from "../../../components/form-elements/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetchAuth } from "../../../hooks/useFetchAuth";
import TemplatePreviewCard from "../components/TemplatePreviewCard";
import { PreviewCardSkeleton } from "../components/PreviewCardSkeletion";

const MyTemplatesPage = () => {
  const navigate = useNavigate();
 const [searchParams] = useSearchParams();
  const fromCampaign = searchParams.get("from") === "campaign";
  const campaignId = searchParams.get("campaignId");
  const handleNewTemplateClick = () => {
    navigate(`/templates/create${fromCampaign ? `?from=campaign&campaignId=${campaignId}` : ""}`);
  };

  const handleChooseClick = (id) => {
    navigate(`/templates/${id}/content?custom=${id}${
        fromCampaign ? `&from=campaign&campaignId=${campaignId}` : ""
      }`);
  };

  const {
    data: customTemplates,
    error: customTemplateError,
    loading: customTemplateLoading,
  } = useFetchAuth("/custom_templates?per_page=15");

  console.log(customTemplateError);

  return (
    <div className="mx-2 my-10">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-3xl font-semibold">My Templates</h1>
        <Button
          label="New Template"
          styleClass="px-3 py-2 text-white text-lg rounded-md hover:bg-primary-900 transition-effect"
          onClick={handleNewTemplateClick}
        />
      </div>

      <div className="mt-4">
        {customTemplateLoading && (
          <div className="flex flex-wrap gap-6.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <PreviewCardSkeleton key={i}/>
            ))}
          </div>
        )}

        {customTemplateError && !customTemplateLoading && (
          <div className="rounded-lg border flex gap-2 border-red-200 bg-red-50 p-4 text-red-600">
            <i class="ri-error-warning-line"></i>
            <p>Failed to load templates.</p>
          </div>
        )}

        {!customTemplateLoading &&
          !customTemplateError &&
          customTemplates?.data?.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No templates yet. Create your first one ✨
            </div>
          )}

        {!customTemplateLoading &&
          !customTemplateError &&
          customTemplates?.data?.length > 0 && (
            <div className="flex flex-wrap gap-6.5">
              {customTemplates.data.map((template) => (
                <TemplatePreviewCard
                  key={template.id}
                  template={template}
                  onClick={handleChooseClick}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default MyTemplatesPage;
