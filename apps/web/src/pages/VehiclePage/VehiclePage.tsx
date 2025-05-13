import {
  InsuranceList,
  VehicleDescription,
  VehicleGallery,
} from "@components/index";
import { VehicleType } from "types/vehicle.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchVehicleById } from "@api/index";
import "./VehiclePage.css";
import {
  insuranceCategories,
  InsuranceKey,
} from "@constants/insuranceCategories";

export const VehiclePage = () => {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [selectedCard, setSelectedCard] = useState<InsuranceKey | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (!id) return;

  const { data, isLoading, error } = useFetchVehicleById(id);

  useEffect(() => {
    console.log(data);
    if (data) setVehicle(data);
  }, [data]);

  if (isLoading) return <div>Loading</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!vehicle) return <div>Problem with getting vehicle info</div>;

  const insurancePrice = selectedCard
    ? insuranceCategories[selectedCard].price
    : 0;

  const totalPrice = vehicle.dailyPrice + insurancePrice;

  return (
    <section className="vehicle-page">
      <VehicleGallery vehicle={vehicle} />

      <section className="about-vehicle">
        <VehicleDescription vehicle={vehicle} />

        <div>
          <InsuranceList
            selectedCard={selectedCard}
            onSelect={setSelectedCard}
          />

          <div className="pre-checkout">
            <h1>
              <span>CIJENA</span>
              <span>{totalPrice} €</span>
            </h1>

            <button onClick={() => setShowCheckoutForm(true)}>Nastavi</button>
          </div>

          {showCheckoutForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button
                  className="close-button"
                  onClick={() => setShowCheckoutForm(false)}
                >
                  ×
                </button>
                <h2>Unesite podatke za iznajmljivanje</h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Rezervacija uspješna!");
                  }}
                >
                  <h2>Potvrdite rezervaciju</h2>

                  <div>
                    <label htmlFor="message">
                      Možete unijeti poruku vlasniku ako želite
                    </label>
                    <input type="text" name="message" />
                  </div>
                  <div>
                    <label>Način plaćanja</label>
                    <p>Kartica</p>
                  </div>

                  <button type="submit">Potvrdi rezervaciju</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};
