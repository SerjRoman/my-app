import { useCartContext } from "../../context";
import { CartItemComponent } from "./cart-item";
import styles from './cart-list.module.css'

export function CartList(){
    const { items } = useCartContext()

    return <div className={styles.list}>
        {items.map( (item) => <CartItemComponent key={item.id} item={item}/>)}
        {items.length === 0 && <p>No product in your cart yet</p>}
    </div>
}