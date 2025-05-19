import { ReviewCardData } from "types";
import c from "./ReviewCard.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
  review: ReviewCardData;
};

export const ReviewCard = ({ review }: Props) => {
  const navigate = useNavigate();
  const dateObj = new Date(review.createdAt);
  const date = `${String(dateObj.getDate()).padStart(2, "0")}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${dateObj.getFullYear()}`;

  return (
    <div className={c.card}>
      <div className={c.header}>
        <div className={c.user}>
          <img
            src={review.renter.personPhoto}
            alt="Korisnik"
            className={c.avatar}
            onClick={() => navigate(`/profile/${review.renter.id}`)}
          />
        </div>
        <div className={c.userInfo}>
          <div className={c.nameDate}>
            <span>{review.renter.firstName}</span>
            <span>{date}</span>
          </div>
          <div className={c.stars}>
            {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>
      </div>

      <div>
        {review.comment && <p className={c.comment}>{review.comment}</p>}
      </div>
    </div>
  );
};
