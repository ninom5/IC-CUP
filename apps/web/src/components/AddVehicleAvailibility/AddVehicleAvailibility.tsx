import { getMinDate } from "@utils/getMinDate.util";
import c from "./AddVehicleAvailibility.module.css";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type AvailabilityInterval = {
  startDate: string;
  endDate: string;
};

export const AddVehicleAvailibility = () => {
  const [availabilityIntervals, setAvailabilityIntervals] = useState<
    AvailabilityInterval[]
  >([]);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const handleAddInterval = () => {
    if (!startDateRef.current || !endDateRef.current) return;

    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;

    if (!startDate || !endDate) {
      toast.error("Molimo unesite oba datuma.");
      return;
    }

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    const oneDayInMillis = 24 * 60 * 60 * 1000;

    if (endDateTime.getTime() - startDateTime.getTime() < oneDayInMillis) {
      toast.error(
        "Krajnji datum mora biti barem jedan dan nakon početnog datuma."
      );
      return;
    }
    const isOverlapping = availabilityIntervals.some(
      (interval) =>
        new Date(startDate) <= new Date(interval.endDate) &&
        new Date(endDate) >= new Date(interval.startDate)
    );

    if (isOverlapping) {
      toast.error("Uneseni interval se preklapa s postojećim intervalom.");
      return;
    }

    const newInterval: AvailabilityInterval = { startDate, endDate };
    const updatedIntervals = [...availabilityIntervals, newInterval];

    setAvailabilityIntervals(updatedIntervals);

    startDateRef.current.value = "";
    endDateRef.current.value = "";
  };

  const handleRemoveInterval = (indexToRemove: number) => {
    const updatedIntervals = availabilityIntervals.filter(
      (_, index) => index !== indexToRemove
    );
    setAvailabilityIntervals(updatedIntervals);
  };

  const handleConfirm = () => {
    // Here you would typically pass the intervals to a parent component
    // or submit them to an API
    console.log("Confirmed Intervals:", availabilityIntervals);
    // Example: onSubmit(availabilityIntervals)
  };

  return (
    <div className={c.inputContainer}>
      <h3>Unesi slobodne periode</h3>

      {availabilityIntervals.length > 0 && (
        <div className={c.intervalsList}>
          {availabilityIntervals.map((interval, index) => (
            <div key={index} className={c.intervalItem}>
              <span>
                {interval.startDate} - {interval.endDate}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveInterval(index)}
                className={c.removeButton}
              >
                Ukloni
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={c.intervalContainer}>
        <label>
          Od: <input type="date" min={getMinDate(1)} ref={startDateRef} />
        </label>

        <label>
          Do: <input type="date" min={getMinDate(2)} ref={endDateRef} />
        </label>
      </div>

      <button type="button" onClick={handleAddInterval}>
        Potvrdi
      </button>
    </div>
  );
};
