import { EpisodeType } from "@/services/courseService"
import styles from "./styles.module.scss"

interface props {
    episode: EpisodeType
}

const EpisodeList = ({episode}: props) => {

const handleSecondsToMinute = (totalSeconds: number) => {
   const minutes = Math.floor(totalSeconds / 60)

   const seconds = totalSeconds % 60

   function toString (num: number) {
    return num.toString().padStart(2, "0")
   }

   const result = `${toString(minutes)}:${toString(seconds)}`
   return result
}

    return (
        <>
        <div className={styles.episodeCard}>
          <div className={styles.episodeOrderTime}>
            <p className={styles.episodeOrder}>Episódio Nº {episode.order}
            </p>
            <p className={styles.episodTime}>{handleSecondsToMinute(episode.secondsLong)}
            </p>
          </div>
          <div className={styles.episodeTitleDescription}>
            <p className={styles.episodeTitle}>{episode.name}
            </p>
            <p className={styles.episodDescription}>
                {episode.synopsis}
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis deleniti atque consectetur obcaecati dignissimos, harum sunt quas recusandae nemo ipsum assumenda unde. Nemo, eum sed? Non commodi animi quae ipsa minus autem laboriosam. Nesciunt hic quis reprehenderit at fugit laboriosam quidem explicabo, nobis nemo culpa esse officiis porro laudantium.
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus, provident!
            </p>
          </div>
        </div>
        </>
    )
}

export default EpisodeList