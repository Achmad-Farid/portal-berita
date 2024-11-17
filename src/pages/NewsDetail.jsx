import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

function NewsDetail() {
  const { articles } = useSelector((state) => state.articles);
  const { id } = useParams();
  const article = articles.find((item) => item._id === id);

  if (!article) {
    // Tampilkan pesan jika artikel tidak ditemukan
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-heading text-secondary mb-4">Artikel Tidak Ditemukan</h1>
        <p className="text-gray">Mohon periksa kembali URL atau pilih artikel lain.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={`Artikel tentang ${article.title}`} />
        <meta name="keywords" content={article.tags.join(", ")} />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-4xl font-heading text-secondary mb-4">{article.title}</h1>
        <p className="text-gray">Tanggal Publikasi: {article.publishedAt}</p>
      </header>

      <section className="mb-8">
        {article.content.map((item) => {
          switch (item.type) {
            case "text":
              return (
                <p key={item._id} className="text-lg text-neutral-dark leading-relaxed mb-4">
                  {item.value}
                </p>
              );
            case "subtitle":
              return (
                <h2 key={item._id} className="text-2xl font-heading text-secondary mb-4">
                  {item.value}
                </h2>
              );
            case "image":
              return <img key={item._id} src={item.value} alt="Deskripsi gambar" className="w-full h-auto object-cover mb-4 rounded-lg shadow-md" />;
            default:
              return null; // Skip jika type tidak dikenal
          }
        })}
      </section>

      <footer className="border-t pt-6 mt-8">
        <p className="text-gray">Ditulis oleh: {article.author}</p>
        <p className="text-gray">Tags: {article.tags.join(", ")}</p>
      </footer>
    </div>
  );
}

export default NewsDetail;
