import "./checkoutPopUp.css";
import { useState } from "react";
import { CheckoutPriceProps } from "types";
import { likeSvg } from "@assets/images";

export const CheckoutPopUp = ({
  setShowCheckoutForm,
  price,
  onConfirm,
}: {
  setShowCheckoutForm: (value: boolean) => void;
  price: CheckoutPriceProps;
  onConfirm: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");
  const [formatted, setFormatted] = useState("");

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(message);
  };

  const thisDay = new Date();
  let year = thisDay.getFullYear();
  let month = thisDay.getMonth() + 2;

  if (month > 12) {
    month = 1;
    year += 1;
  }

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormatted(formattedValue);
  };

  const minMonth = `${year}-${month.toString().padStart(2, "0")}`;
  return (
    <div className="modal-overlay">
      <div className="modal-content modal-checkout-mobile">
        <button
          className="close-button"
          onClick={() => setShowCheckoutForm(false)}
        >
          ×
        </button>

        <form onSubmit={handleCheckoutSubmit}>
          <div className="checkout-card">
            <h2>Kreditna kartica</h2>

            <div className="form-group" id="card-number">
              <label htmlFor="card-number">Broj kartice</label>
              <input
                type="text"
                placeholder="Broj kartice"
                name="card-number"
                required
                minLength={19}
                maxLength={19}
                onChange={handleChange}
                value={formatted}
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiration-date">Datum isteka</label>
              <input
                type="month"
                placeholder="MM/YY"
                name="expiration-date"
                id="expiration-date"
                required
                min={minMonth}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card-cvv">CVV</label>
              <input
                type="number"
                placeholder="123"
                name="card-cvv"
                id="card-cvv"
                required
                maxLength={3}
              />
            </div>
          </div>

          <div className="message-container">
            <label htmlFor="message">Ostavi poruku za vlasniku</label>
            <input
              type="text"
              name="message"
              id="message-input"
              onChange={(e) => setMessage(e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="total-price">
            <h3>Ukupna cijena </h3>
            <h3>{price.totalPrice}€</h3>
          </div>

          <div className="price-details">
            <p>Osiguranje {price.insurancePrice}€</p>
            <p>Dnevna cijena {price.dailyPrice}€</p>
            <p>Provizija {price.provisionPrice}€</p>
          </div>

          <h3 className="free-cancellation">
            <img src={likeSvg} alt="like" /> BESPLATNO otkaži vožnju do 24h
            prije
          </h3>

          <button type="submit">Plati</button>
        </form>
      </div>
    </div>
  );
};
