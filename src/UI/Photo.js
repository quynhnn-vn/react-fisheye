import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

import { getPhotoOrVideoSource } from "utils/utils";
import { cloneDeep } from "lodash";
import styles from "./Photo.module.css";

export default function Photo({
  item,
  matchedMedia,
  setMatchedMedia,
  filterBy,
}) {
  const location = useLocation();
  const [currentLikes, setCurrentLikes] = useState(item.likes);

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
          filterBy,
        }}
      >
        {item?.image ? (
          <img
            src={getPhotoOrVideoSource(item?.image)}
            alt={item.title}
            loading="lazy"
          />
        ) : (
          <video src={getPhotoOrVideoSource(item?.video)} alt={item.title} />
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
