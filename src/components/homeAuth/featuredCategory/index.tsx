import useSWR from "swr"
import styles from "../../../../styles/slideCategory.module.scss"
import courseService from "@/services/courseService"
import SlideComponent from "@/components/common/slideComponent"
import PageSpinner from "@/components/common/spinner"

const FeaturedCategory = () => {
      //vai fazer o fat do curso
      const {data, error} = useSWR("/featured", courseService.getFeaturedCourses)

      if(error) return error
      if(!data) { 
        return <PageSpinner></PageSpinner>
    }

    return (
        <>
        <p className={styles.titleCategory}>EM DESTAQUE</p>
        <SlideComponent course={data.data}></SlideComponent>
        </>
    )
}

export default FeaturedCategory