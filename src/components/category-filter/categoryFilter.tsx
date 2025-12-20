import styles from "./category-filter.module.css"
import { CategoryFilterProps } from "./category-filter.types";
import { useGetCategories } from "../../shared/api";


export function CategoryFilter(props: CategoryFilterProps){
    const {selectedCategoryId, setSelectedCategoryId} = props;
    const {isLoading, error, categories} = useGetCategories()
   

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error ) {
        return <div>Error occured. Try again later. <p>Error message: {error}</p></div>
    }

    return (
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
    )
}