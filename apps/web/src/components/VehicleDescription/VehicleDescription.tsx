import "./vehicleDescription.css";
import { VehicleDetails, VehicleFeatures, VehicleType } from "types";
import { getAverageVehicleRating } from "@utils/index";
import { fuelSvg, seatSvg, transmissionSvg } from "@assets/images";
import { PropertyItem } from "@components/index";
import { additionalFeatures, categoryImages } from "@constants/index";

export const VehicleDescription = ({ vehicle }: { vehicle: VehicleType }) => {
  const { brand, model, productionYear, details, owner } = vehicle;
  const { totalRating, numberOfRatings } = getAverageVehicleRating(vehicle);

  const { numOfSeats, fuelType, category, isAutomatic }: VehicleDetails =
    details;

  const categoryImage = categoryImages[category] || categoryImages["COUPE"];

  return (
    <section>
      <div>
        <h1 className="car-title">{`${brand} ${model} ${productionYear}`}</h1>
        <h3 className="car-rating">
          {totalRating > 0
            ? `${totalRating / numberOfRatings} ★ (${numberOfRatings})`
            : "Još nema recenzija za ovo vozilo"}
        </h3>
      </div>

      <div className="vehicle-owner">
        <div className="vehicle-owner-image-wrapper">
          <img src={owner.personPhoto} alt="Slika vlasnika" />
        </div>

        <div className="owner-info">
          <h3>{`${owner.firstName} ${owner.lastName}`}</h3>
          <h4>Još nema recenzija</h4>
        </div>
      </div>

      <div className="vehicle-details-images">
        <PropertyItem
          label="Ikonica auta"
          value={
            category?.charAt(0).toLocaleUpperCase() +
            category?.slice(1).toLocaleLowerCase()
          }
          icon={categoryImage}
        />

        <PropertyItem
          label="ikonica mjenjaca"
          value={isAutomatic ? "Automatik" : "Ručni"}
          icon={transmissionSvg}
        />

        <PropertyItem
          label="Ikonica goriva"
          value={fuelType === "PETROL" ? "Benzin" : "Dizel"}
          icon={fuelSvg}
        />

        <PropertyItem
          label="Ikonica sjedala"
          value={numOfSeats?.toString()}
          icon={seatSvg}
        />
      </div>

      <div>
        {vehicle.availabilities.map((avail, index) => (
          <div key={index}>
            <strong>Dostupno od:</strong> {avail.startDate} –{" "}
            <strong>do:</strong> {avail.endDate}
          </div>
        ))}
      </div>

      <div className="vehicle-detail-description">
        <h4>OPIS</h4>
        <p>{vehicle.description}</p>
      </div>

      <div className="additions-section">
        <h4>DODACI</h4>

        <div className="additions-grid">
          {additionalFeatures.map(({ label, icon: Icon }) => {
            const normalizedFeatures: Partial<
              Record<keyof VehicleFeatures, boolean>
            > = Object.entries(vehicle.features).reduce(
              (acc, [key, value]) => {
                acc[key.toLowerCase() as keyof VehicleFeatures] = value;
                return acc;
              },
              {} as Partial<Record<keyof VehicleFeatures, boolean>>
            );

            const featureKey = label.toLowerCase() as keyof VehicleFeatures;
            const isEnabled = normalizedFeatures[featureKey];

            return (
              <div className="addition-item" key={label}>
                <Icon color={isEnabled ? "black" : "lightgray"} />
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
