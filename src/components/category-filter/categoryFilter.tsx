import { useEffect, useState } from "react";
import styles from "./category-filter.module.css"
import { CategoryFilterProps } from "./category-filter.types";
import { Category } from "../../shared/types";


export function CategoryFilter(props: CategoryFilterProps){
    const {selectedCategoryId, setSelectedCategoryId} = props;
    const [categories, setCategories] = useState<Category[]>([])

    useEffect( () => {
        
    }, [])

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