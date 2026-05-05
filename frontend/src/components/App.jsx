import RootLayout from "./containers/Roots";
import ErreurPage from "./pages/ErreurPage";
import Accueil from "./pages/Accueil";
import Auth from "./containers/Auth";
import Signup from "./signup/Signup";
import Personnaliser from "./pages/personnaliser/Personnaliser";
import Panier from "./pages/panier/Panier";
import Catalogue from "./pages/catalogue/Catalogue";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";
import PrivateRoute from "./containers/PrivateRoute";

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

  const [commandes, setCommandes] = useState([]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErreurPage />,
      children: [
        {
          path: "",
          element: <Accueil addToCart={addToCart} commandes={commandes} />,
        },
        {
          path: "accueil",
          element: <Accueil addToCart={addToCart} commandes={commandes} />,
        },
        { path: "login", element: <Auth /> },
        { path: "signup", element: <Signup /> },
        {
          path: "personnaliser",
          element: (
            <PrivateRoute>
              <Personnaliser addToCart={addToCart} />
            </PrivateRoute>
          ),
        },
        {
          path: "panier",
          element: (
            <PrivateRoute>
              <Panier
                cart={cart}
                updateCart={setCart}
                setCommandes={setCommandes}
              />
            </PrivateRoute>
          ),
        },
        {
          path: "catalogue",
          element: <Catalogue addToCart={addToCart} />,
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
