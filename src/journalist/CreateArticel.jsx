import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitArticle } from "../redux/actions/journalistAction";
import Popup from "../components/Popup";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([{ type: "text", value: "", position: 1 }]);
  const [tags, setTags] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);

  const dispatch = useDispatch();

  // Fungsi untuk menangani perubahan konten
  const handleContentChange = (index, value) => {
    const newContent = [...content];
    newContent[index].value = value;
    setContent(newContent);
  };

  // Fungsi untuk menambahkan konten baru
  const handleAddContent = (type) => {
    setContent([...content, { type, value: "", position: content.length + 1 }]);
  };

  // Fungsi untuk menghapus konten berdasarkan index
  const handleRemoveContent = (index) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  // Fungsi untuk menampilkan pesan popup
  const handleClosePopup = () => {
    setPopupMessage(null);
  };

  // Fungsi untuk submit artikel ke server
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(submitArticle({ title, content, tags }))
      .unwrap()
      .then(() => {
        setPopupMessage("Article created successfully!");
      })
      .catch((error) => {
        setPopupMessage(`Error: ${error.message}`);
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto p-6 bg-neutral-light">
      <h1 className="text-2xl font-heading text-primary mb-6">Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Judul Artikel */}
        <div>
          <label className="block font-sans text-gray">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
        </div>

        {/* Input Konten Artikel */}
        <div>
          <label className="block font-sans text-gray">Content</label>
          {content.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <select
                value={item.type}
                onChange={(e) => {
                  const newContent = [...content];
                  newContent[index].type = e.target.value;
                  setContent(newContent);
                }}
                className="mr-2 p-1 border border-gray-300 rounded"
              >
                <option value="text">Text</option>
                <option value="image">Image URL</option>
                <option value="subtitle">Subtitle</option>
              </select>
              <input type="text" value={item.value} onChange={(e) => handleContentChange(index, e.target.value)} className="w-full p-2 border border-gray-300 rounded" placeholder={`Enter ${item.type}`} />
              <button type="button" onClick={() => handleRemoveContent(index)} className="ml-2 text-red-500 underline text-sm">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddContent("text")} className="text-sm text-secondary underline">
            Add Text
          </button>
          <button type="button" onClick={() => handleAddContent("image")} className="ml-2 text-sm text-secondary underline">
            Add Image
          </button>
          <button type="button" onClick={() => handleAddContent("subtitle")} className="ml-2 text-sm text-secondary underline">
            Add Subtitle
          </button>
        </div>

        {/* Input Tag */}
        <div>
          <label className="block font-sans text-gray">Tags</label>
          <input type="text" value={tags.join(",")} onChange={(e) => setTags(e.target.value.split(","))} className="w-full p-2 border border-gray-300 rounded" placeholder="Separate tags with commas" />
        </div>

        {/* Tombol Submit */}
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary">
          Create Article
        </button>
      </form>

      {/* Pratinjau Artikel */}
      <div className="mt-10 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-heading text-secondary mb-4">Preview Article</h2>
        <h3 className="text-2xl font-heading text-primary">{title}</h3>
        <div className="mt-4">
          {content.map((item, index) => (
            <div key={index} className="mb-4">
              {item.type === "text" && <p className="text-gray">{item.value}</p>}
              {item.type === "image" && <img src={item.value} alt="Content Image" className="w-full h-auto rounded" />}
              {item.type === "subtitle" && <h4 className="text-lg font-heading text-accent">{item.value}</h4>}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <span className="font-sans text-gray">Tags: </span>
          {tags.map((tag, idx) => (
            <span key={idx} className="inline-block bg-gray-200 text-gray-700 text-xs font-sans rounded-full px-2 py-1 mr-2">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Popup Notification */}
      {popupMessage && <Popup message={popupMessage} onClose={handleClosePopup} />}
    </div>
  );
}

export default CreateArticle;
