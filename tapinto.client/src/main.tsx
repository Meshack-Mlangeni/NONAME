import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./app/router/Routes.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";
import { AppThemeContextProvider } from "./app/theme/AppThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppThemeContextProvider>
      <RouterProvider router={routes} />
    </AppThemeContextProvider>
  </Provider>
  // </React.StrictMode>
);
