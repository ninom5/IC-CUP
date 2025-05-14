import "./mobileNavBarComponent.css";

export const MobileNavBarComponent = ({
  imgSrc,
  imgAlt,
  text,
}: {
  imgSrc: string;
  imgAlt: string;
  text: string;
}) => {
  return (
    <div className="mobile-nav-component">
      <img src={imgSrc} alt={imgAlt} />
      <p>{text}</p>
    </div>
  );
};
