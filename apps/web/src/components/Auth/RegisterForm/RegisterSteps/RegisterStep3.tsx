export const RegisterStep3 = ({
  personPreview,
  handlePersonPhotoChange,
}: {
  personPreview: string | null;
  handlePersonPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <section className="person-photo-upload">
      <h2>Profilna fotografija</h2>

      <div className="preview-container">
        {personPreview && (
          <div className="preview-item person-preview">
            <img src={personPreview} alt="Slika" className="preview-image" />
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
  );
};
