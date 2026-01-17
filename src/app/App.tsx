import { CartContextProvider } from "../context";
import { AppRoutes } from "./AppRoutes";

export function App() {
    return (
        <CartContextProvider >
            <AppRoutes />
        </CartContextProvider>
    )
}
