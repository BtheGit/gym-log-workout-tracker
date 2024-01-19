import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { DatabaseContextProvider } from "./db/DatabaseContext";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <DatabaseContextProvider>
        <RouterProvider router={router} />
      </DatabaseContextProvider>
    </StrictMode>
  );
}
