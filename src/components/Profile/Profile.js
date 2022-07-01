import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Photo from "components/Profile/Photo";

import IdPhoto from "UI/IdPhoto/IdPhoto";
import Loader from "UI/Loader/Loader";
import Button from "UI/Button/Button";
import Select from "UI/Select/Select";

import { AiFillHeart } from "react-icons/ai";
import { sortMedia, sortOptions } from "utils/utils";
import { cloneDeep } from "lodash";

import styles from "./Profile.module.css";

/**
 * Component for Profile page, including:
 * - A header containing name, city, slogan, profile photo of the current user and a contact button
 * - A filter containing title and a select input
 * - A media collection of the current user
 * - A footer for number of likes and price
 */
export default function Profile({ photographers, media }) {
  const { userId } = useParams();
  const navigate = useNavigate();

  // User information of current userId
  const matchedUser = photographers.find(
    (user) => Number(user.id) === Number(userId)
  );
  // Media list of current userId
  const [matchedMedia, setMatchedMedia] = useState([]);

  // Can be likes, date or title
  const [sortBy, setSortBy] = useState("likes");
  const [options, setOptions] = useState(sortOptions);

  // Scroll to the top when mounting
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find all media of current userId
  useEffect(() => {
    setMatchedMedia(
      media.filter((item) => Number(item.photographerId) === Number(userId))
    );
  }, [media, userId]);

  const onChangeFilter = (e) => {
    setSortBy(e.target.value);

    // Change the position of sorting options:  the selected one to the top, others to the bottom
    let cloneOptions = cloneDeep(options);
    const currentIndex = cloneOptions.findIndex(
      (option) => option.value === e.target.value
    );
    const currentFilter = cloneOptions[currentIndex];
    cloneOptions.splice(currentIndex, 1);
    cloneOptions.unshift(currentFilter);
    setOptions(cloneOptions);
  };

  // Handle click on contact button
  const onClickContactMe = () => {
    navigate(`/profile/${userId}/contact`, {
      state: {
        backgroundLocation: {
          pathname: `/profile/${userId}`,
        },
      },
    });
  };

  const header = matchedUser && (
    <section className={styles.Header}>
      <article>
        <h1 className={styles.Name}>{matchedUser?.name}</h1>
        <p
          className={styles.City}
        >{`${matchedUser?.city}, ${matchedUser?.country}`}</p>
        <p className={styles.Tagline}>{matchedUser?.tagline}</p>
      </article>
      <Button label="Contact Me" onClick={onClickContactMe}>
        Contactez-moi
      </Button>
      <figure>
        <IdPhoto user={matchedUser} />
      </figure>
    </section>
  );

  const filter = matchedUser && (
    <section className={styles.Filter}>
      <span id="Order by" className={styles.FilterText}>
        Trier par
      </span>
      <Select
        label="Order by"
        labelBy="Order by"
        value={sortBy}
        onChange={onChangeFilter}
        options={options}
      />
    </section>
  );

  const collection = matchedMedia.length && (
    <section className={styles.Collection}>
      {sortMedia(matchedMedia, sortBy).map((item) => (
        <Photo
          key={item.id}
          item={item}
          matchedMedia={matchedMedia}
          setMatchedMedia={setMatchedMedia}
          sortBy={sortBy}
        />
      ))}
    </section>
  );

  const footer = matchedMedia.length && (
    <footer className={styles.FooterContainer}>
      <p className={styles.TotalLike}>
        {matchedMedia.map((item) => item.likes).reduce((a, b) => a + b, 0)}
        <AiFillHeart className={styles.HeartBtn} />
      </p>
      <p className={styles.Price}>{`${matchedUser?.price}Є/jour`}</p>
    </footer>
  );

  return matchedUser ? (
    <main className={styles.ProfileContainer}>
      {header}
      {filter}
      {collection}
      {footer}
    </main>
  ) : (
    <Loader />
  );
}
