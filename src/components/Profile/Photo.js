import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

import { getPhotoOrVideoSource } from "utils/utils";
import { cloneDeep } from "lodash";
import styles from "./Photo.module.css";

/**
 * Component of photo/video item in media collection, including:
 * - Link to the photo modal
 * - Title and number of likes of the photo
 * - Heart button to increase likes
 */
export default function Photo(props) {
  const { item, matchedMedia, setMatchedMedia, sortBy } = props;

  const location = useLocation();

  const [currentLikes, setCurrentLikes] = useState(item.likes);

  // Handle click on like button
  const onClickLikes = () => {
    let cloneMatchedMedia = cloneDeep(matchedMedia);
    const itemIndex = cloneMatchedMedia.findIndex(
      (media) => media.id === item.id
    );
    cloneMatchedMedia.splice(itemIndex, 1, {
      ...item,
      likes: currentLikes + 1,
    });
    setMatchedMedia(cloneMatchedMedia);
    setCurrentLikes((prev) => prev + 1);
  };

  return (
    <figure className={styles.PhotoContainer} key={item.id}>
      <Link
        to={`photo/${item.id}`}
        state={{
          backgroundLocation: location,
          sortBy,
        }}
        arial-label={item.title}
      >
        {item?.image ? (
          <img
            src={getPhotoOrVideoSource(item?.image)}
            alt={item.title}
            loading="lazy"
          />
        ) : (
          <video src={getPhotoOrVideoSource(item?.video)} alt={item.title}>
            <track
              default
              kind="captions"
              srcLang="fr"
              src={getPhotoOrVideoSource(item?.video)}
            />
            Votre navigateur n'accepte pas le tag vidéo.
          </video>
        )}
      </Link>
      <figcaption>
        <span className={styles.Title}>{item.title}</span>
        <button
          className={styles.LikeContainer}
          aria-label="likes"
          onClick={onClickLikes}
        >
          <span className={styles.Like}>{currentLikes}</span>
          <AiFillHeart className={styles.HeartBtn} />
        </button>
      </figcaption>
    </figure>
  );
}
