import { useState, useEffect } from "react";
import { Product } from "../../types";
import { API_URL } from "../api-url";

interface UseGetProducts {
    products: Product[]
    isLoading: boolean,
    error: string | null
}

export function useGetProducts(): UseGetProducts {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string| null>(null)

    useEffect( () => {
        async function getProducts() {
            try {
                setIsLoading(true)
                const response = await fetch(`${API_URL}/products`, {
                    method: "GET",
                })
                const data: Product[] = await response.json()
                setProducts(data)
            } catch (error) {
                console.error(error)
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }
        getProducts()
    }, [])

    return {products, isLoading, error}
}