import c from "./FourthStep.module.css";
import "./FourthStepAutoCompleteInput.css";
import { StepProps } from "../../../types/index";
import { AutoCompleteInput } from "@components/AutoCompleteInput/AutoCompleteInput";

export const FourthStep = ({ data, onDataChange }: StepProps) => {
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onDataChange({
      [name]: Number(value),
      details: {
        ...data.details,
      },
    });
  };

  const handlePlaceResolved = (
    place: google.maps.places.PlaceResult,
    addressComponents: google.maps.GeocoderAddressComponent[]
  ) => {
    if (!place.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const cityComponent = addressComponents.find(
      (component) =>
        component.types.includes("locality") ||
        component.types.includes("administrative_area_level_2")
    );

    const city = cityComponent ? cityComponent.long_name : "";

    onDataChange({
      ...data,
      city: city,
      pickupAddress: place.formatted_address || "",
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <div className={c.form}>
      <div className={c.inputContainer}>
        <h3>Cijena / po danu</h3>
        <label>
          <input
            type="text"
            name="dailyPrice"
            value={data.dailyPrice}
            placeholder="40.00"
            onChange={handlePriceChange}
          />{" "}
          €
        </label>
      </div>

      <div className={`${c.inputContainer} autoComplete-container`}>
        <h3>Lokacija</h3>
        <AutoCompleteInput onPlaceResolved={handlePlaceResolved} />
      </div>
    </div>
  );
};
