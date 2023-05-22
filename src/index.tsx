import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Countries from "./container/Countries";
import Continents from "./container/Continents";
import CountryPage from "./pages/CountryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Continents />,
    children: [
      {
        path: "/:code",
        element: <Countries />,
      },
    ],
  },
  {
    path: "/country/:code",
    element: <CountryPage />,
  },
]);

const client = new ApolloClient({
  uri: "https://countries.nausicaa.wilders.dev/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
