import { useUpdateUser, useUploadDocumentsForProfile } from "@api/index";
import c from "./DocumentsSettings.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { generatePDF } from "@utils/generatePdf.util";
import { fallbackImageSvg } from "@assets/images";

type Props = {
  userId: string;
  refetch: () => void;
};

export const DocumentsSettings = ({ userId, refetch }: Props) => {
  const [idCardFiles, setIdCardFiles] = useState<File[]>([]);
  const [licenseFiles, setLicenseFiles] = useState<File[]>([]);
  const [idCardPreviews, setIdCardPreviews] = useState<string[]>([]);
  const [licensePreviews, setLicensePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadDocumentsForProfile } =
    useUploadDocumentsForProfile();
  const { mutateAsync: updateUser } = useUpdateUser();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isIdCard: boolean
  ) => {
    const files = Array.from(e.target.files || []).slice(0, 2);
    const previews = files.map((file) => URL.createObjectURL(file));

    if (isIdCard) {
      setIdCardFiles(files);
      setIdCardPreviews(previews);
    } else {
      setLicenseFiles(files);
      setLicensePreviews(previews);
    }
  };

  const uploadDocuments = async (isIdCard: boolean) => {
    const updatePayload: {
      id: string;
      idCard?: string;
      driverLicense?: string;
    } = {
      id: userId,
    };

    try {
      setIsUploading(true);

      const files = isIdCard ? idCardFiles : licenseFiles;
      if (files.length !== 2) {
        toast.error("Prenesi dvije slike (prednja i stražnja strana).");
        return;
      }

      const pdf = await generatePDF(files[0], files[1]);
      if (!pdf) {
        toast.error("PDF generacija nije uspjela.");
        return;
      }

      const label = isIdCard ? "idCard" : "driverLicense";
      const newFile = new File([pdf], `${label}.pdf`, {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      const response = await uploadDocumentsForProfile([newFile]);
      if (!response || response.length !== 1 || !response[0].secure_url) {
        toast.error("Greška pri uploadu.");
        return;
      }

      if (isIdCard) updatePayload.idCard = response[0].secure_url;
      else updatePayload.driverLicense = response[0].secure_url;

      await updateUser(updatePayload);
      toast.success("Dokument uspješno spremljen.");
      refetch();
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Greška pri spremanju dokumenta.");
    } finally {
      setIsUploading(false);
    }
  };

  const renderPreview = (previews: string[]) => (
    <div className={c.previewRow}>
      {[0, 1].map((i) => (
        <div key={i} className={c.previewBox}>
          <img
            src={previews[i] || fallbackImageSvg}
            className={c.previewImage}
            alt={`preview-${i}`}
          />
          <p className={c.previewLabel}>
            {i === 0 ? "(prednja strana)" : "(stražnja strana)"}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className={c.documentSection}>
      {/* Vozačka dozvola */}
      <div className={c.uploadGroup}>
        <h3>Vozačka dozvola</h3>
        {renderPreview(licensePreviews)}
        <label htmlFor="driverLicense" className={c.uploadButton}>
          Prenesi fotografije
        </label>
        <input
          type="file"
          id="driverLicense"
          multiple
          accept="image/*"
          onChange={(e) => handleFileChange(e, false)}
          className={c.hiddenInput}
        />
        <button onClick={() => uploadDocuments(false)} disabled={isUploading}>
          {isUploading ? "Spremanje..." : "Spremi vozačku"}
        </button>
      </div>

      {/* Osobna iskaznica */}
      <div className={c.uploadGroup}>
        <h3>Osobna iskaznica</h3>
        {renderPreview(idCardPreviews)}
        <label htmlFor="idCard" className={c.uploadButton}>
          Prenesi fotografije
        </label>
        <input
          type="file"
          id="idCard"
          multiple
          accept="image/*"
          onChange={(e) => handleFileChange(e, true)}
          className={c.hiddenInput}
        />
        <button onClick={() => uploadDocuments(true)} disabled={isUploading}>
          {isUploading ? "Spremanje..." : "Spremi osobnu"}
        </button>
      </div>
    </div>
  );
};
