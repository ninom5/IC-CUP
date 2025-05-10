import "./autoCompleteInput.css";

export const AutoCompleteInput = () => {
  return (
    <div className="map-search">
      <input
        id="autocomplete-input"
        type="text"
        placeholder="Search for a place..."
      />
    </div>
  );
};
