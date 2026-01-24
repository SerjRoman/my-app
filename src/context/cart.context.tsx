import { Product } from "../shared/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface CartItem extends Product {
    count: number
}
interface CartContextContract {
    items: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
    isInCart: (id: number) => boolean;
    incrementCount: (id: number) => void;
    decrementCount: (id: number) => void;
}

const CartContext = createContext<CartContextContract | null>(null)


export function CartContextProvider({children}: PropsWithChildren) {
    const [items, setItems] = useState<CartItem[]>([])

    function removeFromCart(id: number): void {
        const newItems = items.filter(item => {
            return item.id !== id
        })
        setItems(newItems)
    }

    function addToCart(product: Product): void {
        if (isInCart(product.id)) return
        const newItems = [...items, {...product, count: 1}]
        setItems(newItems)
    }

    function incrementCount(id: number): void {
        if (!isInCart(id)) return
        const newItems = items.map(cartItem => {
            return {...cartItem}
        })
        const foundProduct = newItems.find(cartItem => cartItem.id === id)
        
        if (foundProduct) {
            foundProduct.count++;
            setItems(newItems)
        }
    }
    function decrementCount(id: number): void {
        if (!isInCart(id)) return
        const newItems = items.map(cartItem => {
            return {...cartItem}
        })
        const foundProduct = newItems.find(cartItem => cartItem.id === id)
        
        if (foundProduct) {
            foundProduct.count--;
            setItems(newItems)
        }
    }
    function isInCart(id: number): boolean{
        return items.some(cartItem => cartItem.id === id)

    }

    return <CartContext value={{
        items,
        removeFromCart,
        addToCart,
        isInCart,
        incrementCount,
        decrementCount
    }}>{children}</CartContext>
}



export function useCartContext(): CartContextContract{
    const context = useContext(CartContext)
    if (!context){
        throw new Error("Provider must wrap your App component!!!!!!!!!!!")
    }
    return context
}