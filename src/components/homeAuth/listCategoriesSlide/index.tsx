import categoriesService, { CategoryType } from "@/services/categoriesService"
import useSWR from "swr"
import styles from "../../../../styles/slideCategory.module.scss"
import SlideComponent from "@/components/common/slideComponent";
import PageSpinner from "@/components/common/spinner";

interface props {
    categoryId: number;
    categoryName: string;
}

const ListCategoriesSlide = ({categoryId, categoryName}: props) => {

    const {data, error} = useSWR(`/categoriesCourses/${categoryId}`, () => categoriesService.getCourses(categoryId))

    if(error) return error
    if(!data) { 
        return <PageSpinner></PageSpinner>
    }

    return (
        <>
         <p className={styles.titleCategories}>{categoryName}</p>
        <SlideComponent course={data.data.courses}></SlideComponent>
        </>
    )
}

export default ListCategoriesSlide