import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Settings from "../../features/pages/settings/Settings";
import AboutPage from "../../features/pages/about/AboutPage";
import HomePage from "../../features/pages/homepage/HomePage";
import Posts from "../../features/pages/homepage/subs/posts/posts";
import Tests from "../../features/pages/homepage/subs/tests/tests";
import Results from "../../features/pages/homepage/subs/results/results";
import Groups from "../../features/pages/homepage/subs/groups/groups";
import Login from "../../features/pages/account/login";
import Register from "../../features/pages/account/register";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "/home",
        element: <HomePage />,
        children: [
          { index: true, element: <Navigate to="/home/posts" replace /> },
          { path: "/home/posts", element: <Posts /> },
          { path: "/home/groups", element: <Groups /> },
          { path: "/home/tests", element: <Tests /> },
          { path: "/home/results", element: <Results /> },
        ]},
      { path: "/settings", element: <Settings /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
