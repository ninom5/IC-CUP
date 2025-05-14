import { useMutation } from "@tanstack/react-query";
import { api } from "./base";
import { EmailSendType } from "types";
import { toast } from "react-toastify";

const sendEmail = async (message: EmailSendType) => {
  return await api.post<never, EmailSendType>("/email/send", message);
};

export const useSendEmail = () => {
  return useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      toast.success("Korisniku uspješno poslan mail s potvrdom rezervacije");
    },
  });
};
