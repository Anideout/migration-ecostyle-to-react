import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ProductsProvider } from "./context/ProductsProvider";
import { LayoutProvider } from "./context/LayoutProvider";

// Tus componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./components/Index";
import Login from "./components/Login";
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <LayoutProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </LayoutProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
