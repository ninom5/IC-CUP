import { useFetchUserVehicle } from "@api/index";
import c from "./UserVehiclePage.module.css";
import { useParams } from "react-router-dom";
import starIcon from "../../assets/images/starIcon.svg";
import {
  AddVehicleAvailability,
  Footer,
  VehicleDescriptionEdit,
  VehicleLicenseImgEdit,
  VehiclePriceEdit,
  VehicleRegistrationEdit,
} from "@components/index";
import { useUpdateVehicle } from "@api/index";
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
    <>
      <section className={c.userVehicleSection}>
        <div className={c.imagesContainer}>
          {data.images.map((i, index) => (
            <img key={index} src={i} />
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

          <AddVehicleAvailability vehicleId={id || ""} />

          <VehicleDescriptionEdit
            description={data.description}
            handleUpdateVehicle={handleUpdateVehicle}
          />

          <VehicleRegistrationEdit
            registration={data.registration}
            registrationExpiration={data.registrationExpiration}
            handleUpdateVehicle={handleUpdateVehicle}
          />

          <VehicleLicenseImgEdit handleUpdateVehicle={handleUpdateVehicle} />

          <VehiclePriceEdit
            dailyPrice={data.dailyPrice}
            handleUpdateVehicle={handleUpdateVehicle}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};
