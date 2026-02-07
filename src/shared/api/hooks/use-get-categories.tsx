import { useState, useEffect } from "react";
import { Category } from "../../types";
import { API_URL } from "../api-url";

interface UseGetCategories {
    categories: Category[]
    isLoading: boolean,
    error: string | null
}

// массив | объект | функция | void
// Массив категорий, isLoading, error
// 1ms      10ms
export function useGetCategories(): UseGetCategories {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string| null>(null)

    useEffect( () => {
        async function getCategories() {
            try {
                setIsLoading(true)
                const response = await fetch(`${API_URL}/categories`, {
                    method: "GET",
                })
                const data: Category[] = await response.json()
                setCategories(data)
            } catch (error) {
                console.error(error)
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }
        getCategories()
    }, [])


    
    return {categories, isLoading, error}
}