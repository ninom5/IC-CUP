import { useNavigate } from "react-router-dom";
import "./mobileNavBarComponent.css";

export const MobileNavBarComponent = ({
  Icon,
  imgAlt,
  text,
  path,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  imgAlt: string;
  text: string;
  path: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="mobile-nav-component" onClick={() => navigate(path)}>
      <Icon aria-label={imgAlt} />
      <p>{text}</p>
    </div>
  );
};
