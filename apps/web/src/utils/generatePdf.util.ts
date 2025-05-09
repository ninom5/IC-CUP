import { jsPDF } from "jspdf";

export const generatePDF = async (frontImage: File, backImage: File) => {
  if (!frontImage || !backImage) return;

  const doc = new jsPDF();

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const frontData = await toBase64(frontImage);
  const backData = await toBase64(backImage);

  doc.addImage(frontData, "JPEG", 10, 10, 180, 80);
  doc.addImage(backData, "JPEG", 10, 100, 180, 80);

  const pdfBlob = doc.output("blob");

  return pdfBlob;
};
