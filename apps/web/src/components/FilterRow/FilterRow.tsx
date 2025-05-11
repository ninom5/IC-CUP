import "./filterRow.css";
import { FilterRowProps } from "types/index";

export const FilterRow = ({
  label,
  imgSrc,
  imgAlt,
  selectOptions,
}: FilterRowProps) => {
  return (
    <div>
      <h2>{label}</h2>
      <div className="filter-row">
        <div className="filter-row-wrapper">
          <img src={imgSrc} alt={imgAlt} className="icon-image" />
        </div>
        <select className="filter-select">
          {selectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
