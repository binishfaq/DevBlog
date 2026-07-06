import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import Editor from "../components/editor/Editor";
import CategorySelect from "../components/editor/CategorySelect";
import TagInput from "../components/editor/TagInput";
import ImageUpload from "../components/editor/ImageUpload";
import PublishButtons from "../components/editor/PublishButtons";
import { createPost } from "../services/post.service";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");

  const handleSaveDraft = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Please add a title and content before saving.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const postData = {
        title: title.trim(),
        content: content.trim(),
        category: category || "General",
        tags: tags.join(', '),
        image: imagePreview || "",
        status: "draft",
        author: "Test User"
      };

      const response = await createPost(postData);
  
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to save draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Please add a title and content before publishing.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      setIsPublishing(true);
      setError("");

      const postData = {
        title: title.trim(),
        content: content.trim(),
        category: category || "General",
        tags: tags.join(', '),
        image: imagePreview || "https://via.placeholder.com/800x400",
        status: "published",
        author: "Test User"
      };


      const response = await createPost(postData);
      navigate("/dashboard/posts");
    } catch (error) {
      console.error("❌ Error publishing post:", error);
      setError(error.response?.data?.message || "Failed to publish post. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFeaturedImage(null);
    setImagePreview("");
  };

  const handleTagAdd = (newTag) => {
    if (newTag && !tags.includes(newTag) && tags.length < 5) {
      setTags([...tags, newTag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const getWordCount = () => {
    if (!content) return 0;
    // Strip HTML tags and count words
    const text = content.replace(/<[^>]*>/g, "").trim();
    return text ? text.split(/\s+/).length : 0;
  };

  const getCharacterCount = () => {
    if (!content) return 0;
    return content.replace(/<[^>]*>/g, "").length;
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Create New Post</h1>
              <p className="text-gray-500 text-sm mt-1">Write and publish your next blog post</p>
            </div>
            <PublishButtons
              isSaving={isSaving}
              isPublishing={isPublishing}
              onSaveDraft={handleSaveDraft}
              onPublish={handlePublish}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
              {error}
            </div>
          )}

          {/* Main Editor Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editor Column */}
            <div className="lg:col-span-2 space-y-6">
              <Editor
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
              />
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <ImageUpload
                imagePreview={imagePreview}
                onImageUpload={handleImageUpload}
                onRemoveImage={removeImage}
              />
              
              <CategorySelect
                category={category}
                setCategory={setCategory}
              />
              
              <TagInput
                tags={tags}
                onTagAdd={handleTagAdd}
                removeTag={removeTag}
              />

              {/* Post Stats */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Post Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Title</span>
                    <span className="text-gray-700 font-medium truncate max-w-[140px]">
                      {title || "Untitled"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Words</span>
                    <span className="text-gray-700 font-medium">
                      {getWordCount()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Characters</span>
                    <span className="text-gray-700 font-medium">
                      {getCharacterCount()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="text-yellow-600 font-medium">Draft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tags</span>
                    <span className="text-gray-700 font-medium">
                      {tags.length > 0 ? tags.join(", ") : "None"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePost;