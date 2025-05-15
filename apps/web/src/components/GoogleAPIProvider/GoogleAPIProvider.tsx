import { APIProvider } from "@vis.gl/react-google-maps";
import { ReactNode } from "react";
import { toast } from "react-toastify";

interface MapsProviderProps {
  children: ReactNode;
}

export const GooglAPIProvider = ({ children }: MapsProviderProps) => {
  return (
    <APIProvider
      apiKey="AIzaSyBucHP2Uvo12xp_l3_m1GsNbtXmBz4nFTM"
      onLoad={() => console.log("Successfully loaded map")}
      onError={(error: Error | any) => {
        console.error(`Error loading map: ${error}`);
        toast.error(`Error loading map: ${error?.message}`);
      }}
      libraries={["places"]}
    >
      {children}
    </APIProvider>
  );
};
