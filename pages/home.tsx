import Footer from "@/components/common/footer"
import HeaderAuth from "@/components/common/headerAuth"
import FavoriteCategory from "@/components/homeAuth/favoriteCategory"
import FeaturedCategory from "@/components/homeAuth/featuredCategory"
import FeaturedSection from "@/components/homeAuth/featuresSection"
import ListCategories from "@/components/homeAuth/listCategories"
import NewestCategory from "@/components/homeAuth/newestCategory"
import Head from "next/head"

const HomeAuth = () => {
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