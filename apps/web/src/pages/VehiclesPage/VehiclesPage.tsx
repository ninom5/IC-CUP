import { VehicleList, VehiclesMap } from "@components/index";
import "./vehiclesPage.css";
import { useState } from "react";
import { car, map } from "assets/images/index";

export const VehiclesPage = () => {
  const [view, setView] = useState("map");

  const isSmallScreen = window.innerWidth < 700;

  const toggleView = () => {
    setView((prev) => (prev === "map" ? "list" : "map"));
  };

  return (
    <section className="vehicles-page">
      {isSmallScreen ? (
        view === "map" ? (
          <VehiclesMap />
        ) : (
          <VehicleList />
        )
      ) : (
        <>
          <VehicleList />
          <VehiclesMap />
        </>
      )}

      {isSmallScreen && (
        <button onClick={toggleView} className="toggle-map-button">
          {view === "map" ? (
            <>
              Vozila <img src={car} alt="vozila" />
            </>
          ) : (
            <>
              Karta <img src={map} alt="karta" />
            </>
          )}
        </button>
      )}
    </section>
  );
};
