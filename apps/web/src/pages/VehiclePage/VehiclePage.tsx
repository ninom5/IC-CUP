import {
  CheckoutPopUp,
  CustomDatePicker,
  Footer,
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
import { useFiltersContext } from "@hooks/useFiltersContext";

export const VehiclePage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return;

  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [selectedCard, setSelectedCard] = useState<InsuranceKey | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [date, setDate] = useState<[Date | null, Date | null]>([null, null]);

  const { data, isLoading, error } = useFetchVehicleById(id);
  const { dateRange } = useFiltersContext();

  useEffect(() => {
    if (data) setVehicle(data);
  }, [data]);

  if (isLoading) return <div>Loading</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!vehicle) return <div>Problem with getting vehicle info</div>;

  const insurancePrice = selectedCard
    ? insuranceCategories[selectedCard].price
    : 0;

  const basePrice =
    date[1] && date[0]
      ? (date[1]?.getDate() - date[0]?.getDate() + 1) * vehicle.dailyPrice
      : 0;

  const provisionPrice = basePrice * 0.1;

  const totalPrice = basePrice + provisionPrice + insurancePrice;

  const vehicleDatesAvailabilities = vehicle.availabilities.map((a) => ({
    startDate: new Date(a.startDate),
    endDate: new Date(a.endDate),
  }));

  return (
    <>
      <section className="vehicle-page">
        <VehicleGallery vehicle={vehicle} />

        <div className="about-vehicle">
          <VehicleDescription vehicle={vehicle} />

          <div className="booking-section">
            <CustomDatePicker
              value={dateRange}
              onChange={setDate}
              availableDateRanges={vehicleDatesAvailabilities}
            />

            <InsuranceList
              selectedCard={selectedCard}
              onSelect={setSelectedCard}
            />
            <section className="pre-checkout">
              <h1>
                <span>CIJENA</span>
                <span>{totalPrice?.toFixed(2)} €</span>
              </h1>

              <button
                onClick={() => setShowCheckoutForm(true)}
                disabled={selectedCard ? false : true}
              >
                {selectedCard ? "Nastavi" : "Odaberite osiguranje"}
              </button>
            </section>
            {showCheckoutForm && (
              <CheckoutPopUp
                setShowCheckoutForm={setShowCheckoutForm}
                selectedCard={selectedCard}
                price={{
                  dailyPrice: vehicle.dailyPrice,
                  insurancePrice: insurancePrice,
                  totalPrice: totalPrice,
                  provisionPrice: provisionPrice,
                }}
              />
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
