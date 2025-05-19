import "./customPriceMarker.css";

export const CustomPriceMarker = ({ price }: { price: number }) => {
  return <div className="custom-marker">{price} €</div>;
};
