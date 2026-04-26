import { useEffect, useRef, useState } from "react";
import EmailEditor, { } from "react-email-editor";
import { Button } from "./../../../components/form-elements/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import authAxios from "../../../config/AuthAxios";
import toast, { Toaster } from "react-hot-toast";

const DragDrop = () => {
  const navigate = useNavigate();
  const emailEditorRef = useRef(null);
  const param = useParams();
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const fromCampaign = searchParams.get("from") === "campaign";


  const currentPreDefinedTemplateId = param.id;
  const currentCustomTemplateId = searchParams.get("custom");


  const[currentCustomTemplateName,setCurrentCustomTemplateName] = useState('');
  const[currentCustomTemplateCategoryId,setCurrentCustomTemplateCategoryId] = useState('');
  

  const handleUndo = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.editor.undo();
    }
  };

  useEffect(() => {
    if (!fromCampaign || !currentCustomTemplateId || currentCustomTemplateId === currentPreDefinedTemplateId) return;
    const fetchCustomTemplate = async() =>{
      const response = await authAxios.get(`/custom_templates/${currentCustomTemplateId}`);
      if(response.status === 200){
        setCurrentCustomTemplateName(response.data.data.name);
        setCurrentCustomTemplateCategoryId(response.data.data.category.id)
      }
    }

    fetchCustomTemplate();
  },[fromCampaign, currentCustomTemplateId]);
  
useEffect(() => {
  if (!fromCampaign || !campaignId || !emailEditorRef.current) return;

  const loadCampaignTemplateDesign = async () => {
    try {
      const { data } = await authAxios.get(
        `/campaign/get-campaign/${campaignId}`
      );

      const campaign = data.data.campaign;

        
        emailEditorRef.current.editor.loadDesign(
          typeof campaign.design_json === "string"
            ? JSON.parse(campaign.design_json)
            : campaign.design_json
        );
      } catch (err) {
      console.error(err);
      toast.error("Failed to load campaign template");
    }
  };

  loadCampaignTemplateDesign();
}, [fromCampaign, campaignId]);


 

  const handleSavetemplate = () => {
    emailEditorRef?.current.editor.exportHtml(async (data) => {
      const postData = {
        "name": currentCustomTemplateName,
        "template_category_id" : currentCustomTemplateCategoryId,
        "html_content": data?.html,
        "json_design": data?.design
      }

      try{
        const response = await authAxios(`/custom_templates/${currentCustomTemplateId}`,{
          data:postData,
          method:"PUT"
        });

        if(response.status === 200){
          toast.success("Template Saved Successfully");
          navigate(`/templates${
              fromCampaign ? `?from=campaign&campaignId=${campaignId}` : ""
            }`)
        }
      }catch(err){
        toast.error(err?.response?.data?.message || "Failed to save template");
      }
    })
  }

  const handleRedo = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.editor.redo();
    }
  };

const handleReviewCampaign = () => {
  if (!campaignId) return;

  emailEditorRef.current.editor.exportHtml(async (data) => {
    try {
      await authAxios.post(
        `/campaign/set-email-template-for-campaign/${campaignId}`,
        {
          email_content: data.html,
          email_template_id: currentCustomTemplateId || currentPreDefinedTemplateId,
          json_design: data.design 
        }
      );
      if (currentCustomTemplateId) {
        const postData = {
          name: currentCustomTemplateName,
          template_category_id: currentCustomTemplateCategoryId,
          html_content: data.html,
          json_design: data.design,
        };

        await authAxios.put(
          `/custom_templates/${currentCustomTemplateId}`,
          postData
        );
      }

      toast.success("Template attached & updated successfully"); 
      navigate(`/campaigns/review/${campaignId}`);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to attach/update template" 
      );
      console.error(err);
    }
  });
};




  const onLoad = (unlayer) => {
    console.log("onReady", unlayer);
    unlayer.addEventListener("design:loaded", onDesignLoad);
    // unlayer.loadDesign(sample);
  };

  const onReady = async() => {
    if (fromCampaign) return;
    if(currentPreDefinedTemplateId !== "null"){
      const {data} = await authAxios.get(`${currentCustomTemplateId === currentPreDefinedTemplateId ? "/custom_templates" : "/predefined_templates"}/${currentPreDefinedTemplateId}`);
      if (data.data.design_json) {
        emailEditorRef?.current.editor.loadDesign(JSON.parse(data.data.design_json));
      }
    }
  };

  

  return (
    
    <div className="flex flex-col">
      <Toaster />
      <div className="flex flex-row bg-secondary dark:bg-dark-secondary p-3 gap-2 justify-between">
        <Button
          label={"Go back"}
          styleClass={"px-4 py-2 text-base text-white rounded-md !bg-danger cursor-pointer hover:opacity-90"}
          onClick={() => navigate(-1)}
        />
        <div className="flex gap-2">
          <Button
            children={
              <div aria-label="undo" title="Undo" className="p-2">
                <i className="ri-arrow-go-back-line ri-lg text-white"></i>
              </div>
            }
            styleClass={"text-base !bg-warning rounded-md cursor-pointer hover:opacity-80"}
            onClick={() => handleUndo()}
          />
          <Button
            children={
              <div aria-label="redo" title="Redo" className="p-2">
                <i className="ri-arrow-go-forward-line ri-lg text-white"></i>
              </div>
            }
            styleClass={"text-base !bg-warning rounded-md cursor-pointer hover:opacity-80"}
            onClick={() => handleRedo()}
          />

          {!fromCampaign && (
          <Button
            styleClass={"px-4 py-2 text-base text-white rounded-md cursor-pointer hover:bg-primary-900/80"}
            label={"Save Template"} onClick={() => handleSavetemplate()}
          />
          )}
          {fromCampaign && campaignId && (
            <Button
              label="Review Campaign"
              onClick={handleReviewCampaign}
              styleClass="p-2 text-white rounded-md bg-primary"
            />
          )}

        </div>
      </div>
      <div className="flex h-screen">
        <EmailEditor
          ref={emailEditorRef}
          onReady={onReady}
          options={{
            version: "latest",
            appearance: {
              theme: "modern_light",
              panels: {
                tools: {
                  dock: "left",
                },
              },
            },
            editor: {
              confirmOnDelete: false,
            }
          }}
        />
      </div>
    </div>
  );
};

export default DragDrop;
