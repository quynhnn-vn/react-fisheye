import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import IdPhoto from "UI/IdPhoto";

import { AiFillHeart } from "react-icons/ai";

import styles from "./Profile.module.css";
import Loader from "UI/Loader";
import Photo from "components/Profile/Photo";
import Button from "UI/Button";
import Select from "UI/Select";
import { sortMedia } from "utils/utils";
import { cloneDeep } from "lodash";

const filterOptions = [
  {
    value: "likes",
    title: "Popularité",
  },
  {
    value: "date",
    title: "Date",
  },
  {
    value: "title",
    title: "Titre",
  },
];

export default function Profile({ photographers, media }) {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [matchedMedia, setMatchedMedia] = useState([]);
  // Can be likes, date or title
  const [filterBy, setFilterBy] = useState("likes");
  const [options, setOptions] = useState(filterOptions);

  const matchedUser = photographers.find((user) => user.id === Number(userId));

  useEffect(() => {
    setMatchedMedia(
      media.filter((item) => Number(item.photographerId) === Number(userId))
    );
  }, [media, userId]);

  const onChangeFilter = (e) => {
    setFilterBy(e.target.value);

    let cloneOptions = cloneDeep(options);
    const currentIndex = cloneOptions.findIndex(
      (option) => option.value === e.target.value
    );
    const currentFilter = cloneOptions[currentIndex];
    cloneOptions.splice(currentIndex, 1);
    cloneOptions.unshift(currentFilter);
    setOptions(cloneOptions);
  };

  const onClickContactMe = () => {
    navigate(`/profile/${userId}/contact`, {
      state: {
        backgroundLocation: {
          pathname: `/profile/${userId}`,
        },
      },
    });
  };

  const header = (
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

  const filter = (
    <section className={styles.Filter}>
      <span className={styles.FilterText}>Trier par</span>
      <Select
        labelId="order-by"
        id="order-by"
        label="Order by"
        value={filterBy}
        onChange={onChangeFilter}
        options={options}
      />
    </section>
  );

  const collection = matchedMedia.length && (
    <section className={styles.Collection}>
      {sortMedia(matchedMedia, filterBy).map((item) => (
        <Photo
          key={item.id}
          item={item}
          matchedMedia={matchedMedia}
          setMatchedMedia={setMatchedMedia}
          filterBy={filterBy}
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
