import React, { useState } from "react";
import { useParams } from "react-router-dom";
import IdPhoto from "UI/IdPhoto";
import { getPhotoOrVideoSource } from "utils/utils";
import { AiFillHeart } from "react-icons/ai";

import styles from "./Profile.module.css";
import Modal from "UI/Modal";

export default function Profile({ photographers, media }) {
  const { userId } = useParams();
  // Can be likes, date or title
  const [filterBy, setFilterBy] = useState("likes");
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const matchedUser = photographers.find((user) => user.id === Number(userId));
  const matchedMedia = media.filter(
    (item) => item.photographerId === Number(userId)
  );

  const onChangeFilter = (e) => {
    setFilterBy(e.target.value);
  };

  const onShowModal = (item) => {
    setIsShowModal(!isShowModal);
    setSelectedPhoto(item);
  };

  const sortMedia = (data) => {
    return data.sort((a, b) => {
      if (filterBy === "likes") return b.likes - a.likes;
      else if (filterBy === "date") return new Date(b.date) - new Date(a.date);
      else return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });
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
      <input
        type="button"
        alt="Submit"
        className={styles.ContactBtn}
        value="Contactez-moi"
      />
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
      {sortMedia(matchedMedia).map((item) => (
        <figure
          key={item.id}
          className={styles.PhotoContainer}
          onClick={() => onShowModal(item.id)}
        >
          {item?.image ? (
            <img src={getPhotoOrVideoSource(item?.image)} alt={item.title} />
          ) : (
            <video src={getPhotoOrVideoSource(item?.video)} alt={item.title} />
          )}
          <figcaption>
            <span className={styles.Title}>{item.title}</span>
            <div className={styles.LikeContainer}>
              <span className={styles.Like}>{item.likes}</span>
              <AiFillHeart className={styles.HeartBtn} />
            </div>
          </figcaption>
        </figure>
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

  const modal = selectedPhoto && (
    <Modal isShowModal={isShowModal} selectedPhoto={selectedPhoto}>
      <figure className={styles.PhotoContainer}>
        {selectedPhoto?.image ? (
          <img
            src={getPhotoOrVideoSource(selectedPhoto?.image)}
            alt={selectedPhoto.title}
          />
        ) : (
          <video
            src={getPhotoOrVideoSource(selectedPhoto?.video)}
            alt={selectedPhoto.title}
          />
        )}
        <figcaption>
          <span className={styles.Title}>{selectedPhoto.title}</span>
        </figcaption>
      </figure>
    </Modal>
  );

  return (
    matchedUser && (
      <div className={styles.ProfileContainer}>
        {header}
        {filter}
        {collection}
        {footer}
        {modal}
      </div>
    )
  );
}
