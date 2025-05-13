import { VehicleType } from "types/vehicle.type";
import "./vehicleGallery.css";

export const VehicleGallery = ({ vehicle }: { vehicle: VehicleType }) => {
  const { images } = vehicle;

  return (
    <section className="gallery">
      <div className="gallery-main-image-wrapper">
        <img src={images[0]} />
      </div>

      <div className="side-gallery">
        {images.slice(1, 5).map((img, index) => (
          <div className="side-gallery-image-wrapper" key={index}>
            <img src={img} alt={`Vozilo ${index + 2}`} />
          </div>
        ))}
      </div>
    </section>
  );
};
