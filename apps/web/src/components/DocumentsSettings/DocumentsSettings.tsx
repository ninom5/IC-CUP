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
  const [idCardPreviews, setIdCardPreviews] = useState<string[]>([]);
  const [licensePreviews, setLicensePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: uploadDocumentsForProfile } =
    useUploadDocumentsForProfile();
  const { mutateAsync: updateUser } = useUpdateUser();

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isIdCard: boolean
  ) => {
    const files = Array.from(e.target.files || []).slice(0, 2);
    if (files.length !== 2) {
      toast.error("Prenesi dvije slike (prednja i stražnja strana).");
      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));
    if (isIdCard) setIdCardPreviews(previews);
    else setLicensePreviews(previews);

    setIsUploading(true);
    try {
      const pdf = await generatePDF(files[0], files[1]);
      if (!pdf) {
        toast.error("Greška pri generiranju PDF-a.");
        return;
      }

      const fileLabel = isIdCard ? "idCard" : "driverLicense";
      const uploadFile = new File([pdf], `${fileLabel}.pdf`, {
        type: "application/pdf",
        lastModified: Date.now(),
      });

      const response = await uploadDocumentsForProfile([uploadFile]);
      if (!response || response.length !== 1 || !response[0].secure_url) {
        toast.error("Greška pri uploadu dokumenta.");
        return;
      }

      const updatePayload: {
        id: string;
        idCard?: string;
        driverLicense?: string;
      } = { id: userId };
      if (isIdCard) updatePayload.idCard = response[0].secure_url;
      else updatePayload.driverLicense = response[0].secure_url;

      await updateUser(updatePayload);
      toast.success("Dokument uspješno spremljen.");
      refetch();
    } catch (err) {
      console.error("Greška:", err);
      toast.error("Greška pri spremanju dokumenta.");
    } finally {
      setIsUploading(false);
    }
  };

  const renderDocumentSection = (
    title: string,
    inputId: string,
    previews: string[],
    isIdCard: boolean
  ) => (
    <div className={c.uploadGroup}>
      <h3>{title}</h3>
      <div className={c.photos}>
        <div className={c.previewRow}>
          {[0, 1].map((i) => (
            <div key={i} className={c.previewBox}>
              <img
                src={previews[i] || fallbackImageSvg}
                className={c.previewImage}
                alt={`${inputId}-${i}`}
              />
              <p className={c.previewLabel}>
                {i === 0 ? "(prednja strana)" : "(stražnja strana)"}
              </p>
            </div>
          ))}
        </div>

        <label htmlFor={inputId} className={c.uploadButton}>
          Prenesi fotografije
        </label>
        <input
          type="file"
          id={inputId}
          className={c.hiddenInput}
          accept="image/*"
          multiple
          onChange={(e) => handleUpload(e, isIdCard)}
          disabled={isUploading}
        />
      </div>
    </div>
  );

  return (
    <div className={c.documentSection}>
      {renderDocumentSection(
        "Vozačka dozvola",
        "driverLicense",
        licensePreviews,
        false
      )}
      {renderDocumentSection(
        "Osobna iskaznica",
        "idCard",
        idCardPreviews,
        true
      )}
    </div>
  );
};
