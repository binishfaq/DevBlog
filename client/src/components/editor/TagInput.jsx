import { useState } from "react";
import { X } from "lucide-react";

const TagInput = ({ tags, onTagAdd, removeTag }) => {
  const [tagInput, setTagInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag) {
        onTagAdd(newTag);
        setTagInput("");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
          >
            #{tag}
            <button
              onClick={() => removeTag(tag)}
              className="hover:text-red-500 transition"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags (max 5)"
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition text-sm"
        disabled={tags.length >= 5}
      />
      <p className="text-xs text-gray-400 mt-1">
        Press Enter or comma to add tags ({tags.length}/5)
      </p>
    </div>
  );
};

export default TagInput;