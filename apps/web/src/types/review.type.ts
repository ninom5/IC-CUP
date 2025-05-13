export type ReviewCardData = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  renter: {
    id: string;
    firstName: string;
    lastName: string;
    personPhoto: string;
  };
};
