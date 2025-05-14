import "./customDatePicker.css";

export const CustomDatePicker = ({
  dateRange,
  setDateRange,
}: {
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
}) => {
  const formatDate = (date: Date | null) =>
    date ? date.toISOString().slice(0, 10) : "";

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : null;
    setDateRange([newDate, dateRange[1]]);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : null;
    setDateRange([dateRange[0], newDate]);
  };

  return (
    <div className="date-range-container">
      <label className="date-label">
        <strong>Od:</strong>
        <input
          type="date"
          value={formatDate(dateRange[0])}
          onChange={handleStartChange}
        />
      </label>

      <div className="date-divider" />

      <label className="date-label">
        <strong>Do:</strong>
        <input
          type="date"
          value={formatDate(dateRange[1])}
          onChange={handleEndChange}
        />
      </label>
    </div>
  );
};
