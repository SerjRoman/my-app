
import styles from "./product-list.module.css";
import { ProductCard } from "./product-card";
import { ProductListProps } from "./product-list.types";


export function ProductList(props: ProductListProps) {
	const {products} = props
	const foundProductsText =
		products.length > 0
			? `Found ${products.length} products`
			: "Products not found. Try another filters";
	return (
		<div className={styles.productListBlock}>
			<p>{foundProductsText}</p>
			<div className={styles.productList}>
				{products.map((product) => {
					return (
						<ProductCard
							product={product}
							key={product.id}
						></ProductCard>
					);
				})}
			</div>
		</div>
	);
}
