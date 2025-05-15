import React from "react";
import { RegisterDataType } from "types";

export const RegisterStep1 = ({
  registerData,
  handleChange,
}: {
  registerData: RegisterDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <div className="form-group">
        <label>Ime</label>
        <input
          id="firstName"
          name="firstName"
          value={registerData.firstName}
          onChange={handleChange}
          type="text"
          placeholder="Ivan"
          required
        />
      </div>

      <div className="form-group">
        <label>Prezime</label>
        <input
          id="lastName"
          name="lastName"
          value={registerData.lastName}
          onChange={handleChange}
          type="text"
          placeholder="Horvat"
          required
        />
      </div>

      <div className="form-group">
        <label>Lozinka</label>
        <input
          id="password"
          name="password"
          value={registerData.password}
          onChange={handleChange}
          type="password"
          placeholder="********"
          required
        />
      </div>

      <div className="form-group">
        <label>Ponovi lozinku</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          value={registerData.confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="********"
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          id="email"
          name="email"
          value={registerData.email}
          onChange={handleChange}
          type="email"
          placeholder="ivan@horvat.com"
          required
        />
      </div>

      <div className="form-group">
        <label>Broj mobitela</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          value={registerData.phoneNumber}
          onChange={handleChange}
          type="number"
          placeholder="091 **** ***"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Adresa</label>
        <input
          id="address"
          name="address"
          value={registerData.address}
          onChange={handleChange}
          type="text"
          placeholder="Adresa"
          required
        />
      </div>

      <div className="form-group">
        <label>Datum rođenja</label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          value={registerData.dateOfBirth}
          onChange={handleChange}
          type="date"
        />
      </div>
    </>
  );
};
