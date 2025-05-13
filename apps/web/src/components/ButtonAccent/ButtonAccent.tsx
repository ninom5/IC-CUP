import "./buttonAccent.css";

export const ButtonAccent = ({
  content,
  onClick,
}: {
  content: string;
  onClick: () => void;
}) => {
  return (
    <button className="custom-accent-button" onClick={onClick}>
      {content}
    </button>
  );
};
