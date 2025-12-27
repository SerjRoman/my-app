import { useEffect, useState } from "react"
import { ICONS } from "../../shared"
import styles from "./search-bar.module.css"
import { useGetProducts } from "../../shared/api"
import { Product } from "../../shared/types"
import { Link } from "react-router-dom"



export function SearchBar(){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    //                       1ms             100ms
    //  products:            []              array of products
    // filteredProducts      products         []
    const {products, isLoading, error} = useGetProducts()
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

    useEffect( () => {
        // [1,2,3,4,5,6].filter( number => number > 3)
        // 1 > 3 - false
        // 2 > 3 - false
        // 3 > 3 - false 
        // 4 > 3 - true

        const newProducts = products.filter( (product) => {
            // abcdefgh.startsWith(abcd) -> true
            // abcdefgh.startsWith(bcde) -> false
            // abcdefgh.includes(abcd) - > true
            // abcdefgh.includes(bcde) -> true
            // abcdefgh.includes(zxc) -> false
            // 
            return product.name.toLowerCase().startsWith(search.toLowerCase())
        })
        setFilteredProducts(newProducts)
    }, [products, search])

    const isContent = !isLoading && !error && filteredProducts.length > 0
    const isContentEmpty = !isLoading && !error && filteredProducts.length === 0

    return <div className={styles.searchBarBlock} style={{borderRadius: isOpen ? 0 : 16}}>
        <input 
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            onChange={(event) => setSearch(event.target.value)}
            value={search}
            type="text" 
            placeholder='Find products...' 
            className = {styles.searchInput}
            />
        <ICONS.Search className={styles.searchIcon} />

        {isOpen && <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                {isContent && filteredProducts.map( product => {
                    return <Link
                        to={`/products/${product.id}`}
                        key={product.id}
                        className={styles.searchItem}
                        >
                            <ICONS.Search className={styles.searchItemIcon}/>
                            <img src={product.image} alt="product" className={styles.searchItemImage} />
                            <span className={styles.searchItemName}>{product.name}</span>
                    </Link>
                })}
                {isContentEmpty && <div>No products found!</div>}
                {isLoading && <div>Loading...</div>}
                {error && <div>Error occured. Try again later</div>}
            </div>
        </div>}
    </div>

}
