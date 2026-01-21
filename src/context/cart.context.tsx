import { createContext, PropsWithChildren, ReactNode, useState } from "react";
import { Product } from "../shared/types";

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

export const CartContext = createContext<CartContextContract | null>(null)


export function CartContextProvider({children}: PropsWithChildren) {
    const [items, setItems] = useState<CartItem[]>([])

    function removeFromCart(id: number): void {
        const newItems = items.filter(item => {
            return item.id !== id
        })
        setItems(newItems)
    }

    // Если продукта нету в корзине - добавляем
    // Если продукт есть в корзине - делаем ему count += 1
    /*
        1. Найти продукт по ID
        2. Проверка на наличие продукта
        3. Если продукт есть:
            * 1. Для найденого продукта увеличить count
            * 2. Создать новый массив с продуктом
            * 3. Удалить старый продукт с неизменным count
            * 4. Добавить продукт с измененным count
            * 5. Записать в состояние
        4. Если продукта нет:
            * 1. Создать новый массив копию старых товаров
            * 2. Добавить продукт в массив с count = 1
            * 3. Записать в состояние
    */
    function addToCart(product: Product): void {
        if (isInCart(product.id)) return
        // a - {}
        // b - {}
        // items = [a,b,c,d]
        // Получаем копию товаров в корзине
        const newItems = [...items, {...product, count: 1}]
        setItems(newItems)
    }
    // O(n + n + n) -> O(3n)
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
    // function addToCart(product: Product): void {
    //     // a - {}
    //     // b - {}
    //     // items = [a,b,c,d]
    //     // Получаем копию товаров в корзине
    //     const newItems = items.map(cartItem => {
    //         return {...cartItem}
    //     })
    //     const foundProduct = newItems.find(cartItem => cartItem.id === product.id)
        
    //     if (foundProduct) {
    //         foundProduct.count++;
    //     } else {
    //         newItems.push({...product, count: 1})
    //     }

    //     setItems(newItems)
    // }
    // {},[] -> true
    // null,undefined,0, "" -> false
    // !{} -> !true -> !false
    function isInCart(id: number): boolean{
        return items.some(cartItem => cartItem.id === id)
        // return !!items.find(cartItem => cartItem.id === id)
        // return Boolean(items.find(cartItem => cartItem.id === id))
        // return items.find(cartItem => cartItem.id === id) ? true : false
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
