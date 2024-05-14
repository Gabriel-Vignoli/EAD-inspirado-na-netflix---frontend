import HeaderAuth from "@/components/common/headerAuth"
import FeaturedSection from "@/components/homeAuth/featuresSection"
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
          </main>
        </>
    )
}

export default HomeAuth