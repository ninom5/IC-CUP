import "./vehicleDescription.css";
import { VehicleDetails, VehicleType } from "types";
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
import {
  AuxIcon,
  BluetoothIcon,
  ChairIcon,
  PetsIcon,
  SensorsIcon,
  UsbIcon,
} from "components/icons/index";
import { CarCategoryEnum } from "enums";

const categoryImages: Record<CarCategoryEnum, string> = {
  COUPE: coupeSvg,
  SEDAN: sedanSvg,
  SUV: suvSvg,
  CABRIOLET: cabrioletSvg,
  HATCHBACK: hatchbackSvg,
};

const additionalFeatures = [
  { label: "Bluetooth", icon: BluetoothIcon },
  { label: "USB", icon: UsbIcon },
  { label: "Senzori", icon: SensorsIcon },
  { label: "Pomoć pri parkiranju", icon: AuxIcon },
  { label: "Dječije sjedište", icon: ChairIcon },
  { label: "Kućni ljubimci", icon: PetsIcon },
];

export const VehicleDescription = ({ vehicle }: { vehicle: VehicleType }) => {
  const { brand, model, productionYear, details, owner } = vehicle;
  const { totalRating, numberOfRatings } = getAverageVehicleRating(vehicle);

  const { numOfSeats, fuelType, category, isAutomatic }: VehicleDetails =
    details;

  console.log(vehicle);
  const categoryImage = categoryImages[category] || categoryImages["COUPE"];

  console.log(details);
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
          {additionalFeatures.map(({ label, icon: Icon }, index) => (
            <div className="addition-item" key={index}>
              <Icon color="red" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
