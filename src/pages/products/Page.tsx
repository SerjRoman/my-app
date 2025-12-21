import { useEffect, useState } from "react";
import { ProductList, CategoryFilter } from "../../components"
import styles from './page.module.css'
import { ICONS } from "../../shared";
import { useGetProducts } from "../../shared/api";

export function ProductsPage(){
	const {products, isLoading, error} = useGetProducts()
    const [selectedCategoryId, setSelectedCategoryId] = useState<
		"All" | number
	>("All");
    const [searchValue, setSearchValue] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(products); // []

	useEffect(() => {
		const searchedProducts = products.filter((product) => {
			return product.name
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
	}, [searchValue, selectedCategoryId, products]);

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
		{isLoading ? 
            <div>Loading...</div> 
            :  error ? 
                <div>{error}</div> 
            : <ProductList products={filteredProducts}/>}
        
    </div>
}