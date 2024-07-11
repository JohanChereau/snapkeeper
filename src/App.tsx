import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/layout/Root";
import HomePage from "./pages/HomePage";
import CreateWorkspacePage from "./pages/workspace/CreateWorkspacePage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "workspace",
        children: [
          {
            path: "create",
            element: <CreateWorkspacePage />,
          },
          {
            path: "view/:id",
            // element: <ViewWorkspace />,
          },
          {
            path: "edit/:id",
            // element: <EditWorkspaceForm />,
          },
        ],
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
  initialIndex: 0,
});
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
