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

  const handleSaveDraft = async () => {
  try {
    setIsSaving(true);

    const post = {
      title,
      content,
      category,
      tags,
      featuredImage: "",
      status: "draft",
    };

    console.log(post);
console.log("Size:", JSON.stringify(post).length);
    

    const res = await createPost(post);

    alert("Draft Saved!");

    navigate("/dashboard");

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to save draft"
    );

  } finally {
    setIsSaving(false);
  }
};

  const handlePublish = async () => {
  if (!title.trim() || !content.trim()) {
    alert("Please add a title and content before publishing.");
    return;
  }

  try {
    setIsPublishing(true);

    const post = {
      title,
      content,
      category,
      tags,
      featuredImage: imagePreview,
      status: "published",
    };

    const res = await createPost(post);

    alert(res.message);

    navigate("/dashboard/posts");

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to publish post"
    );

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
                      {content?.replace(/<[^>]*>/g, "").length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="text-yellow-600 font-medium">Draft</span>
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