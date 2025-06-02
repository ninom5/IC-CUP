import "./insuranceCard.css";

export const InsuranceCard = ({
  heading,
  description,
  isActive,
  onClick,
}: {
  heading: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <section
      className={`insurance-card ${isActive ? "selected" : ""}`}
      onClick={onClick}
    >
      <h2>{heading}</h2>
      <p>{description}</p>
    </section>
  );
};
