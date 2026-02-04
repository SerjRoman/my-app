import styles from "./sign-up.module.css"
import { Button, IMAGES } from "./../../shared"
import { useForm } from "react-hook-form"
import { SignUpFormState } from "./sign-up.types"
import { Link } from 'react-router-dom';
import { API_URL } from "../../shared/api";


export function SignUpPage(){
    const {register, formState, handleSubmit, setError} = useForm<SignUpFormState>()

    async function onSignUpSubmit(data: SignUpFormState) {
        console.log('registaaaa')
        console.log(data)
        try {
            const request =  await fetch(`${API_URL}/users/register`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"}
            })
            if(request.status === 409){
                setError("root", {message: "User with such email already exists!!!"})
                return;
            } else if(request.status === 500) {
                setError("root", {message: "Internal Server Error. Try again later!"})
                return;
            }
            const responseData = await request.json()
            console.log(`${responseData}`)
        } catch (error) {
            console.log(error)
        }
    }

    // errora 👍
    const emailError = formState.errors.email?.message
    const usernameError = formState.errors.username?.message
    const passwordError = formState.errors.password?.message
    const avatarError = formState.errors.avatar?.message

    return (
        <div className = {styles.page}>
            <form onSubmit={handleSubmit(onSignUpSubmit)} className = {styles.signUpForm}>
                <div className={styles.formFields}>
                    <label className = {styles.formInputField}>
                        Email: <input type="email" placeholder="sobaka@gmail.com" className = {`${styles.formInput} ${emailError ? styles.formError:""}`} {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            maxLength: {
                                value: 30,
                                message: "Email length must be less than 30 symbols"
                            },
                            minLength: {
                                value: 8,
                                message: "Email length must be more than 5 symbols"
                            },
                            validate: (value) => {
                                if (!value.includes("@") || !value.includes(".")) return "You must enter a valid email"
                            }
                        })} />
                        <p className = {styles.formErrorText}>{emailError}</p>
                    </label>
                    <label className = {styles.formInputField}>
                        Username: <input type="text" placeholder="super_user123" className = {`${styles.formInput} ${usernameError?styles.formError:""}`} {...register('username', {
                            required: {
                                value: true,
                                message: "Username is required"
                            },
                            minLength: {
                                value: 5,
                                message: "Username length must be more than 5 symbols"
                            },
                        })} />
                        <p className = {styles.formErrorText}>{usernameError}</p>
                    </label>
                    <label className = {styles.formInputField}>
                        Password: <input type="password" placeholder="*******" className = {`${styles.formInput} ${passwordError?styles.formError:""}`} {...register('password', {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            maxLength: {
                                value: 30,
                                message: "Password length must be less than 30 symbols"
                            },
                            minLength: {
                                value: 8,
                                message: "Password length must be more than 5 symbols"
                            },
                        })} />
                        <p className = {styles.formErrorText}>{passwordError}</p>
                    </label>
                    <label className = {styles.formInputField}>
                        Avatar: <input type="text" placeholder="https://avatar.com/user.png" className = {`${styles.formInput} ${avatarError?styles.formError:""}`} {...register('avatar', {
                            validate: (avatar) => {
                                if (!avatar) return
                                if (!avatar.includes("https://")) return "Avatar must be a valid url!!"
                            }
                        })} />
                        <p className = {styles.formErrorText}>{avatarError}</p>
                    </label>
                </div>
                <p className={styles.additionalInfo}>Already have an account? <Link to={'/sign-in'} className={styles.additionalInfoLink}>Sign in now! </Link></p>
                <Button variant="submit" type="submit">Submit</Button>
                <p className = {styles.formErrorText}>{formState.errors.root?.message}</p>
            </form>

            <img src={IMAGES.signUpImage} alt="amazing thing!!!!!" className = {styles.signUpImg}/>
        </div>
    )
}