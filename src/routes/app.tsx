import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";

import { Users } from "../modules/user/pages/Users";
import { NewUser } from "../modules/user/pages/NewUser";
import ProtectedRoute from "../storage/ProtectedRoute";
import { Volunteers } from "../modules/volunteer/pages/Volunteers";
import { NewVolunteer } from "../modules/volunteer/pages/NewVolunteer";

import { NewHealthCenter } from "../modules/health-center/NewHealthCenter";
import { HealthCenters } from "../modules/health-center/HealthCenters";

const appRouter = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/new-user",
        element: <NewUser />,
      },
      {
        path: "/volunteers",
        element: <Volunteers />,
      },
      {
        path: "/new-volunteer",
        element: <NewVolunteer />,
      },
      {
        path: "/health-centers",
        element: <HealthCenters />,
      },
      {
        path: "/new-health-center",
        element: <NewHealthCenter />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
