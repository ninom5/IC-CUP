export const VehicleGallery = ({
  vehicleImages,
}: {
  vehicleImages: string[];
}) => {
  return (
    <section>
      <div className="main-gallery-image-wrapper">
        <img src={vehicleImages[0]} />
      </div>

      {vehicleImages.slice(1).map((img) => (
        <div className="side-image-gallery-wrapper">
          <img src={img} />
        </div>
      ))}
    </section>
  );
};
