import { isRegisterDataValid, generatePDF } from "@utils/index";
import { routes } from "@routes/index";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useRegister,
  useUploadFiles,
  getUserByEmail,
  useUploadImages,
} from "@api/index";
import "./registerForm.css";

export const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const { mutate: register } = useRegister();
  const { mutateAsync: uploadImages } = useUploadImages();
  const { mutateAsync: uploadFiles } = useUploadFiles();

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

  const navigate = useNavigate();

  const handlePersonPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    setPersonPhotoFile(file);
    setPersonPreview(URL.createObjectURL(file));
  };

  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    if (images.length > 2) {
      toast.error("You can only upload 2 images for ID card.");
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
      toast.error("You can only upload 2 images for Driver License card.");
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
      toast.error("You must upload your photo");
      return;
    }

    if (!driverLicenseFile || driverLicenseFile.length !== 2) {
      toast.error("You must upload front and back side of driver license");
      return;
    }

    if (!idCardFile || idCardFile.length !== 2) {
      toast.error("You must upload front and back side of id card");
      return;
    }

    const isValidMessage = isRegisterDataValid(registerData);
    if (isValidMessage) {
      toast.error(isValidMessage);
      return;
    }

    const user = await getUserByEmail(registerData.email);
    if (user) {
      toast.error("User with provided email already exists");
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
        toast.error("Response data is empty");
        return;
      }

      pdfUrls = Object.values(response).map((value: any) => value.secure_url);

      if (pdfUrls.length !== 2) {
        toast.error("Error uploading both files");
        return;
      }

      toast.success("Files uploaded successfully");
    }

    const personPhotoResponse = await uploadImages(personPhotoFile);

    if (!personPhotoResponse) {
      toast.error("Response link is empty");
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

    setRegisterData(updatedRegisterData);

    try {
      register(updatedRegisterData, {
        onSuccess: () => {
          toast.success("Successfully registered. Now you can login.");

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

          navigate(routes.LOGIN);
        },
        onError: (error) => {
          toast.error(error.message || "Registration failed");
        },
      });
    } catch (error: Error | any) {
      console.error(`Error registering: ${error}`);
      toast.error(`Error while registering: ${error?.response?.data?.message}`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="register-pop-up" onClick={(e) => e.stopPropagation()}>
        <section className="register-section">
          <h1>Registracija</h1>
          <span className="close-span" onClick={onClose}>
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
              <section className="documents-upload">
                <div>
                  <h2>Vozačka dozvola</h2>

                  <div className="preview-container">
                    {driverLicensePreviews.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt="Slika"
                        className="preview-image"
                      />
                    ))}
                  </div>

                  <label htmlFor="driverLicense" className="custom-file-upload">
                    Prenesi fotografije
                  </label>
                  <input
                    type="file"
                    id="driverLicense"
                    name="driverLicense"
                    className="hidden-input"
                    multiple
                    onChange={handleDriverLicenseChange}
                  />
                </div>

                <div>
                  <h2>Osobna iskaznica</h2>

                  <div className="preview-container">
                    {idCardPreviews.map((src, index) => (
                      <div key={index} className="preview-item">
                        <img src={src} alt="Slika" className="preview-image" />
                      </div>
                    ))}
                  </div>

                  <label htmlFor="idCard" className="custom-file-upload">
                    Prenesi fotografije
                  </label>
                  <input
                    type="file"
                    id="idCard"
                    name="idCard"
                    className="hidden-input"
                    multiple
                    onChange={handleIdCardChange}
                  />
                </div>
              </section>
            )}

            {formStep === 3 && (
              <section className="person-photo-upload">
                <h2>Profilna fotografija</h2>

                <div className="preview-container">
                  {personPreview && (
                    <div className="preview-item person-preview">
                      <img
                        src={personPreview}
                        alt="Slika"
                        className="preview-image"
                      />
                    </div>
                  )}
                </div>

                <p className="person-photo-description">
                  (Pripazi da se jasno vidi tvoje lice)
                </p>

                <label htmlFor="personPhoto" className="custom-file-upload">
                  Prenesi fotografiju
                </label>
                <input
                  type="file"
                  id="personPhoto"
                  name="personPhoto"
                  className="hidden-input"
                  onChange={handlePersonPhotoChange}
                />
              </section>
            )}

            <div className="form-buttons">
              {formStep > 1 && (
                <button type="button" onClick={() => setFormStep(formStep - 1)}>
                  Nazad
                </button>
              )}
              {formStep <= 2 && (
                <>
                  <button type="button" onClick={() => handleNextStepClick()}>
                    Dalje
                  </button>
                </>
              )}
              {formStep === 3 && <button type="submit">Registriraj se</button>}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
