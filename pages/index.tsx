import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss" 
import HeaderNoAuth from "@/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/components/homeNoAuth/presentationSection";
import SlideSection from "@/components/homeNoAuth/slideSection";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "@/services/courseService";
import { ReactNode } from "react";
import CardSection from "@/components/homeNoAuth/cardSection";
import Footer from "@/components/common/footer";

interface IndexPageProps {
  children?: ReactNode;
  course: CourseType[];
}

const homeNoAuth = function ({ course }: IndexPageProps) {
  return (
    <>
      <Head>
        <title>Onebitflix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="Onebitflix" key="title"/>
        <meta name="description" content="Tenha acesso aos melhores conteúdos de programação de uma forma simples e fácil"/>
      </Head>
      <main>
		<div className={styles.sectionBackground}>
			<HeaderNoAuth />
			<PresentationSection />
		</div>
		<CardSection />
		<SlideSection newestCourses={course}/>
    <Footer></Footer>
	</main>
    </>

  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();
  return {
    props: {
      course: res.data,
    },
    revalidate: 3600 * 24,
  };
};

export default homeNoAuth;