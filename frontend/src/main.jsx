import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";
import SignUp from "./SignUp";
import Account from "./Account";
import { Provider } from "react-redux";
import Store from "./Redux/Store";

const container = document.getElementById("root");
const root = createRoot(container);

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Project from "./Components/Project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/project/:id",
    element: <Project />,
  },

]);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={Sepolia}
    >
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    </ThirdwebProvider>
  </React.StrictMode>
);
