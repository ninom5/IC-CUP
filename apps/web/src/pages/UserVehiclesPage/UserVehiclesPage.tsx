import { useFetchUserVehicles } from "@api/useFetchUserVehicles";
import interiorMirror from "../../assets/images/interiorMirror.svg";
import c from "./UserVehiclesPage.module.css";
import { extractUserInfo } from "@utils/extractUserInfo.util";
import { useNavigate } from "react-router-dom";
import starIcon from "../../assets/images/starIcon.svg";
import pencilIcon from "../../assets/images/pencilIcon.svg";
import { Footer } from "@components/index";

export const UserVehiclesPage = () => {
  const userData = extractUserInfo();
  const { data, isLoading, error } = useFetchUserVehicles(userData.data.id);
  const navigate = useNavigate();

  const handleAddVehicle = () => {
    navigate("/user/vehicle/add-vehicle");
  };

  const handleUserVehicle = (vehicleId: string) => {
    navigate(`/user/vehicle/${vehicleId}`);
  };

  if (isLoading) {
    return (
      <section className={c.userVehiclesSection}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={c.userVehiclesSection}>
        <h1>{error.message}</h1>
      </section>
    );
  }

  return (
    <>
      <section className={c.userVehiclesSection}>
        {data?.length === 0 ? (
          <>
            <h1>Nisi još dodao svoje vozilo!</h1>
            <div className={c.callToActionContainer}>
              <img src={interiorMirror} alt="Dodaj vozilo" />
              <button onClick={handleAddVehicle}>Dodaj vozilo</button>
            </div>
          </>
        ) : (
          <>
            <h1>Tvoja vozila</h1>

            <button onClick={handleAddVehicle}>Dodaj vozilo</button>

            <div className={c.itemsContainer}>
              {data?.map((i) => (
                <div key={i.id} className={c.itemCard}>
                  <img src={i.images[0]} />
                  <div className={c.itemDetails}>
                    <div className={c.vehicleHeader}>
                      <h3>
                        {i.model} {i.brand}
                      </h3>
                      <img
                        src={pencilIcon}
                        onClick={() => handleUserVehicle(i.id)}
                      />
                    </div>

                  <p className={c.ratingParagraph}>
                    {i.reviewCount ? (
                      <>
                        {i.avgRating} <img src={starIcon} /> ({i.reviewCount})
                      </>
                    ) : (
                      "Još nema recenzija za ovo vozilo"
                    )}
                  </p>

                    <p className={c.dailyPrice}>
                      <strong>{i.dailyPrice} €</strong> / po danu
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};
