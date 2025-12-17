import { useEffect, useState } from "react";
import { ProductList, CategoryFilter } from "../../components"
import styles from './page.module.css'
import { ICONS } from "../../shared";

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
		image: "https://static.tildacdn.com/tild6537-3866-4665-b661-383834616166/IMG_4822.jpg",
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
		price: 5.2,
		image: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
		categoryId: 3,
	},
	{
		id: 6,
		title: "Product 6",
		price: 15000,
		image: "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg",
		categoryId: 2,
	},
];

export function ProductsPage(){
    const [selectedCategoryId, setSelectedCategoryId] = useState<
		"All" | number
	>("All");
    const [searchValue, setSearchValue] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(products);
	

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
    return <div className={styles.container}>
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
                <ICONS.Search className={styles.searchIcon} />
            </div>
            <CategoryFilter setSelectedCategoryId={setSelectedCategoryId} selectedCategoryId={selectedCategoryId}/>
        </div>
        <ProductList products={filteredProducts}/>
    </div>
}