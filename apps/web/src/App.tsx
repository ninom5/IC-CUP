import { ErrorBoundary } from "react-error-boundary";
import { Router } from "./Router";
import { TokenProvider } from "./context/TokenProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APIProvider } from "@vis.gl/react-google-maps";
import { toast } from "react-toastify";

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
            <Router />
            <ToastContainer />
          </APIProvider>
        </TokenProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
