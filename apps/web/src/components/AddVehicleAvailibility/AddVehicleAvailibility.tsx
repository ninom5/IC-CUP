import { getMinDate } from "@utils/getMinDate.util";
import c from "./AddVehicleAvailibility.module.css";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import xIcon from "../../assets/images/xIcon.svg";
import { AvailabilityInterval } from "../../types/index";
import { isIntervalAtLeastOneDay } from "@utils/isIntervalAtLeastOneDay.util";

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

    if (!isIntervalAtLeastOneDay(startDate, endDate)) {
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

  return (
    <div className={c.inputContainer}>
      <h3>Unesi slobodne periode</h3>

      {availabilityIntervals.length > 0 && (
        <div className={c.intervalsList}>
          {availabilityIntervals.map((interval, index) => (
            <div key={index} className={c.intervalItem}>
              <span>
                <strong>Od:</strong> {interval.startDate}
              </span>
              <span>
                <strong>Do:</strong> {interval.endDate}
              </span>
              <img src={xIcon} onClick={() => handleRemoveInterval(index)} />
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
