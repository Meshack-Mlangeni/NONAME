import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Settings from "../../features/pages/settings/Settings";
import AboutPage from "../../features/pages/about/AboutPage";
import HomePage from "../../features/pages/homepage/HomePage";
import Tests from "../../features/pages/homepage/subs/tests/tests";
import Results from "../../features/pages/homepage/subs/results/results";
import Login from "../../features/pages/account/login";
import Register from "../../features/pages/account/register";
import School from "../../features/pages/homepage/subs/myschool/mySchool";
import Live from "../../features/pages/live/live";
import Groups from "../../features/pages/homepage/subs/groups/Groups";
import MobileProfilePage from "../../features/pages/account/mobileProfilePage";
import ShowActivitiesOnHomePage from "../../features/pages/homepage/subs/activity/showActivitiesOnHomepage";
import Home2 from "../../features/pages/homepage/subs/admin/home";
import RequireAuth from "./RequireAuth";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/home",
            element: <HomePage />,
            children: [
              { path: "/home/activity", element: <ShowActivitiesOnHomePage /> },
              { path: "/home/groups", element: <Groups /> },
              { path: "/home/tests", element: <Tests /> },
              { path: "/home/results", element: <Results /> },
              { path: "/home/live/:id", element: <Live /> },
            ],
          },
          { path: "/adminhome", element: <Home2 /> },
          { path: "/mobprofile", element: <MobileProfilePage /> },
          { path: "/myschool", element: <School /> },
        ],
      },
      { path: "/settings", element: <Settings /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
