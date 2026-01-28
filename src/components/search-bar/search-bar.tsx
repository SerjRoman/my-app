import { useEffect, useRef, useState } from "react"
import { ICONS } from "../../shared"
import styles from "./search-bar.module.css"
import { useGetProducts } from "../../shared/api"
import { Product } from "../../shared/types"
import { Link } from "react-router-dom"
import { Modal } from "../../shared/"



export function SearchBar(){
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const {products, isLoading, error} = useGetProducts()
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

    useEffect( () => {

        const newProducts = products.filter( (product) => {
            return product.name.toLowerCase().startsWith(search.toLowerCase())
        })
        setFilteredProducts(newProducts)
    }, [products, search])

    const isContent = !isLoading && !error && filteredProducts.length > 0
    const isContentEmpty = !isLoading && !error && filteredProducts.length === 0
    
    const containerRef = useRef<HTMLDivElement>(null)
    return <div
        className={styles.searchBarBlock} 
        style={{borderRadius: isOpen ? 0 : 16}}
        onClick={(event) => {
            event.stopPropagation()
        }}
        ref={containerRef}
    >
        <input 
            onFocus={() => setIsOpen(true)}
            // onBlur={() => setIsOpen(false)}
            onChange={(event) => setSearch(event.target.value)}
            value={search}
            type="text" 
            placeholder='Find products...' 
            className = {styles.searchInput}
            />
        <ICONS.Search className={styles.searchIcon} />

        {isOpen && <Modal
            className={styles.modalContainer} 
            isOpen={isOpen} 
            isClickOutsideDoClose={true}
            onClose={() => {
                setIsOpen(false)
            }}
            container={containerRef.current ?? document.body}
            >
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
        </Modal>}
    </div>

}
