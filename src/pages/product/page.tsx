import { useNavigate, useParams } from "react-router-dom"
import {useGetProductById } from "../../shared/api"
import styles from "./page.module.css"
import { useContext, useEffect } from "react";
import { CartContext } from "../../context";



export function ProductPage() {
    const params = useParams<{id:string}>();
    const navigate = useNavigate()
    const id = Number(params.id)
    const {isLoading, product, error} = useGetProductById({id: id})

    const cartCtx = useContext(CartContext)
    
    useEffect( () => {
        if (isNaN(id)) {
            navigate('/')
            return
        }
    }, [id])

    if(isLoading){
        return <div>Loading ...</div>
    }

    if(error){
        return <div>Error occured: {error}</div>
    }

    // ?. - позволяет получить значение объекта(или свойства, если свойство является объектом).
    // Работает как и обычная точка(.), но за исключнением того, что не выбрасывает ошибку.
    // Если объект являнется null или undefined.(В случае если null или undefined, вернет undefined.)
    
    return <div className={styles.container}>
        <div className={styles.productImageBlock}>
            <img src = {product?.image} className={styles.productImage}/>
        </div>
        <div className={styles.productInfoBlock}>
            <p className={styles.productTitle}>{product?.name}</p>
            <p className={styles.productDescription}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis et ea voluptatibus voluptate ut facere natus veniam autem corporis dolorum.</p>
            <div className={styles.productActions}>
                <button className={styles.cartButton} onClick={() => {
                    if (!product) return
                    cartCtx?.addToCart(product)
                }}>Add to cart</button>
                <button className={styles.buyButton}>Buy</button>
            </div>
        </div>
    </div>
}