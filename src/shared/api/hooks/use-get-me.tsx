import { useState } from "react";
import { API_URL } from "../api-url";
import { User } from "../../types";
import { ErrorResponse } from "../types";

type GetMeRequestFunction = (token: string) => Promise<User | ErrorResponse>

type UseGetMeContract = [GetMeRequestFunction, {isLoading: boolean, error: string | null}]


export function useGetMe(): UseGetMeContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string| null>(null)

    const getMe: GetMeRequestFunction = async (token) => {
         try {
            setIsLoading(true)
            const request =  await fetch(`${API_URL}/users/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (request.status === 401){
                const message = "Invalid Token"
                setError(message)
                return {
                    message
                }
            } else if (request.status === 500) {
                const message = "Internal Server Error. Try again later!"
                setError(message)
                return {
                    message
                }
            }
            const data: User = await request.json()
            return data;
        } catch (error) {
            console.log(error)
            const message = "Network Error. Try again later!"
            setError(message)
            return {message}
        } finally {
            setIsLoading(false)
        }
    }

    return [getMe, {isLoading, error}]
}
