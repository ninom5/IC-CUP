import { VehicleType } from "types";
import "./vehicleGallery.css";
import { useState } from "react";

export const VehicleGallery = ({ vehicle }: { vehicle: VehicleType }) => {
  const { images } = vehicle;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <section className="gallery">
      <div
        className="gallery-main-image-wrapper"
        onClick={() => handleImageClick(images[0])}
      >
        <img src={images[0]} />
      </div>

      <div className="side-gallery">
        {images.slice(1, 5).map((img, index) => (
          <div
            className="side-gallery-image-wrapper"
            key={index}
            onClick={() => handleImageClick(img)}
          >
            <img src={img} alt={`Vozilo ${index + 2}`} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-gallery" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} />
            <button onClick={handleClose}>x</button>
          </div>
        </div>
      )}
    </section>
  );
};
