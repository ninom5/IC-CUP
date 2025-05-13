import "./insuranceCard.css";

export const InsuranceCard = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <section className="insurance-card">
      <h2>{heading}</h2>
      <p>{description}</p>
    </section>
  );
};
