import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();

  const isActive = location.pathname === path;

  return (
    <div className="mobile-nav-component" onClick={() => navigate(path)}>
      <Icon aria-label={imgAlt} fill={isActive ? "#222" : "#C0BEBE"} />
      <p className={isActive ? "active" : ""}>{text}</p>
    </div>
  );
};
