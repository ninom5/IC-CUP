import { useFetchUserVehicle } from "@api/useFetchUserVehicle";
import c from "./UserVehiclePage.module.css";
import { useParams } from "react-router-dom";
import starIcon from "../../assets/images/starIcon.svg";
import checkmarkIcon from "../../assets/images/checkmarkIcon.svg";
import pencilIcon from "../../assets/images/pencilIcon.svg";
import {
  AddVehicleAvailibility,
  VehiclePriceEdit,
  VehicleRegistrationEdit,
} from "@components/index";
import { useUpdateVehicle } from "@api/useUpdateVehicle";
import { VehicleData } from "../../types/index";
import { toast } from "react-toastify";

export const UserVehiclePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, refetch } = useFetchUserVehicle(id || "");
  const updateVehicle = useUpdateVehicle();

  if (isLoading) {
    return <div className={c.loading}>Loading vehicle data...</div>;
  }

  if (error) {
    return <div className={c.error}>Error: {error.message}</div>;
  }

  if (!data) {
    return <div className={c.error}>No vehicle data found</div>;
  }

  const handleUpdateVehicle = async (data: Partial<VehicleData>) => {
    if (!id) return toast.error("ID vozila ne postoji");
    await updateVehicle.mutateAsync({ id, data });

    await refetch();
  };

  return (
    <section className={c.userVehicleSection}>
      <div className={c.imagesContainer}>
        {data.images.map((i) => (
          <img key={i} src={i} />
        ))}
      </div>

      <div className={c.vehicleTextContainer}>
        <div className={c.vehicleHeader}>
          <h1>
            <span>{data.brand}</span>
            <span>{data.model}</span>
            <span>{data.productionYear}</span>
          </h1>

          <h3>
            {data.avgRating ? (
              <>
                {data.avgRating} <img src={starIcon} /> ({data.reviewCount})
              </>
            ) : (
              "Još nema recenzija za ovo vozilo"
            )}
          </h3>
        </div>

        <AddVehicleAvailibility vehicleId={id || ""} />

        <div className={c.descriptionContainer}>
          <h3>
            Opis <img src={pencilIcon} className={c.pencilIcon} />
          </h3>
          <p>{data.description ? data.description : "Nema opisa"}</p>
        </div>

        <VehicleRegistrationEdit
          registration={data.registration}
          registrationExpiration={data.registrationExpiration}
          handleUpdateVehicle={handleUpdateVehicle}
        />

        <div className={c.inputContainer}>
          <h3>Slika prometne dozvole</h3>

          <img src={checkmarkIcon} alt="checkmark" />

          <div>
            <button className={c.fileInput}>Promijeni</button>
            <input
              type="file"
              name=""
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
        </div>

        <VehiclePriceEdit
          dailyPrice={data.dailyPrice}
          handleUpdateVehicle={handleUpdateVehicle}
        />
      </div>
    </section>
  );
};
