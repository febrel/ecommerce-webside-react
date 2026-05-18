import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductsDetailsPage from "./pages/ProductsDetailsPage";
import NavBar from "./components/NavBar"
import "./App.css";

//  npm install react-hook-form
//  npm install react-router-dom


function App() {

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/products/:id" element={<ProductsDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
