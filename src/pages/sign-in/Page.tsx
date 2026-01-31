import styles from "./sign-in.module.css"
import { IMAGES } from "./../../shared"
import { useForm } from "react-hook-form"
import { SignInFormState } from "./sign-in.types"


export function SignInPage(){
    const {register, formState, handleSubmit} = useForm<SignInFormState>()

    function onSignInSubmit(data: SignInFormState) {
        console.log('Form submitted!!!')
        console.log(data)
    }
    return (
        <div className = {styles.page}>
            <form onSubmit={handleSubmit(onSignInSubmit)}>

                <input type="email" placeholder="sobaka@gmail.com" {...register("email", {
                    required: {
                        value: true,
                        message: "Email is required"
                    },
                    maxLength: {
                        value: 30,
                        message: "Email's length must be less than 30!"
                    },
                    minLength: {
                        value: 8,
                        message: "Email's length must be greater than 8!"
                    },
                })} />
                <p>{formState.errors.email?.message}</p>
                <input type="password" placeholder="*******" {...register('password', {
                    required: {
                        value: true,
                        message: "Password is required"
                    },
                    maxLength: {
                        value: 30,
                        message: "Password's length must be less than 30!"
                    },
                    minLength: {
                        value: 8,
                        message: "Password's length must be greater than 8!"
                    },
                })} />
                <p>{formState.errors.password?.message}</p>

                <button type="submit">Submit</button>
            </form>

            <img src={IMAGES.signInImage} alt="cool thing!!!" className = {styles.signInImg}/>
        </div>
    )
}