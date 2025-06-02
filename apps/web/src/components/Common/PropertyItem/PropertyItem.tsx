export const PropertyItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) => (
  <div className="vehicle-property">
    <img src={icon} alt={label} />
    <p>{value}</p>
  </div>
);
