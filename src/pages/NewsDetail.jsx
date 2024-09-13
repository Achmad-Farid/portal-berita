import React from "react";
import { Helmet } from "react-helmet";

function NewsDetail() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Judul</title>
        <meta name="description" />
        <meta name="keywords" />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Judul</h1>
        <p className="text-gray-600">Tanggal Publikasi: 12 September 2024</p>
      </header>

      <section className="mb-8">
        <img src="https://via.placeholder.com/800x400" alt="Deskripsi gambar 1 yang relevan dengan SEO" className="w-full h-auto object-cover mb-4 rounded-lg shadow-md" />
        <p className="text-lg text-gray-700 leading-relaxed mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt ad beatae atque officiis quia totam voluptas dolor consectetur molestiae dolorum!</p>
      </section>

      <section className="mb-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque placeat repudiandae, repellendus, atque molestiae debitis labore fugit iste perspiciatis consequuntur dolore ullam. Cupiditate, dicta cumque eaque est itaque nam
          corrupti!
        </p>
        <img src="https://via.placeholder.com/800x400" alt="Deskripsi gambar 2 yang relevan dengan SEO" className="w-full h-auto object-cover mb-4 rounded-lg shadow-md" />
      </section>

      <section>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolor minima consequatur, minus repudiandae nihil. Eius unde, vero temporibus dicta quisquam voluptatem repellat rerum minus, eos culpa eaque? Mollitia, libero.
          Doloribus aliquid eum beatae laudantium nesciunt fugit temporibus nostrum suscipit!
        </p>
      </section>

      <footer className="border-t pt-6 mt-8">
        <p className="text-gray-600">Ditulis oleh: Penulis</p>
      </footer>
    </div>
  );
}

export default NewsDetail;
