// client/src/pages/EditPost.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import Editor from "../components/editor/Editor";
import CategorySelect from "../components/editor/CategorySelect";
import TagInput from "../components/editor/TagInput";
import ImageUpload from "../components/editor/ImageUpload";
import PublishButtons from "../components/editor/PublishButtons";
import { getSinglePost, updatePost } from "../services/post.service";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError("");

      const post = await getSinglePost(id);
      
      if (post) {
        setTitle(post.title || "");
        setContent(post.content || "");
        setCategory(post.category || "General");
        setTags(post.tags || []);
        setImagePreview(post.image || "");
      } else {
        setError("Post not found");
      }
    } catch (error) {
      console.error("❌ Error fetching post:", error);
      setError(error.response?.data?.message || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

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
        status: "draft"
      };

      console.log("📝 Updating draft:", postData);

      const response = await updatePost(id, postData);
      console.log("✅ Draft updated:", response);

      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error updating draft:", error);
      setError(error.response?.data?.message || "Failed to update draft");
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
        status: "published"
      };



      const response = await updatePost(id, postData);
      navigate("/dashboard/posts");
    } catch (error) {
      console.error("❌ Error publishing post:", error);
      setError(error.response?.data?.message || "Failed to publish post");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
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
    return content.replace(/<[^>]*>/g, "").trim().split(/\s+/).length;
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading post...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6 max-w-6xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h3 className="text-red-600 font-semibold text-lg mb-2">Error Loading Post</h3>
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={fetchPost}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Edit Post</h1>
              <p className="text-gray-500 text-sm mt-1">Update your blog post</p>
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

export default EditPost;