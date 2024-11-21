import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Home from "./components/Home.tsx"
import AdDetails from "./components/AdDetails.tsx";
import AdCreate from "./components/AdCreate.tsx";
import Exercice1 from "./components/Exercices/Exercice1.tsx";


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/ads/view/:id",
        element: <AdDetails />
      },
      {
        path: "/ads/create",
        element: <AdCreate />
      },
      {
        path: "/exercice1",
        element: <Exercice1/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
