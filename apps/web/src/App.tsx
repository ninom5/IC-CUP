import { ErrorBoundary } from "react-error-boundary";
import { Router } from "./Router";
import { TokenProvider } from "./context/TokenProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <TokenProvider>
        <Router />
        <ToastContainer />
      </TokenProvider>
    </ErrorBoundary>
  );
}

export default App;
