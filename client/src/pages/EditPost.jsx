import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/dashboard/Navbar";
import Editor from "../components/editor/Editor";
import CategorySelect from "../components/editor/CategorySelect";
import TagInput from "../components/editor/TagInput";
import ImageUpload from "../components/editor/ImageUpload";
import PublishButtons from "../components/editor/PublishButtons";

import {
  getSinglePost,
  updatePost,
} from "../services/post.service";

const EditPost = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {

    try {

      const data = await getSinglePost(id);

      const post = data.post;

      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
      setTags(post.tags);

      if (post.featuredImage) {
        setImagePreview(post.featuredImage);
      }

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleUpdate = async () => {

    try {

      setIsSaving(true);

      await updatePost(id, {
        title,
        content,
        category,
        tags,
        featuredImage,
      });

      alert("Post Updated Successfully");

      navigate("/dashboard/posts");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setIsSaving(false);

    }

  };

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setFeaturedImage(reader.result);

      setImagePreview(reader.result);

    };

    reader.readAsDataURL(file);

  };

  const removeImage = () => {

    setFeaturedImage("");

    setImagePreview("");

  };

  const handleTagAdd = (tag) => {

    if (!tag) return;

    if (tags.includes(tag)) return;

    setTags([...tags, tag]);

  };

  const removeTag = (tag) => {

    setTags(tags.filter(t => t !== tag));

  };

  if (loading) {

    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );

  }

  return (

    <div className="flex-1">

      <Navbar />

      <main className="p-6 max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              Edit Post
            </h1>

            <p className="text-gray-500">
              Update your article
            </p>

          </div>

          <PublishButtons

            isSaving={isSaving}

            isPublishing={false}

            onSaveDraft={handleUpdate}

            onPublish={handleUpdate}

          />

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2">

            <Editor

              title={title}

              setTitle={setTitle}

              content={content}

              setContent={setContent}

            />

          </div>

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

          </div>

        </div>

      </main>

    </div>

  );

};

export default EditPost;