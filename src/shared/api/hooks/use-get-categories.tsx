import { useState, useEffect } from "react";
import { Category } from "../../types";

interface UseGetCategories {
    categories: Category[]
    isLoading: boolean,
    error: string | null
}

// массив | объект | функция | void
// Массив категорий, isLoading, error
export function useGetCategories(): UseGetCategories {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string| null>(null)

    useEffect( () => {
        async function getCategories() {
            try {
                setIsLoading(true)
                const response = await fetch("http://localhost:8001/categories", {
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