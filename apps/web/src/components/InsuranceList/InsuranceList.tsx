import "./insuranceList.css";
import { InsuranceCard } from "@components/index";
import { insuranceCategories } from "@constants/index";

export const InsuranceList = () => {
  return (
    <section className="insurance-list">
      {Object.entries(insuranceCategories).map(([key, value]) => (
        <InsuranceCard
          key={key}
          heading={value.heading}
          description={value.description}
        />
      ))}
    </section>
  );
};
