import { useFetchUserVehicle } from "@api/useFetchUserVehicle";
import c from "./UserVehiclePage.module.css";
import { useParams } from "react-router-dom";
import starIcon from "../../assets/images/starIcon.svg";
import checkmarkIcon from "../../assets/images/checkmarkIcon.svg";
import pencilIcon from "../../assets/images/pencilIcon.svg";
import { AddVehicleAvailibility } from "@components/index";
import { getMinDate } from "@utils/getMinDate.util";

export const UserVehiclePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useFetchUserVehicle(id || "");

  if (isLoading) {
    return <div className={c.loading}>Loading vehicle data...</div>;
  }

  if (error) {
    return <div className={c.error}>Error: {error.message}</div>;
  }

  if (!data) {
    return <div className={c.error}>No vehicle data found</div>;
  }

  console.log(data.registrationExpiration);

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

        <div className={c.registrationContainer}>
          <div className={c.inputContainer}>
            <h3>Registracija</h3>
            <input
              type="text"
              name="registration"
              placeholder="ST-1234-AB"
              value={data.registration}
              disabled
            />
          </div>

          <div className={c.inputContainer}>
            <h3>Datum isteka</h3>
            <input
              type="date"
              name="registrationExpiration"
              min={getMinDate(30)}
              max={getMinDate(365)}
              value={
                new Date(data.registrationExpiration)
                  .toISOString()
                  .split("T")[0]
              }
              disabled
            />
          </div>

          <img src={pencilIcon} className={c.pencilIcon} />
        </div>

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

        <div className={c.inputContainer}>
          <h3>
            Cijena / po danu <img src={pencilIcon} className={c.pencilIcon} />
          </h3>
          <label className={c.priceLabel}>
            <input
              type="number"
              name="dailyPrice"
              min={1}
              placeholder="70.00"
              value={data.dailyPrice}
              disabled
            />{" "}
            €
          </label>
        </div>
      </div>
    </section>
  );
};
