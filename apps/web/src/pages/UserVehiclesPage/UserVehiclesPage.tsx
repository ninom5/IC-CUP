import { useFetchUserVehicles } from "@api/useFetchUserVehicles";
import interiorMirror from "../../assets/images/interiorMirror.svg";
import c from "./UserVehiclesPage.module.css";
import { extractUserInfo } from "@utils/extractUserInfo.util";
import { useNavigate } from "react-router-dom";

export const UserVehicles = () => {
  const userData = extractUserInfo();
  const { data, isLoading, error } = useFetchUserVehicles(userData.data.id);
  const navigate = useNavigate();

  const handleAddVehicle = () => {
    navigate("/add-vehicle");
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
          {data?.map((i) => (
            <div key={i.id} className={c.itemCard}>
              <img src={i.images[0]} />
              <div className={c.itemDetails}>
                <h3>
                  {i.model} {i.brand}
                </h3>
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
};
