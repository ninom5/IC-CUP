export const validateTextFields = (fields: Record<string, string>) => {
  for (const [name, value] of Object.entries(fields)) {
    if (!value || value.trim() === "")
      return `Field: ${name} is required and can not be empty`;
  }

  return null;
};
