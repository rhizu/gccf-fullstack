"use client";

import { useState } from "react";
import { useGallery } from "@/lib/hooks";
import { X, ZoomIn } from "lucide-react";

export default function GalleryPage() {
  const { data: galleryList = [], isLoading, error } = useGallery();
  const [selectedImage, setSelectedImage] = useState<import("@/types/gallery").Gallery | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(galleryList.map(item => item.category).filter((c): c is string => Boolean(c)))];

  const filteredImages = filter === "All"
    ? galleryList.filter(item => item.isVisible)
    : galleryList.filter(item => item.isVisible && item.category === filter);

  if (isLoading) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{
          width: "50px",
          height: "50px",
          border: "4px solid #e0e0e0",
          borderTopColor: "#0d47a1",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <p style={{ marginTop: "1.5rem", color: "#666", fontSize: "1rem" }}>Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#dc2626", marginBottom: "1rem" }}>Failed to load gallery. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              background: "#0d47a1",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .gallery-page { background: #fafafa; min-height: 100vh; }
        .gallery-hero { min-height: 60vh; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); display: flex; align-items: center; justify-content: center; position: relative; padding: 120px 20px 60px; overflow: hidden; }
        .gallery-hero::before { content: ''; position: absolute; width: 500px; height: 500px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; top: -150px; right: -150px; }
        .hero-content { text-align: center; position: relative; z-index: 2; max-width: 800px; animation: fadeIn 1s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-content h1 { font-size: 4.5rem; color: #ffffff; margin-bottom: 1rem; font-weight: 700; letter-spacing: -1px; }
        .hero-content p { font-size: 1.3rem; color: rgba(255, 255, 255, 0.95); line-height: 1.6; }
        .filter-section { max-width: 1400px; margin: 0 auto; padding: 60px 40px 40px; }
        .filter-buttons { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
        .filter-btn { padding: 12px 32px; border: 2px solid #e2e8f0; background: #ffffff; color: #475569; font-size: 1rem; font-weight: 600; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; }
        .filter-btn:hover { border-color: #3b82f6; color: #3b82f6; transform: translateY(-2px); }
        .filter-btn.active { background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: #ffffff; border-color: #2563eb; }
        .gallery-container { max-width: 1600px; margin: 0 auto; padding: 40px; }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 30px; grid-auto-flow: dense; }
        .gallery-item { position: relative; overflow: hidden; border-radius: 16px; cursor: pointer; background: #ffffff; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); animation: fadeInScale 0.6s ease-out backwards; }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .gallery-item:nth-child(3n+1) { grid-row: span 2; }
        .gallery-item:hover { transform: translateY(-8px); box-shadow: 0 12px 40px rgba(30, 58, 138, 0.15); }
        .image-wrapper { position: relative; width: 100%; height: 100%; min-height: 300px; overflow: hidden; }
        .gallery-item:nth-child(3n+1) .image-wrapper { min-height: 500px; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .gallery-item:hover img { transform: scale(1.1); }
        .image-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(30, 58, 138, 0.9) 0%, transparent 60%); opacity: 0; transition: opacity 0.4s ease; display: flex; flex-direction: column; justify-content: flex-end; padding: 30px; }
        .gallery-item:hover .image-overlay { opacity: 1; }
        .overlay-content { transform: translateY(20px); transition: transform 0.4s ease; }
        .gallery-item:hover .overlay-content { transform: translateY(0); }
        .category-tag { display: inline-block; padding: 6px 16px; background: rgba(59, 130, 246, 0.9); color: #ffffff; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 10px; width: fit-content; }
        .image-title { color: #ffffff; font-size: 1.3rem; font-weight: 600; margin-bottom: 10px; }
        .zoom-icon { position: absolute; top: 20px; right: 20px; width: 45px; height: 45px; background: rgba(255, 255, 255, 0.95); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #2563eb; opacity: 0; transform: scale(0.8); transition: all 0.3s ease; }
        .gallery-item:hover .zoom-icon { opacity: 1; transform: scale(1); }
        .lightbox { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.95); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 40px; animation: fadeIn 0.3s ease; }
        .lightbox-content { max-width: 90vw; max-height: 90vh; position: relative; animation: scaleIn 0.3s ease; }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .lightbox-content img { max-width: 100%; max-height: 90vh; object-fit: contain; border-radius: 8px; }
        .close-btn { position: absolute; top: -50px; right: 0; width: 50px; height: 50px; background: rgba(255, 255, 255, 0.1); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; cursor: pointer; transition: all 0.3s ease; }
        .close-btn:hover { background: rgba(255, 255, 255, 0.2); transform: rotate(90deg); }
        @media (max-width: 1024px) { .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; } .hero-content h1 { font-size: 3.5rem; } }
        @media (max-width: 768px) { .gallery-grid { grid-template-columns: 1fr; gap: 20px; } .gallery-item:nth-child(3n+1) { grid-row: span 1; } .gallery-item:nth-child(3n+1) .image-wrapper { min-height: 300px; } .hero-content h1 { font-size: 2.5rem; } .hero-content p { font-size: 1.1rem; } .filter-section { padding: 40px 20px 30px; } .gallery-container { padding: 20px; } }
      `}</style>

      <section className="gallery-hero">
        <div className="hero-content">
          <h1>Our Gallery</h1>
          <p>Capturing moments of impact, celebration, and community connection across our programs and initiatives.</p>
        </div>
      </section>

      <section className="filter-section">
        <div className="filter-buttons">
          {categories.map((category) => (
            <button key={category} className={`filter-btn ${filter === category ? "active" : ""}`} onClick={() => setFilter(category)}>
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="gallery-container">
        {filteredImages.length === 0 ? (
          <p style={{ textAlign: "center", padding: "2rem" }}>No gallery items found.</p>
        ) : (
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div key={image.id} className="gallery-item" onClick={() => setSelectedImage(image)} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="image-wrapper">
                  <img src={image.imageUrl} alt={image.title} />
                  <div className="zoom-icon"><ZoomIn size={20} /></div>
                  <div className="image-overlay">
                    <div className="overlay-content">
                      {image.category && <span className="category-tag">{image.category}</span>}
                      <h3 className="image-title">{image.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedImage(null)}><X size={24} /></button>
            <img src={selectedImage.imageUrl} alt={selectedImage.title} />
          </div>
        </div>
      )}
    </div>
  );
}