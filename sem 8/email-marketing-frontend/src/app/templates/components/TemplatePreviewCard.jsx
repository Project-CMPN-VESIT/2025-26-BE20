import { Eye, Edit } from "lucide-react";

export default function TemplatePreviewCard({ template,onClick }) {

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative bg-linear-to-br from-custom-green-200 to-secondary h-56 overflow-hidden">
        <img
          src={template.thumbnail_url}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.05] scale-[1]"
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {template.name}
          </h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-custom-green-200 text-primary">
            {template.category.name}
          </span>
        </div>

        <div className="">
          <button className="bg-custom-green-200 hover:bg-custom-green-300 text-primary cursor-pointer font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 w-full" onClick={() => {
            onClick(template.id)
            }}>
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
