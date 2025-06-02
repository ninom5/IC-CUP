import "./insuranceList.css";
import { InsuranceCard } from "@components/index";
import { insuranceCategories, InsuranceKey } from "@constants/index";

export const InsuranceList = ({
  selectedCard,
  onSelect,
}: {
  selectedCard: InsuranceKey | null;
  onSelect: (key: InsuranceKey) => void;
}) => {
  return (
    <section className="insurance-list mobile-insurance-list">
      {Object.entries(insuranceCategories).map(([key, value]) => (
        <InsuranceCard
          key={key}
          heading={value.heading}
          description={value.description}
          isActive={selectedCard === key}
          onClick={() => onSelect(key as InsuranceKey)}
        />
      ))}
    </section>
  );
};
