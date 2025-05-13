import {
  CheckoutPopUp,
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

  const totalPrice = vehicle.dailyPrice * 1.1 + insurancePrice;

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
              <span>{totalPrice.toFixed(2)} €</span>
            </h1>

            <button
              onClick={() => setShowCheckoutForm(true)}
              disabled={selectedCard ? false : true}
            >
              {selectedCard ? "Nastavi" : "Odaberite osiguranje"}
            </button>
          </div>

          {showCheckoutForm && (
            <CheckoutPopUp
              setShowCheckoutForm={setShowCheckoutForm}
              selectedCard={selectedCard}
              price={{
                dailyPrice: vehicle.dailyPrice,
                insurancePrice: insurancePrice,
              }}
            />
          )}
        </div>
      </section>
    </section>
  );
};
