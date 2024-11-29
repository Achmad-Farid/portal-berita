import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const themes = {
  nasional: ["hukum", "politik", "pilkada", "peristiwa"],
  internasional: ["asean", "asia pasifik", "timur tengah", "eropa amerika"],
  ekonomi: ["Keuangan Energi", "Bisnis", "Makro", "Corporate Action"],
  olahraga: ["sepak bola", "moto gp", "f1", "badminton"],
  teknologi: ["sains", "teknologi informasi", "telekomunikasi", "climate"],
  hiburan: ["film", "musik", "seleb", "seni budaya"],
  gaya_hidup: ["health", "foods", "travel", "trends"],
  otomotif: ["mobil", "motor", "info otomotif", "e-vehicle"],
};

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: "",
    tags: [],
    content: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Handle ketika tema berubah
  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  // Handle ketika tag di-check/uncheck
  const handleTagChange = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  useEffect(() => {
    handleChange("tags", selectedTags);
  }, [selectedTags]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `${apiUrl}/journalist/articles/${id}`;
      if (user.role === "admin") {
        url = `${apiUrl}/admin/articles/${id}`;
      }

      const response = await axios.get(url);
      console.log("adnwjd");
      setArticle(response.data);
      setSelectedTags(response.data.tags);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleChange = (field, value) => {
    setArticle((prev) => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (index, field, value) => {
    const updatedContent = [...article.content];
    updatedContent[index][field] = value;
    setArticle((prev) => ({ ...prev, content: updatedContent }));
  };

  const handleContentRemove = (index) => {
    const updatedContent = article.content.filter((_, i) => i !== index);
    setArticle((prev) => ({ ...prev, content: updatedContent }));
  };

  const handleContentAdd = () => {
    const newContent = { type: "text", value: "" };
    setArticle((prev) => ({ ...prev, content: [...prev.content, newContent] }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.put(`${apiUrl}/journalist/articles/${id}`, article);
      alert("Artikel berhasil diperbarui");
      navigate(`/detail/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Terjadi kesalahan saat menyimpan artikel");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <Loading></Loading>;
  }

  if (error) {
    <Error message={error} retry={handleSubmit}></Error>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Artikel</h1>

      {/* Edit Title */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
          Judul Artikel
        </label>
        <input id="title" type="text" value={article.title} onChange={(e) => handleChange("title", e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200" />
        <p className="mt-2 text-gray-600">
          Preview: <strong>{article.title}</strong>
        </p>
      </div>

      {/* Edit Content */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Konten</h2>
        {article.content.map((item, index) => (
          <div key={index} className="mb-6 border p-4 rounded-md">
            <label className="block text-gray-700 font-medium mb-2">Tipe</label>
            <select value={item.type} onChange={(e) => handleContentChange(index, "type", e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 mb-2">
              <option value="text">Text</option>
              <option value="subtitle">Subtitle</option>
              <option value="image">Image</option>
            </select>

            <label className="block text-gray-700 font-medium mb-2">Konten</label>
            <input type="text" value={item.value} onChange={(e) => handleContentChange(index, "value", e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 mb-2" />

            <p className="mt-2 text-gray-600">Preview:</p>
            {item.type === "text" && <p className="text-lg text-neutral-dark leading-relaxed whitespace-pre-line">{item.value}</p>}
            {item.type === "subtitle" && <h2 className="text-2xl font-heading text-secondary">{item.value}</h2>}
            {item.type === "image" && <img src={item.value} alt="Preview" className="w-full h-auto object-cover rounded-md shadow-md" />}

            <button onClick={() => handleContentRemove(index)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Hapus
            </button>
          </div>
        ))}

        <button onClick={handleContentAdd} className="mb-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Tambah Konten Baru
        </button>
      </div>

      {/* Edit Tags */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="theme">
          Pilih Tema
        </label>
        <select id="theme" value={selectedTheme} onChange={handleThemeChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 mb-4">
          <option value="">-- Pilih Tema --</option>
          {Object.keys(themes).map((theme) => (
            <option key={theme} value={theme}>
              {theme.charAt(0).toUpperCase() + theme.slice(1).replace("_", " ")}
            </option>
          ))}
        </select>

        {selectedTheme && (
          <div className="mb-4">
            <h3 className="text-gray-700 font-medium mb-2">Pilih Tag:</h3>
            <div className="grid grid-cols-2 gap-2">
              {themes[selectedTheme].map((tag) => (
                <label key={tag} className="flex items-center space-x-2">
                  <input type="checkbox" value={tag} checked={selectedTags.includes(tag)} onChange={() => handleTagChange(tag)} className="form-checkbox h-4 w-4 text-blue-600" />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-gray-700 font-medium">Tag yang Dipilih:</h3>
          <p className="text-gray-600">
            <em>{selectedTags.join(", ") || "Belum ada tag yang dipilih."}</em>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
          Cancel
        </button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Submit
        </button>
      </div>
    </div>
  );
}

export default EditArticle;
