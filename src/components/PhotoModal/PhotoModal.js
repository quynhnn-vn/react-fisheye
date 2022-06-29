import { ArrowBackIosNew, ArrowForwardIos, Close } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { getPhotoOrVideoSource, sortMedia } from "utils/utils";

import styles from "./PhotoModal.module.css";

export default function Modal({ media }) {
  const navigate = useNavigate();
  const { userId, photoId } = useParams();
  const { state } = useLocation();

  const matchedMedia = media.filter(
    (item) => item.photographerId === Number(userId)
  );

  const currentIndex = sortMedia(matchedMedia, state.filterBy).findIndex(
    (item) => item.id === Number(photoId)
  );

  const [previousPhoto, currentPhoto, nextPhoto] = [
    matchedMedia[currentIndex - 1],
    matchedMedia[currentIndex],
    matchedMedia[currentIndex + 1],
  ];

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "ArrowRight" && nextPhoto) {
        navigate(`/profile/${userId}/photo/${nextPhoto?.id}`, {
          state: {
            backgroundLocation: {
              pathname: `/profile/${userId}`,
            },
            filterBy: state.filterBy,
          },
        });
      } else if (e.key === "ArrowLeft" && previousPhoto) {
        navigate(`/profile/${userId}/photo/${previousPhoto?.id}`, {
          state: {
            backgroundLocation: {
              pathname: `/profile/${userId}`,
            },
            filterBy: state.filterBy,
          },
        });
      }
    },
    [navigate, nextPhoto, previousPhoto, state.filterBy, userId]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Dialog
      open={true}
      onClose={() => navigate(`/profile/${userId}`)}
      aria-labelledby={currentPhoto.title}
      aria-describedby={currentPhoto.title}
      className={styles.ModalContainer}
      fullWidth
      maxWidth="md"
    >
      <div className={styles.ModalContent} aria-label="image closeup view">
        {previousPhoto ? (
          <Link
            to={`/profile/${userId}/photo/${previousPhoto?.id}`}
            state={{
              backgroundLocation: {
                pathname: `/profile/${userId}`,
              },
              filterBy: state.filterBy,
            }}
          >
            <ArrowBackIosNew className={styles.Icon} />
          </Link>
        ) : (
          <div className={styles.IconButton}></div>
        )}
        <figure className={styles.PhotoContainer}>
          {currentPhoto?.image ? (
            <img
              src={getPhotoOrVideoSource(currentPhoto?.image)}
              alt={currentPhoto.title}
            />
          ) : (
            <video
              width="100%"
              height="calc(90vh - 70px)"
              aria-label={currentPhoto.title}
              controls
            >
              <source
                src={getPhotoOrVideoSource(currentPhoto?.video)}
                type="video/mp4"
              />
              <track
                default
                kind="captions"
                srcLang="fr"
                src={getPhotoOrVideoSource(currentPhoto?.video)}
              />
              Votre navigateur n'accepte pas le tag vidéo.
            </video>
          )}
          <figcaption>
            <span className={styles.Title}>{currentPhoto.title}</span>
          </figcaption>
        </figure>
        <button
          className={styles.CloseButton}
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <Close className={styles.Icon} />
        </button>
        {nextPhoto ? (
          <Link
            to={`/profile/${userId}/photo/${nextPhoto?.id}`}
            state={{
              backgroundLocation: {
                pathname: `/profile/${userId}`,
              },
              filterBy: state.filterBy,
            }}
          >
            <ArrowForwardIos className={styles.Icon} />
          </Link>
        ) : (
          <div className={styles.IconButton}></div>
        )}
      </div>
    </Dialog>
  );
}
