import styles from "./page.module.css"
import { IMAGES } from "../../shared"


export function NotFoundPage(){
    return (
        <div className = {styles.container}>
            <p className = {styles.header}>Page not found :((((</p>
            <img className = {styles.img} src = {IMAGES.notFoundImage} alt="???" />
        </div>
    )
}