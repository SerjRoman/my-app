import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, ProductsPage, ProductPage, NotFoundPage, CartPage, SignInPage } from "../pages";
import { Layout } from "./layout";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/products" element={<ProductsPage/>} />
                    <Route path="/products/:id" element={<ProductPage/>} />
                    <Route path = "/cart" element = {<CartPage/>}/>
                    <Route path = "/sign-in" element = {<SignInPage/>}/>
                    <Route path = "*" element = {<NotFoundPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
