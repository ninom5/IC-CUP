import { useRef } from "react";
import { StepProps } from "../../../types";
import c from "./ThirdStep.module.css";
import imagePlaceholder from "../../../assets/images/imagePlaceholder.svg";

export const ThirdStep = ({ data, onDataChange }: StepProps) => {
  const inputFilesRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      const totalImages = newImages.slice(0, 5);
      onDataChange({
        ...data,
        images: totalImages,
      });
    }
  };

  return (
    <div className={c.form}>
      <div className={c.imagesContainer}>
        <h3>Dodaj 5 slika</h3>

        <div className={c.imagesWrapper}>
          {[0, 1, 2, 3, 4].map((i) => (
            <>
              {data.images[i] ? (
                <img
                  className={c.selectedImage}
                  src={URL.createObjectURL(data.images[i])}
                  alt={`Preview ${i + 1}`}
                />
              ) : (
                <div key={i} className={c.imagePlaceholder}>
                  <img src={imagePlaceholder} alt="Placeholder" />
                </div>
              )}
            </>
          ))}
        </div>

        <div className={c.buttonContainer}>
          <button
            type="button"
            onClick={() => inputFilesRef.current?.click()}
            className={c.fileInput}
          >
            {data.images.length > 0 ? "Promijeni" : "Prenesi slike"}
          </button>

          <input
            type="file"
            multiple
            accept="image/*"
            ref={inputFilesRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className={c.descriptionContainer}>
        <h3>Dodaj opis</h3>
        <textarea maxLength={300}></textarea>
      </div>
    </div>
  );
};
