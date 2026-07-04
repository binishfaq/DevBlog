import { useRef } from "react";
import { X, Image as ImageIcon } from "lucide-react";

const ImageUpload = ({
  imagePreview,
  onImageUpload,
  onRemoveImage,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Featured Image</h3>
      {imagePreview ? (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Featured"
            className="w-full h-48 object-cover rounded-xl"
          />
          <button
            onClick={onRemoveImage}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50 transition group"
        >
          <ImageIcon className="w-10 h-10 text-gray-400 group-hover:text-blue-400 transition" />
          <p className="text-sm text-gray-500 mt-2">Click to upload image</p>
          <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</p>
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;