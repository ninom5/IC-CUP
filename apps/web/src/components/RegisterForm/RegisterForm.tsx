import { isRegisterDataValid, generatePDF } from "@utils/index";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useRegister,
  useUploadFiles,
  getUserByEmail,
  useUploadImages,
} from "@api/index";
import "./registerForm.css";
import { useAuthContext } from "@hooks/useAuthContext";
import { Spinner } from "@components/index";
import { RegisterStep2 } from "@components/RegisterForm/RegisterSteps/RegisterStep2";
import { RegisterStep3 } from "@components/RegisterForm/RegisterSteps/RegisterStep3";

export const RegisterForm = () => {
  const { mutateAsync: uploadImages } = useUploadImages();
  const { mutateAsync: uploadFiles } = useUploadFiles();
  const { setShowLogin, setShowRegister } = useAuthContext();
  const { mutate: register, isPending } = useRegister(() => {
    setRegisterData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: "",
      personPhoto: "",
      driverLicense: "",
      idCard: "",
    });

    setShowRegister(false);
    setShowLogin(true);
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    personPhoto: "",
    driverLicense: "",
    idCard: "",
  });

  const [personPhotoFile, setPersonPhotoFile] = useState<File | null>(null);
  const [idCardFile, setIdCardFile] = useState<File[]>([]);
  const [driverLicenseFile, setDriverLicenseFile] = useState<File[]>([]);
  const [formStep, setFormStep] = useState(1);

  const [driverLicensePreviews, setDriverLicensePreviews] = useState<string[]>(
    []
  );
  const [idCardPreviews, setIdCardPreviews] = useState<string[]>([]);
  const [personPreview, setPersonPreview] = useState<string | null>(null);

  const handlePersonPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    setPersonPhotoFile(file);
    setPersonPreview(URL.createObjectURL(file));
  };

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    if (images.length > 2) {
      toast.error("Možete unijeti samo 2 slike za osobnu iskaznicu");
      return;
    }

    setIdCardFile(images);
    setIdCardPreviews(images.map((file) => URL.createObjectURL(file)));
  };

  const handleDriverLicenseChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const images = Array.from(e.target.files || []);
    if (images.length > 2) {
      toast.error("Možete unijeti samo 2 slike za vozačku iskaznicu");
      return;
    }

    setDriverLicenseFile(images);
    setDriverLicensePreviews(images.map((file) => URL.createObjectURL(file)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleNextStepClick = () => {
    const message = isRegisterDataValid(registerData);

    if (message) {
      toast.error(message);
      return;
    }

    setFormStep(formStep + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!personPhotoFile) {
      toast.error("Morate dodati svoju fotografiju");
      return;
    }

    if (!driverLicenseFile || driverLicenseFile.length !== 2) {
      toast.error("Morate dodati prednju i stražnju sliku vozačke dozvole");
      return;
    }

    if (!idCardFile || idCardFile.length !== 2) {
      toast.error("Morate dodati prednju i stražnju sliku osobne iskaznice");
      return;
    }

    const isValidMessage = isRegisterDataValid(registerData);
    if (isValidMessage) {
      toast.error(isValidMessage);
      return;
    }

    const user = await getUserByEmail(registerData.email);
    if (user) {
      toast.error("Korisnik s unesenim mailom već postoji");
      return;
    }

    const licensePdf = await generatePDF(
      driverLicenseFile[0],
      driverLicenseFile[1]
    );
    const idPdf = await generatePDF(idCardFile[0], idCardFile[1]);

    let pdfUrls: string[] = [];

    if (licensePdf && idPdf) {
      const idFile = new File([idPdf], "idCard.pdf", {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      const driverFile = new File([licensePdf], "license.pdf", {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      const response = await uploadFiles([idFile, driverFile]);
      if (!response) {
        toast.error("Pogreška prilikom spremanje datoteka");
        return;
      }

      pdfUrls = Object.values(response).map((value: any) => value.secure_url);

      if (pdfUrls.length !== 2) {
        toast.error("Pogreška prilikom spremanje datoteka");
        return;
      }
    }

    const personPhotoResponse = await uploadImages(personPhotoFile);

    if (!personPhotoResponse) {
      toast.error("Pogreška prilikom spremanje datoteka");
      return;
    }
    if (Array.isArray(personPhotoResponse)) {
      toast.error("Unexpected person photo cloudinary response");
      return;
    }

    const personPhotoLink = personPhotoResponse.secure_url;

    const updatedRegisterData = {
      ...registerData,
      idCard: pdfUrls[0],
      driverLicense: pdfUrls[1],
      personPhoto: personPhotoLink,
    };

    register(updatedRegisterData);
  };

  return (
    <div className="modal-overlay">
      <div className="register-pop-up" onClick={(e) => e.stopPropagation()}>
        <section className="register-section">
          <h1>Registracija</h1>
          <span className="close-span" onClick={() => setShowRegister(false)}>
            &times;
          </span>

          <form onSubmit={handleSubmit} className="register-form">
            {formStep === 1 && (
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
                    type="text"
                    placeholder="091 **** ***"
                    minLength={8}
                    maxLength={15}
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
            )}

            {formStep === 2 && (
              <RegisterStep2
                driverLicensePreviews={driverLicensePreviews}
                handleDriverLicenseChange={handleDriverLicenseChange}
                idCardPreviews={idCardPreviews}
                handleIdCardChange={handleIdCardChange}
              />
            )}

            {formStep === 3 && (
              <RegisterStep3
                personPreview={personPreview}
                handlePersonPhotoChange={handlePersonPhotoChange}
              />
            )}

            <div className="form-buttons">
              {isPending ? (
                <Spinner />
              ) : (
                <>
                  {formStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setFormStep(formStep - 1)}
                    >
                      Nazad
                    </button>
                  )}
                  {formStep <= 2 && (
                    <button type="button" onClick={handleNextStepClick}>
                      Dalje
                    </button>
                  )}
                  {formStep === 3 && (
                    <button type="submit">Registriraj se</button>
                  )}
                </>
              )}
            </div>
          </form>

          <p
            className="switch-auth-text"
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          >
            Imaš račun? Prijavi se
          </p>
        </section>
      </div>
    </div>
  );
};
