import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";

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
