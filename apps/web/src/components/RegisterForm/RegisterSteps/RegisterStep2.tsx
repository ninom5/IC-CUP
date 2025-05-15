export const RegisterStep2 = ({
  driverLicensePreviews,
  handleDriverLicenseChange,
  idCardPreviews,
  handleIdCardChange,
}: {
  driverLicensePreviews: string[];
  handleDriverLicenseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  idCardPreviews: string[];
  handleIdCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <section className="documents-upload">
      <div className="aa">
        <h2>Vozačka dozvola</h2>

        <div className="preview-container">
          {driverLicensePreviews.map((src, index) => (
            <div key={index} className="preview-item">
              <img src={src} alt="Slika" className="preview-image" />
            </div>
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

      <div className="bb">
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
  );
};
