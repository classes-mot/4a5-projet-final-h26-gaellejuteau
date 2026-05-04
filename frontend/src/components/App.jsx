import RootLayout from "./containers/Roots";
import ErreurPage from "./pages/ErreurPage";
import Accueil from "./pages/Accueil";
import Auth from "./containers/Auth";
import Signup from "./signup/Signup";
import Personnaliser from "./pages/personnaliser/Personnaliser";
import Panier from "./pages/panier/Panier";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (name, price) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.name === name);
      if (existing) {
        return prevCart.map((item) =>
          item.name === name ? { ...item, amount: item.amount + 1 } : item,
        );
      }
      return [...prevCart, { name, price, amount: 1 }];
    });
  };
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
        {
          path: "personnaliser",
          element: <Personnaliser addToCart={addToCart} />,
        },
        {
          path: "panier",
          element: <Panier cart={cart} updateCart={setCart} />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <LanguageSwitcher />
    </>
  );
};
export default App;
