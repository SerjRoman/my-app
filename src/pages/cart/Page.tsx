import styles from "./page.module.css";
import { useCartContext } from "../../context"
import { Button } from "../../shared/ui";
import { CartList } from "../../components";

export function CartPage() {
    const {removeAll, totalPrice} = useCartContext()
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cart</h1>
            <CartList/>
            <div className={styles.actions}>
                <p className={styles.total}>Total price: {totalPrice()}</p>
                <Button variant="primary">Buy All</Button>
                <Button variant="primary" onPointerDown = {removeAll}>Delete All</Button>
            </div>
           
        </div>
    )
}