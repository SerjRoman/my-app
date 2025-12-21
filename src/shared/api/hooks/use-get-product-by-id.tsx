import { useEffect, useState } from "react"
import { Product } from "../../types"
import { API_URL } from "../api-url";

export interface UseGetProductByIdParams {
    id: number
}

export interface UseGetProductByIdResponse {
    product: Product | null
    isLoading: boolean
    error: string | null
    refetch: (params: UseGetProductByIdParams) => Promise<void>
}


export function useGetProductById(params: UseGetProductByIdParams): UseGetProductByIdResponse {
    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string| null>(null)
    const {id} = params

    async function getProductById(params: UseGetProductByIdParams){
        try{
            setIsLoading(true)
            const response = await fetch(`${API_URL}/products/${params.id}`, {
                method: "GET"
            })
            const data: Product = await response.json()
            setProduct(data)
        }
        catch(error){
            if (error instanceof Error){
                setError(error.message)
            }
            else {
                setError("Unknown error")
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!id || isNaN(id)) {
            setProduct(null)
            return
        }
        
        getProductById({id})
    }, [id])

    return {product, isLoading, error, refetch: getProductById}
}