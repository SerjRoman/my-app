import { CartContextProvider, UserContextProvider } from "../context";
import { AppRoutes } from "./AppRoutes";

export function App() {
    return (
        <UserContextProvider>
            <CartContextProvider >
                <AppRoutes />
            </CartContextProvider>
        </UserContextProvider>
    )
}
