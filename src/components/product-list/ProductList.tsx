import { ProductCard } from "../product-card/ProductCard";
import styles from "./product-list.module.css";
import { ReactComponent as SearchIcon } from "./../../assets/svg/search.svg";
import { useEffect, useState } from "react";

const products = [
	{
		id: 1,
		title: "DREN 1",
		price: 950,
		image: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
		categoryId: 1,
	},
	{
		id: 2,
		title: "Dranik",
		price: 850,
		image: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
		categoryId: 1,
	}, // 1
	{
		id: 3,
		title: "Kitten",
		price: 6750,
		image: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
		categoryId: 2,
	}, // 2
	{
		id: 4,
		title: "Product 4",
		price: 5503,
		image: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
        categoryId: 1
    },
	{
		id: 5,
		title: "Product 5",
		price: 520,
		image: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
		categoryId: 3,
	},
	{
		id: 6,
		title: "Product 6",
		price: 150,
		image: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
		categoryId: 2,
	},
];

const categories = [
	{ id: 1, name: "Cats" },
	{ id: 2, name: "Dogs" },
	{ id: 3, name: "Zebras" },
];

export function ProductList() {
	const [searchValue, setSearchValue] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [selectedCategoryId, setSelectedCategoryId] = useState<
		"All" | number
	>("All");

	useEffect(() => {
		const searchedProducts = products.filter((product) => {
			return product.title
				.toLowerCase()
				.startsWith(searchValue.toLowerCase());
		});
		if (selectedCategoryId === "All") {
			setFilteredProducts(searchedProducts);
			return;
		}
		const newFilteredProducts = searchedProducts.filter(
			(product) => product.categoryId === selectedCategoryId
		);
		setFilteredProducts(newFilteredProducts);
	}, [searchValue, selectedCategoryId]);

	const foundProductsText =
		filteredProducts.length > 0
			? `Found ${filteredProducts.length} products`
			: "Products not found. Try another filters";
	return (
		<div className={styles.container}>
			<div className={styles.filterBlock}>
				<div className={styles.searchBarBlock}>
					<input
						type="text"
						placeholder="Find products..."
						value={searchValue}
						className={styles.searchInput}
						onChange={(event) => {
							setSearchValue(event.target.value);
						}}
					/>
					<SearchIcon className={styles.searchIcon}></SearchIcon>
				</div>
				<div className={styles.selectCategoryBlock}>
					<p>Select category: </p>
					<label className={styles.labelSelectCategory}>
						<input
							type="radio"
							name="category"
							checked={"All" === selectedCategoryId}
							onChange={() => {
								setSelectedCategoryId("All");
							}}
						/>
						All
					</label>
					{categories.map((category) => {
						return (
							<label
								className={styles.labelSelectCategory}
								key={category.id}
							>
								<input
									type="radio"
									name="category"
									checked={category.id === selectedCategoryId}
									onChange={() => {
										setSelectedCategoryId(category.id);
									}}
								/>
								{category.name}
							</label>
						);
					})}
				</div>
			</div>
			<div className={styles.productListBlock}>
				<p>{foundProductsText}</p>
				<div className={styles.productList}>
					{filteredProducts.map((product) => {
						return (
							<ProductCard
								title={product.title}
								price={product.price}
								image={product.image}
								key={product.id}
							></ProductCard>
						);
					})}
				</div>
			</div>
		</div>
	);
}
