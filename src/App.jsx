import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Orders from "./pages/Orders";
import { Payment } from "./pages/Payment";
import MenuMobile from "./components/MenuMobile";
import { Header } from "./components/header/Header";
import { OrdersProvider } from "./Contexts/OrdersContext";
import { ProductsProvider } from "./Contexts/ProductsContext";
import { CategoriesProvider } from "./Contexts/CategoriesContext";
import { CartProvider } from "./Contexts/CartContext";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ToDelivery } from "./pages/ToDelivery";

const queryClient = new QueryClient();

function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <CartProvider>
      <CategoriesProvider>
        <ProductsProvider>
          <OrdersProvider>
            <BrowserRouter>
              <Header isMenuOpened={isActive} openMenu={setIsActive} />
              <MenuMobile
                isOpened={isActive}
                handleClose={() => setIsActive(false)}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/cozinha" element={<Orders />} />
                <Route path="/retirada" element={<ToDelivery />} />
                <Route path="*" element={<h1>404</h1>} />
              </Routes>
            </BrowserRouter>
          </OrdersProvider>
        </ProductsProvider>
      </CategoriesProvider>
    </CartProvider>
  );
}

export default App;
