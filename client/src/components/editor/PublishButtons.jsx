import { Save, Send } from "lucide-react";

const PublishButtons = ({
  isSaving,
  isPublishing,
  onSaveDraft,
  onPublish,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onSaveDraft}
        disabled={isSaving}
        className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition disabled:opacity-50"
      >
        <Save size={18} />
        {isSaving ? "Saving..." : "Save Draft"}
      </button>
      <button
        onClick={onPublish}
        disabled={isPublishing}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition disabled:opacity-50"
      >
        <Send size={18} />
        {isPublishing ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
};

export default PublishButtons;