import Footer from "@/components/common/footer"
import HeaderAuth from "@/components/common/headerAuth"
import PageSpinner from "@/components/common/spinner"
import FavoriteCategory from "@/components/homeAuth/favoriteCategory"
import FeaturedCategory from "@/components/homeAuth/featuredCategory"
import FeaturedSection from "@/components/homeAuth/featuresSection"
import ListCategories from "@/components/homeAuth/listCategories"
import NewestCategory from "@/components/homeAuth/newestCategory"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const HomeAuth = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if(!sessionStorage.getItem("onebitflix-token")) {
         router.push("/login")
      } else {
        setLoading(false)
      }
    }, [])

    if(loading) {
      return <PageSpinner></PageSpinner>
    }

    return (
        <>
          <Head>
            <title>Onebitflix - Home</title>
            <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
          </Head>
          <main>
          <FeaturedSection></FeaturedSection>
          <NewestCategory></NewestCategory>
          <FavoriteCategory></FavoriteCategory>
          <FeaturedCategory></FeaturedCategory>
          <ListCategories></ListCategories>
            <Footer></Footer>
          </main>
        </>
    )
}

export default HomeAuth