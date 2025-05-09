export type TokenDataType = {
  id: string;
  email: string;
  role: string;
  token: string;
  isExpired: boolean | null;
  isSuspended: boolean | null;
};
