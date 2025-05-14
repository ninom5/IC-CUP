import { useEffect, useRef } from "react";
import "./autoCompleteInput.css";
import { toast } from "react-toastify";
import { extractAddressComponents } from "@utils/extractAddressComponents.util";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

type AutocompleteProps = {
  onPlaceResolved?: (
    place: google.maps.places.PlaceResult,
    addressComponents: google.maps.GeocoderAddressComponent[]
  ) => void;
  placeholder?: string;
  defaultValue?: string;
};

export const AutoCompleteInput = ({
  onPlaceResolved,
  placeholder = "Pretraži lokaciju",
  defaultValue = "Split, Hrvatska",
}: AutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const placesLib = useMapsLibrary("places");

  useEffect(() => {
    if (!placesLib || !inputRef.current) return;
    if (
      !window.google ||
      !window.google.maps ||
      !inputRef.current ||
      !window.google.maps?.places
    ) {
      console.warn("google maps not loaded yet");
      return;
    }

    if (inputRef.current && !inputRef.current.value) {
      inputRef.current.value = defaultValue;
    }

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["geometry", "name", "formatted_address"],
      types: ["geocode"],
    });

    const geocoder = new google.maps.Geocoder();

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const location = place.geometry?.location;

      if (!location) {
        toast.error("No location found for selected place.");
        return;
      }

      geocoder.geocode({ location }, (results, status) => {
        if (
          status !== google.maps.GeocoderStatus.OK ||
          !results ||
          !results[0]
        ) {
          toast.error("Error getting location");
          console.error("Geocoder failed:", status);
          return;
        }

        const addressComponents = results[0].address_components;
        console.log(addressComponents);

        const adr = extractAddressComponents(addressComponents);
        console.log(adr);
        onPlaceResolved?.(place, addressComponents);
      });
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [placesLib, onPlaceResolved]);

  return (
    <div className="map-search">
      <input
        id="autocomplete-input"
        ref={inputRef}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
