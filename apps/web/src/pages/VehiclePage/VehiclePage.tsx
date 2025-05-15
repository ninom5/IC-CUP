import "./vehiclePage.css";
import {
  ButtonAccent,
  CheckoutPopUp,
  CustomAvailableDatePicker,
  Footer,
  InsuranceList,
  VehicleDescription,
  VehicleGallery,
} from "@components/index";
import { CreateRental, EmailSendType, VehicleType } from "types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCreateRentalPayment,
  useFetchVehicleById,
  useSendEmail,
} from "@api/index";
import { insuranceCategories, InsuranceKey } from "@constants/index";
import { extractUserInfo } from "@utils/extractUserInfo.util";

export const VehiclePage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return;

  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [selectedCard, setSelectedCard] = useState<InsuranceKey | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [date, setDate] = useState<[Date | null, Date | null]>([null, null]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const openSideMenu = () => {
    setIsSideMenuOpen(true);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const { data, isLoading, error } = useFetchVehicleById(id);

  const {
    data: { id: userId },
  } = extractUserInfo();

  const createRentalPayment = useCreateRentalPayment();
  const sendEmail = useSendEmail();

  const handleConfirmCheckout = (message: string) => {
    if (!vehicle || !date[0] || !date[1]) return;

    const rentalData: CreateRental = {
      renterId: userId,
      vehicleId: id,
      startDate: date[0],
      endDate: date[1],
      totalPrice: basePrice,
    };

    createRentalPayment.mutate(rentalData);

    const emailData: EmailSendType = {
      to: vehicle.owner.email,
      subject: "Potvrda rezervacije",
      ownerName: vehicle.owner?.firstName,
      renterName: "*******",
      message: message,
    };

    sendEmail.mutate(emailData);

    setShowCheckoutForm(false);
  };

  useEffect(() => {
    if (data) setVehicle(data);
  }, [data]);

  if (isLoading) return <div>Loading</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!vehicle) return <div>Problem with getting vehicle info</div>;

  const insurancePrice = selectedCard
    ? insuranceCategories[selectedCard].price
    : 0;

  const numberOfDays =
    date[1] && date[0] ? date[1]?.getDate() - date[0]?.getDate() + 1 : 0;

  const basePrice = numberOfDays * vehicle.dailyPrice;

  const provisionPrice = basePrice * 0.1;

  const totalPrice = basePrice + provisionPrice + insurancePrice;

  const priceProps = {
    dailyPrice: vehicle.dailyPrice,
    insurancePrice: insurancePrice,
    totalPrice: totalPrice,
    provisionPrice: provisionPrice,
  };

  const vehicleDatesAvailabilities = vehicle.availabilities?.map((a) => ({
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
            <CustomAvailableDatePicker
              value={date}
              onChange={setDate}
              availableDateRanges={vehicleDatesAvailabilities}
            />

            <InsuranceList
              selectedCard={selectedCard}
              onSelect={setSelectedCard}
            />

            {userId !== vehicle.ownerId && (
              <section className="pre-checkout">
                <h1>
                  <span>CIJENA</span>
                  <span>{totalPrice?.toFixed(2)} €</span>
                </h1>

                <button
                  onClick={() => setShowCheckoutForm(true)}
                  disabled={selectedCard && date[0] && date[1] ? false : true}
                >
                  {selectedCard && date[0] && date[1]
                    ? "Nastavi"
                    : "Odaberite osiguranje i datum"}
                </button>
              </section>
            )}

            {showCheckoutForm && (
              <CheckoutPopUp
                setShowCheckoutForm={setShowCheckoutForm}
                price={priceProps}
                onConfirm={handleConfirmCheckout}
              />
            )}
          </div>
        </div>

        {isSideMenuOpen && (
          <div className="full-screen-menu-overlay" onClick={closeSideMenu}>
            <div
              className="full-screen-menu"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={closeSideMenu}>
                ✕
              </button>

              <div className="mobile-menu-list">
                <CustomAvailableDatePicker
                  value={date}
                  onChange={setDate}
                  availableDateRanges={vehicleDatesAvailabilities}
                />

                <InsuranceList
                  selectedCard={selectedCard}
                  onSelect={setSelectedCard}
                />

                {userId !== vehicle.ownerId && (
                  <section className="pre-checkout mobile-pre-checkout">
                    <h1>
                      <span>CIJENA</span>
                      <span>{totalPrice?.toFixed(2)} €</span>
                    </h1>

                    <button
                      onClick={() => setShowCheckoutForm(true)}
                      disabled={
                        selectedCard && date[0] && date[1] ? false : true
                      }
                    >
                      {selectedCard && date[0] && date[1]
                        ? "Nastavi"
                        : "Odaberite osiguranje i datum"}
                    </button>
                  </section>
                )}

                {showCheckoutForm && (
                  <CheckoutPopUp
                    setShowCheckoutForm={setShowCheckoutForm}
                    price={priceProps}
                    onConfirm={handleConfirmCheckout}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mobile-reserve-button">
          <ButtonAccent content="Rezerviraj" onClick={openSideMenu} />
        </div>
      </section>
      <Footer />
    </>
  );
};
