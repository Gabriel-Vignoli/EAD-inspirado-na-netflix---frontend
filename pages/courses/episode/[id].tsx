import { useRouter } from "next/router";
import styles from "../../../styles/episodePlayer.module.scss";
import Head from "next/head";
import HeaderGeneric from "@/components/common/headerGeneric";
import { useEffect, useRef, useState, useCallback } from "react";
import courseService, { CourseType } from "@/services/courseService";
import PageSpinner from "@/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";
import watchEpisodeService from "@/services/episodeService";

const EpisodePlayer = () => {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true)
  
  const episodeOrder = parseFloat(router.query.id?.toString() || "0");
  const episodeId = parseFloat(router.query.episodeid?.toString() || "0");
  const courseId = router.query.courseId?.toString() || "";

  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [episodeTime, setEpisodeTime] = useState(0);

  const playerRef = useRef<ReactPlayer>(null);

  const fetchEpisodeTime = useCallback(async () => {
    if (isNaN(episodeId) || episodeId <= 0) return;
    try {
      const res = await watchEpisodeService.getWatchTime(episodeId);
      if (res.data !== null) {
        setGetEpisodeTime(res.data.seconds);
      }
    } catch (error) {
      console.error("Failed to fetch episode time", error);
    }
  }, [episodeId]);

  const saveEpisodeTime = useCallback(async () => {
    if (isNaN(episodeId) || episodeId <= 0) return;
    try {
      await watchEpisodeService.setWatchTime({
        episodeId,
        seconds: Math.round(episodeTime),
      });
    } catch (error) {
      console.error("Failed to save episode time", error);
    }
  }, [episodeId, episodeTime]);

  useEffect(() => {
    fetchEpisodeTime();
  }, [fetchEpisodeTime]);

  const handlePlayerTime = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(getEpisodeTime);
      setIsReady(true);
    }
  };

  useEffect(() => {
    if (isReady) {
      const interval = setInterval(saveEpisodeTime, 3000);
      return () => clearInterval(interval);
    }
  }, [isReady, saveEpisodeTime]);

  const fetchCourse = useCallback(async () => {
    if (!courseId) return;
    try {
      const res = await courseService.getEpisodes(courseId);
      if (res.status === 200) {
        setCourse(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch course", error);
    }
  }, [courseId]);


  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);


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


  if (!course?.episodes) return <PageSpinner />;

  if(episodeOrder + 1 < course?.episodes?.length) {
    if(Math.round(episodeTime) === course.episodes[episodeOrder].secondsLong) {
        () =>
            router.push(
              `/courses/episode/${episodeOrder + 1}?courseId=${course?.id}&episodeid=${currentEpisode.id + 1}`
            )
    }
  }
  


  const currentEpisode = course.episodes[episodeOrder];
  if (!currentEpisode) return <PageSpinner />;
  

  return (
    <>
      <Head>
        <title>Onebitflix - {currentEpisode.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/home"
          btnContent="Voltar para o curso"
          btnUrl={`/courses/${courseId}`}
        />
        <Container className="d-flex flex-column align-items-center pt-5">
          <p className={styles.episodeTitle}>{currentEpisode.name}</p>
          {typeof window !== "undefined" && (
            <ReactPlayer
              className={styles.player}
              url={`${process.env.NEXT_PUBLIC_BASEURL}/episodes/stream?videoUrl=${currentEpisode.videoUrl}&token=${sessionStorage.getItem(
                "onebitflix-token"
              )}`}
              controls
              ref={playerRef}
              onStart={handlePlayerTime}
              onProgress={(progress) => setEpisodeTime(progress.playedSeconds)}
            />
          )}
          <div className={styles.episodeButtonDiv}>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder === 0}
              onClick={() =>
                router.push(
                  `/courses/episode/${episodeOrder - 1}?courseId=${course?.id}&episodeid=${currentEpisode.id - 1}`
                )
              }
            >
              <img src="/episode/iconArrowLeft.svg" alt="Previous" className={styles.arrowImg} />
            </Button>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder + 1 === course.episodes.length}
              onClick={() =>
                router.push(
                  `/courses/episode/${episodeOrder + 1}?courseId=${course?.id}&episodeid=${currentEpisode.id + 1}`
                )
              }
            >
              <img src="/episode/iconArrowRight.svg" alt="Next" className={styles.arrowImg} />
            </Button>
          </div>
          <p className="text-center py-4">{currentEpisode.synopsis}</p>
        </Container>
      </main>
    </>
  );
};

export default EpisodePlayer;
