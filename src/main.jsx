import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/Routes.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
