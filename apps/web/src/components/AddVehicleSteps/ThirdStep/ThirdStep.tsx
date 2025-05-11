import { StepProps } from "../../../types";

export const ThirdStep = ({ data, onDataChange }: StepProps) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      onDataChange({
        images: [...data.images, ...newImages],
      });
    }
  };

  return (
    <div>
      <h3>Prenesi slike</h3>
      <div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
        />
        <div>
          {data.images.map((file, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
