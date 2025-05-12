export const validateTextFields = (fields: Record<string, string>) => {
  for (const [name, value] of Object.entries(fields)) {
    if (!value || value.trim() === "")
      return `Polje: ${name} je obavezno i ne može biti prazno`;
  }

  return null;
};
