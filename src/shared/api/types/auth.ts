export type RegisterCredentials = {
    email: string
    password: string
    username: string
    avatar?: string
}
export type LoginCredentials = {
    email: string
    password: string
}
export interface UserAuthenticationResponse{
    token: string
}