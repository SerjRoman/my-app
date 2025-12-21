import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, ProductsPage } from "../pages";
import { Layout } from "./layout";
import { ProductPage } from "../pages/product";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<HomePage />}/>
          <Route path="/products" element={<ProductsPage/>} />
          <Route path="/products/:id" element={<ProductPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
