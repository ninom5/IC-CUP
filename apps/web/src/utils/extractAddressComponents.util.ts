export const extractAddressComponents = (
  addressComponents: google.maps.GeocoderAddressComponent[]
) => {
  const getAddressComponent = (types: string | string[]) => {
    const typeArray = Array.isArray(types) ? types : [types];
    return (
      addressComponents.find((component) =>
        typeArray.some((type) => component.types.includes(type))
      )?.long_name || ""
    );
  };

  const streetNumber = getAddressComponent("street_number");
  const route = getAddressComponent("route");
  const city = getAddressComponent([
    "locality",
    "administrative_area_level_2",
    "administrative_area_level_3",
    "postal_town",
    "sublocality",
  ]);
  const postalCode = getAddressComponent("postal_code");
  const country = getAddressComponent("country");

  return { streetNumber, route, city, postalCode, country };
};
