export const insuranceCategories = {
  lowLevel: {
    heading: "Niska razina osiguranja",
    description:
      "Prekriva samo osnovne štete, a odgovornost od strane korisnika je u visini do 90% iznosa štete.",
    price: 25,
  },
  midLevel: {
    heading: "Srednja razina osiguranja",
    description:
      "Pokriva dio troškova za vrijeme trajanja najma, a odgovornost od strane korisnika je u visini do 50% iznosa štete.",
    price: 35,
  },
  highLevel: {
    heading: "Visoka razina osiguranja",
    description:
      "Pokriva veliki dio troškova za vrijeme trajanja najma, a odgovornost od strane korisnika je u visini do 20% iznosa štete.",
    price: 45,
  },
} as const;

export type InsuranceKey = keyof typeof insuranceCategories;

export const insuranceLevelMap: Record<InsuranceKey, string> = {
  highLevel: "Visoka razina osiguranja",
  midLevel: "Srednja razina osiguranja",
  lowLevel: "Niska razina osiguranja",
};
