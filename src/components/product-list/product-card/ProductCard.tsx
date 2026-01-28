import { useState } from 'react'
import styles from './product-card.module.css'
import { ProductCardProps } from './product-card.types'
import { useNavigate } from 'react-router-dom'


export function ProductCard(props: ProductCardProps) {
    const {product} = props
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
    const navigate = useNavigate()

    return <div className={styles.block}>
        <img className = {styles.image} src = {product.image} alt=''/>
        <p className = {styles.title}>Title: {product.name}</p>
        <p className = {styles.price}>Price: {product.price}</p>

        <div className={styles.counterBlock}>
            <p className = {styles.counter}>Count: { counter }</p>
            <button className = {styles.counterButton} onClick={incrementProduct}>&#43;</button>
            <button className = {styles.counterButton} onClick={decrementProduct}>&#8722;</button>
        </div>
        <button onClick={() => navigate(`/products/${product.id}`)} className={styles.buttonMore}>More</button>
        
    </div>

}