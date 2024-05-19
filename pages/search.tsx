import styles from "../styles/search.module.scss";
import Head  from "next/head";
import HeaderAuth from "@/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "@/services/courseService";
import SearchCard from "@/components/common/searchCard";
import { Container } from "reactstrap";
import Footer from "@/components/common/footer";

const Search = () => {

const router = useRouter()
const searchName: any = router.query.name
const [searchResult, setSearchResult] = useState<CourseType[]>([])

const searchCourses = async () => {
        const res = await courseService.getSearch(searchName)
        setSearchResult(res.data.courses)
}

useEffect(() => {
   searchCourses()
}, [searchName])

    return (
        <>
        <Head>
        <title>Onebitflix - {searchName}</title>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        </Head>
        <main className={styles.main}>
        <div className={styles.headerFooterBg}>
            <HeaderAuth></HeaderAuth>
        </div>
        {searchResult.length >= 1 ? (
          <div className={styles.searchContainer}>
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
            {searchResult?.map((course) => (
              <SearchCard key={course.id} course={course} />
            ))}
          </Container>
          </div>
        ) : (
          <div className={styles.searchContainer}>
            <p className={styles.noSearchResult}>Nenhum resultado encontrado!</p>
          </div>
        )}
        <div className={styles.headerFooterBg}>
            <Footer></Footer>
        </div>
      </main>
        </>
    )
}

export default Search