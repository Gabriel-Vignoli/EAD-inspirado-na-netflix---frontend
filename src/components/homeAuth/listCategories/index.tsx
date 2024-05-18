import categoriesService, { CategoryType } from "@/services/categoriesService"
import useSWR from "swr"
import ListCategoriesSlide from "../listCategoriesSlide"
import PageSpinner from "@/components/common/spinner"

const ListCategories = () => {

    const {data, error} = useSWR("/listCategories", categoriesService.getCategories)

    if(error) return error
    if(!data) { 
        return <PageSpinner></PageSpinner>
    }

    return (
        <>
        {data.data.categories?.map((category: CategoryType) => (
            <div key={category.id}>
              <ListCategoriesSlide key={category.id} categoryId={category.id} categoryName={category.name}></ListCategoriesSlide>
            </div>
        ))}
        </>
    )
}

export default ListCategories