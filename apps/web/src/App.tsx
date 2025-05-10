import { ErrorBoundary } from "react-error-boundary";
import { Router } from "./Router";
import { ToastContainer, toast } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APIProvider } from "@vis.gl/react-google-maps";
import { TokenProvider, MapProvider } from "context/index";

function App() {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        <TokenProvider>
          <APIProvider
            apiKey={import.meta.env.VITE_APP_MAPS_API}
            onLoad={() => console.log("Successfully loaded map")}
            onError={(error: Error | any) => {
              console.error(`Error loading map: ${error}`);
              toast.error(`Error loading map: ${error?.message}`);
            }}
            libraries={["places"]}
          >
            <MapProvider>
              <Router />
              <ToastContainer />
            </MapProvider>
          </APIProvider>
        </TokenProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
