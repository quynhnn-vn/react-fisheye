import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";

import IdPhoto from "UI/IdPhoto";

import { getPhotoOrVideoSource, sortMedia } from "utils/utils";
import { AiFillHeart } from "react-icons/ai";

import styles from "./Profile.module.css";
import Loader from "UI/Loader";

export default function Profile({ photographers, media }) {
  const { userId } = useParams();
  const location = useLocation();

  // Can be likes, date or title
  const [filterBy, setFilterBy] = useState("likes");

  const matchedUser = photographers.find((user) => user.id === Number(userId));
  const matchedMedia = media.filter(
    (item) => item.photographerId === Number(userId)
  );

  const onChangeFilter = (e) => {
    setFilterBy(e.target.value);
  };

  const header = (
    <section className={styles.Header}>
      <div>
        <h1 className={styles.Name}>{matchedUser?.name}</h1>
        <p
          className={styles.City}
        >{`${matchedUser?.city}, ${matchedUser?.country}`}</p>
        <p className={styles.Tagline}>{matchedUser?.tagline}</p>
      </div>
      <Link
        to={`/profile/${userId}/contact`}
        state={{
          backgroundLocation: location,
        }}
      >
        <input
          type="button"
          alt="Submit"
          className={styles.ContactBtn}
          value="Contactez-moi"
        />
      </Link>
      <figure>
        <IdPhoto user={matchedUser} />
      </figure>
    </section>
  );

  const filter = (
    <section className={styles.Filter}>
      <span className={styles.FilterText}>Trier par</span>
      <select
        className={styles.DropDown}
        value={filterBy}
        onChange={onChangeFilter}
      >
        <option value="likes">Popularité</option>
        <option value="date">Date</option>
        <option value="title">Titre</option>
      </select>
    </section>
  );

  const collection = matchedMedia.length && (
    <section className={styles.Collection}>
      {sortMedia(matchedMedia, filterBy).map((item) => (
        <Link
          key={item.id}
          to={`photo/${item.id}`}
          state={{
            backgroundLocation: location,
            filterBy,
          }}
        >
          <figure className={styles.PhotoContainer}>
            {item?.image ? (
              <img
                src={getPhotoOrVideoSource(item?.image)}
                alt={item.title}
                loading="lazy"
              />
            ) : (
              <video
                src={getPhotoOrVideoSource(item?.video)}
                alt={item.title}
              />
            )}
            <figcaption>
              <span className={styles.Title}>{item.title}</span>
              <div className={styles.LikeContainer}>
                <span className={styles.Like}>{item.likes}</span>
                <AiFillHeart className={styles.HeartBtn} />
              </div>
            </figcaption>
          </figure>
        </Link>
      ))}
    </section>
  );

  const footer = matchedMedia.length && (
    <section className={styles.FooterContainer}>
      <div className={styles.TotalLike}>
        {matchedMedia.map((item) => item.likes).reduce((a, b) => a + b, 0)}
        <AiFillHeart className={styles.HeartBtn} />
      </div>
      <div className={styles.Price}>{`${matchedUser?.price}Є/jour`}</div>
    </section>
  );

  return matchedUser ? (
    <div className={styles.ProfileContainer}>
      {header}
      {filter}
      {collection}
      {footer}
    </div>
  ) : (
    <Loader />
  );
}
