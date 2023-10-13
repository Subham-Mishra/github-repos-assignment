import type { RouteObject } from "react-router-dom";
import Dashboard from "~/pages/dashboard";
import HomePage from "~/pages/dashboard/home";

export const privateRoutes: Array<RouteObject> = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
];
