export interface CategoryFilterProps {
    setSelectedCategoryId: (value: number | "All") => void;
    selectedCategoryId: number | "All"
}