import { ErrorBoundary } from "react-error-boundary";
import { Router } from "./Router";
import { TokenProvider } from "./context/TokenProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        <TokenProvider>
          <Router />
          <ToastContainer />
        </TokenProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
