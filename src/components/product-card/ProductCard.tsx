import { useEffect, useState } from 'react'
import styles from './product-card.module.css'

interface ProductProps {
    title: string,
    price: number,
    image: string
}

export function ProductCard(props: ProductProps) {
    const {title, price, image} = props
    const [counter, setCounter] = useState(0)

    function incrementProduct(){
        if (counter < 100){
            setCounter(counter + 1)
        }
    }
    function decrementProduct(){
        if (counter > 0){
            setCounter(counter - 1)
        }
    }

    return <div className={styles.block}>
        <img className = {styles.image} src = {image} alt=''/>
        <p className = {styles.title}>Title: {title}</p>
        <p className = {styles.price}>Price: {price}</p>

        <div className={styles.counterBlock}>
            <p className = {styles.counter}>Count: { counter }</p>
            <button className = {styles.counterButton} onClick={incrementProduct}>&#43;</button>
            <button className = {styles.counterButton} onClick={decrementProduct}>&#8722;</button>
        </div>
        <button className={styles.buttonMore}>More</button>
        
    </div>

}