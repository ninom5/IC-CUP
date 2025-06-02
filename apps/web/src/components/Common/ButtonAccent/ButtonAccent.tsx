import "./buttonAccent.css";

export const ButtonAccent = ({
  content,
  onClick,
  disabled = false,
}: {
  content: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className="custom-accent-button"
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
