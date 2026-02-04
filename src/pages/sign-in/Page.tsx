import styles from "./sign-in.module.css"
import { Button, IMAGES } from "./../../shared"
import { useForm } from "react-hook-form"
import { SignInFormState } from "./sign-in.types"
import { Link } from 'react-router-dom';


export function SignInPage(){
    const {register, formState, handleSubmit} = useForm<SignInFormState>()

    function onSignInSubmit(data: SignInFormState) {
        console.log('Form submitted!!!')
        console.log(data)
    }

    const emailError = formState.errors.email
    const passwordError = formState.errors.password

    return (
        <div className = {styles.page}>
            <form onSubmit={handleSubmit(onSignInSubmit)} className={styles.signInForm}>
                <div className={styles.formFields}>
                    <label className={styles.formInputField}>
                        Email:
                        <input 
                            className={`${styles.formInput} ${emailError ? styles.inputError : "" }`}
                            type="email" 
                            placeholder="sobaka@gmail.com" 
                            {...register("email", {
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
                                validate: (value) => {
                                    if (!value.includes("@") || !value.includes(".")) return "You must enter a valid email"
                                }
                            })} />
                        <p className={styles.errorText}>{emailError?.message}</p>
                    </label>
                
                
                    <label className={styles.formInputField}>
                        Password:
                        <input className={`${styles.formInput} ${passwordError ? styles.inputError : "" }`} type="password" placeholder="*******" {...register('password', {
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
                        <p className={styles.errorText}>{passwordError?.message}</p>
                    </label>
                </div>
                <span className={styles.additionalInfo}>Don’t have an account?{" "}
                    <Link className={styles.additionalInfoLink} to={"/sign-up"}>Register now!</Link>
                </span>
                <Button variant="submit" type="submit">Submit</Button>
            </form>

            <img src={IMAGES.signInImage} alt="cool thing!!!" className = {styles.signInImg}/>
        </div>
    )
}