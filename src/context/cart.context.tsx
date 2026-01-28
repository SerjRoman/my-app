import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../shared/types";


interface CartContextContract {
    items: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
    isInCart: (id: number) => boolean;
    incrementCount: (id: number) => void;
    decrementCount: (id: number) => void;
    removeAll: () => void;
    totalPrice: () =>number;
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
        
        if (foundProduct && foundProduct.count < 100) {
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
        
        if (!foundProduct) return 

        if (foundProduct.count === 1) {
            removeFromCart(id)
            return
        }
        foundProduct.count--;
        setItems(newItems)
    }
    
    function isInCart(id: number): boolean{
        return items.some(cartItem => cartItem.id === id)

    }
    
    function removeAll(): void{
        setItems([])
    }
    function totalPrice(): number{
        let price = 0
        for (const item of items){
            price += item.price * item.count
        }
        return price
    }
    // const totalPrice = items.reduce((price, item) => {
    //     return price + item.price
    // }, 0)

    return <CartContext value={{
        items,
        removeFromCart,
        addToCart,
        isInCart,
        incrementCount,
        decrementCount,
        removeAll,
        totalPrice
    }}>{children}</CartContext>
}



export function useCartContext(): CartContextContract{
    const context = useContext(CartContext)
    if (!context){
        throw new Error("Provider must wrap your App component!!!!!!!!!!!")
    }
    return context
}