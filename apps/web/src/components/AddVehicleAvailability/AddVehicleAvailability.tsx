import { getMinDate } from "@utils/getMinDate.util";
import c from "./AddVehicleAvailability.module.css";
import { useRef } from "react";
import { toast } from "react-toastify";
import xIcon from "../../assets/images/xIcon.svg";
import { isIntervalAtLeastOneDay } from "@utils/isIntervalAtLeastOneDay.util";
import { useFetchVehicleAvailabilities } from "@api/Availability/useFetchVehicleAvailabilities";
import { useCreateAvailability } from "@api/Availability/useCreateAvailability";
import { useDeleteVehicleAvailability } from "@api/Availability/useDeleteVehicleAvailability";

export const AddVehicleAvailability = ({
  vehicleId,
}: {
  vehicleId: string;
}) => {
  const { data, isLoading, refetch } = useFetchVehicleAvailabilities(vehicleId);
  const { mutateAsync: createAvailability } = useCreateAvailability();
  const { mutateAsync: deleteAvailability } = useDeleteVehicleAvailability();

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const handleAddInterval = async () => {
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

    await createAvailability({
      vehicleId,
      startDate,
      endDate,
    });

    await refetch();

    startDateRef.current.value = "";
    endDateRef.current.value = "";
  };

  const handleDeleteInterval = (intervalId: string) => {
    deleteAvailability(intervalId, {
      onSuccess: async () => {
        await refetch();
      },
    });
  };

  if (isLoading) return <div>Učitavanje dostupnosti...</div>;

  return (
    <div className={c.inputContainer}>
      <h3>Unesi slobodne periode</h3>

      {data && data.length > 0 ? (
        <div className={c.intervalsList}>
          {data.map((interval) => (
            <div key={interval.id} className={c.intervalItem}>
              <span>
                <strong>Od:</strong>{" "}
                {new Date(interval.startDate).toLocaleDateString()}
              </span>
              <span>
                <strong>Do:</strong>{" "}
                {new Date(interval.endDate).toLocaleDateString()}
              </span>
              <img
                src={xIcon}
                onClick={() => handleDeleteInterval(interval.id)}
                alt="Ukloni interval"
                className={c.deleteIcon}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Trenutno nema unesenih perioda.</p>
      )}

      <div className={c.intervalContainer}>
        <label>
          Od: <input type="date" min={getMinDate(1)} ref={startDateRef} />
        </label>

        <label>
          Do: <input type="date" min={getMinDate(2)} ref={endDateRef} />
        </label>
      </div>

      <button
        type="button"
        onClick={handleAddInterval}
        className={c.confirmButton}
      >
        Potvrdi
      </button>
    </div>
  );
};
