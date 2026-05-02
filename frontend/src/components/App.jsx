import RootLayout from "./containers/Roots";
import ErreurPage from "./pages/ErreurPage";
import Accueil from "./pages/Accueil";
import Auth from "./containers/Auth";
import Signup from "./signup/Signup";
import Personnaliser from "./pages/personnaliser/Personnaliser";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErreurPage />,
    children: [
      { path: "", element: <Accueil /> },
      { path: "accueil", element: <Accueil /> },
      { path: "login", element: <Auth /> },
      { path: "signup", element: <Signup /> },
      { path: "personnaliser", element: <Personnaliser /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <LanguageSwitcher />
    </>
  );
};
export default App;
