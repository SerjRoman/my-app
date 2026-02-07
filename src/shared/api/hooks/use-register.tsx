import { useState } from "react"
import { ErrorResponse, RegisterCredentials, UserAuthenticationResponse } from "../types"
import { API_URL } from "../api-url"

type RegisterRequestFunction = (credentials: RegisterCredentials) => Promise<UserAuthenticationResponse | ErrorResponse>

type UseRegisterContract = [RegisterRequestFunction, {isLoading: boolean, error: string | null}]

export function useRegister(): UseRegisterContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string| null>(null)

    const register: RegisterRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            const request =  await fetch(`${API_URL}/users/register`, {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {"Content-Type": "application/json"}
            })
            if (request.status === 409){
                const message = "User with such email already exists!!!"
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
            const data: UserAuthenticationResponse = await request.json()
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

    return [register, {isLoading, error}]

}