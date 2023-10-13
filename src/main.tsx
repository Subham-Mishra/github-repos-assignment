import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import App from "~/App.tsx";
import "~/styles/index.css";
import "~/styles/tailwind.css";
import ErrorPage from "~/pages/errorPage/index.tsx";

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Theme accentColor="orange">
          <App />
          <Toaster position="bottom-center" />
        </Theme>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
