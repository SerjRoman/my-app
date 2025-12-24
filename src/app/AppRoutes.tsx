import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, ProductsPage, ProductPage, NotFoundPage } from "../pages";
import { Layout } from "./layout";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/products" element={<ProductsPage/>} />
                    <Route path="/products/:id" element={<ProductPage/>} />
                    <Route path = "*" element = {<NotFoundPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
