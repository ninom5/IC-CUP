import "./vehicleDescription.css";
import { CarCategory, VehicleDetails, VehicleType } from "types";
import { getAverageVehicleRating } from "@utils/index";
import {
  coupeSvg,
  hatchbackSvg,
  sedanSvg,
  suvSvg,
  cabrioletSvg,
  fuelSvg,
  seatSvg,
  transmissionSvg,
} from "@assets/images";
import { PropertyItem } from "@components/index";

const categoryImages: Record<CarCategory, string> = {
  coupe: coupeSvg,
  sedan: sedanSvg,
  suv: suvSvg,
  cabriolet: cabrioletSvg,
  hatchback: hatchbackSvg,
};

export const VehicleDescription = ({ vehicle }: { vehicle: VehicleType }) => {
  const { brand, model, productionYear, details, owner } = vehicle;
  const { totalRating, numberOfRatings } = getAverageVehicleRating(vehicle);

  const { seats, fuelType, carCategory, transmission }: VehicleDetails =
    details;

  const categoryImage = categoryImages[carCategory] || categoryImages["coupe"];

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
          value={carCategory}
          icon={categoryImage}
        />
        <PropertyItem
          label="ikonica mjenjaca"
          value={transmission}
          icon={transmissionSvg}
        />
        <PropertyItem label="Ikonica goriva" value={fuelType} icon={fuelSvg} />
        <PropertyItem label="Ikonica sjedala" value={seats} icon={seatSvg} />
      </div>

      <div className="vehicle-detail-description">
        <h4>OPIS</h4>
        <p>{vehicle.description}</p>
      </div>

      <div className="additions-section"></div>
    </section>
  );
};
