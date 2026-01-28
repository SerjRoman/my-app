import styles from "./cart-item.module.css"
import { CartItem } from "../../../shared/types"
import { Button, ICONS } from "../../../shared/ui"
import { useCartContext } from "../../../context"
import { useNavigate } from "react-router-dom"



interface CartItemProps {
    item: CartItem
}

export function CartItemComponent(props: CartItemProps){
    const {item} = props
    const {incrementCount, decrementCount, removeFromCart} = useCartContext()
    const navigate = useNavigate()
    return (
        <div className = {styles.cartItem}>
            <img className = {styles.cartItemImage} src={item.image} alt="The great display part of the product that gives us amazing visual represantation of how this product looks in real life." />
            <div className = {styles.cartItemMiddle}>
                <p><b>Name: </b>{item.name}</p>
                <p><b>Description: </b>{item.description}</p>
                <p><b>Category: </b>No D:</p>
                <p><b>Price: </b>{item.price}</p>
                <p><b>Number of items: </b>{item.count}</p>
                <div className = {styles.itemAmountButtons}>
                    <p className = {`${styles.itemButton} ${styles.add}`} onPointerDown={() => incrementCount(item.id)}><ICONS.Plus/></p>
                    <p className = {`${styles.itemButton} ${styles.substract}`} onPointerDown={() => decrementCount(item.id)}><ICONS.Minus/></p>
                </div>
            </div>
            <div className = {styles.itemControlButtons}>
                <Button variant = "primary">Buy</Button>
                <Button variant = "primary" onClick={() => navigate(`/products/${item.id}`)}>Go To</Button>
                <Button variant = "primary" onClick={() => removeFromCart(item.id)}>Delete</Button>
            </div>
        </div>
    )
}