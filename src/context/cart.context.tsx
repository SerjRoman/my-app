import { createContext, PropsWithChildren, ReactNode, useState } from "react";
import { Product } from "../shared/types";

interface CartItem extends Product {
    count: number
}
interface CartContextContract {
    items: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
    isInCart: (id: number) => void
}

export const CartContext = createContext<CartContextContract | null>(null)


export function CartContextProvider({children}: PropsWithChildren) {
    const [items, setItems] = useState<CartItem[]>([])

    function removeFromCart(id: number): void {
        const newItems = items.filter(item => {
            return item.id !== id
        })
        setItems(newItems)
    }
    function addToCart(product: Product): void {
    }
    function isInCart(id: number): boolean{
        return false
    }

    return <CartContext value={{
        items,
        removeFromCart,
        addToCart,
        isInCart
    }}>{children}</CartContext>
}
