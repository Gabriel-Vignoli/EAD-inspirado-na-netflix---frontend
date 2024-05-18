import useSWR from "swr"
import styles from "../../../../styles/slideCategory.module.scss"
import courseService from "@/services/courseService"
import SlideComponent from "@/components/common/slideComponent"
import PageSpinner from "@/components/common/spinner"

const FavoriteCategory = () => {
    //vai fazer o fat do curso
    const {data, error} = useSWR("/favorites", courseService.getFavCourses)

    if(error) return error
    if(!data) { 
        return <PageSpinner></PageSpinner>
    }

    return (
        <>
        <p className={styles.titleCategory}>MINHA LISTA</p>
        {data.data.courses.length >= 1 ? (
            <SlideComponent course={data.data.courses}></SlideComponent>
        ) : (
            <p className="text-center pt-4 h5">
                <strong>Você não tem nenhum curso na lista</strong>
            </p>
        )}
        </>
    )
}

export default FavoriteCategory