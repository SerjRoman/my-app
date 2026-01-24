import styles from './button.module.css'
import { ButtonProps } from './button.types'


export function Button(props: ButtonProps){
    const {variant, className, ...restProps} = props

    return <button 
        className = {`${styles.button} ${styles[variant]} ${className}`}
        {...restProps}
    ></button>
}