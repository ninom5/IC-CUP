import { InsuranceKey, insuranceLevelMap } from "@constants/index";
import "./checkoutPopUp.css";

export const CheckoutPopUp = ({
  setShowCheckoutForm,
  selectedCard,
  price,
}: {
  setShowCheckoutForm: (value: boolean) => void;
  selectedCard: InsuranceKey | null;
  price: { dailyPrice: number; insurancePrice: number };
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="close-button"
          onClick={() => setShowCheckoutForm(false)}
        >
          ×
        </button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Rezervacija uspješna!");
          }}
        >
          <h2>Potvrdite rezervaciju</h2>

          <div className="checkout-card">
            <h2>Kreditna kartica</h2>

            <div className="form-group" id="card-number">
              <label htmlFor="card-number">Broj kartice</label>
              <input
                type="text"
                placeholder="Broj kartice"
                name="card-number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiration-date">Datum isteka</label>
              <input
                type="month"
                placeholder="MM/YY"
                name="expiration-date"
                id="expiration-date"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card-cvv">CVV</label>
              <input
                type="text"
                placeholder="123"
                name="card-cvv"
                id="card-cvv"
              />
            </div>
          </div>

          <div className="insurance-level-checkout">
            {selectedCard && insuranceLevelMap[selectedCard]}
          </div>

          <div>
            <label htmlFor="message">
              Možete unijeti poruku vlasniku ako želite
            </label>
            <input type="text" name="message" />
          </div>

          <h4>
            Dnevna cijena: {price.dailyPrice}, osiguranje:{" "}
            {price.insurancePrice}, provizija:{" "}
            {(price.dailyPrice * 0.1).toFixed(2)}, ukupno:{" "}
            {(price.dailyPrice * 1.1 + price.insurancePrice).toFixed(2)}
          </h4>

          <button type="submit">Potvrdi rezervaciju</button>
        </form>
      </div>
    </div>
  );
};
