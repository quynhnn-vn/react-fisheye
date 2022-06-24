import { ArrowBackIosNew, ArrowForwardIos, Close } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
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
      maxHeight="100vh"
    >
      <div
        className={styles.ModalContent}
        aria-label="image closeup view"
        style={{ height: "90vh" }}
      >
        <div className={styles.NarrowButton}>
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
              <IconButton className={styles.IconButton}>
                <ArrowBackIosNew className={styles.Icon} />
              </IconButton>
            </Link>
          ) : (
            <div className={styles.IconButton}></div>
          )}
        </div>
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
              Your browser does not support the video tag.
            </video>
          )}
          <figcaption>
            <span className={styles.Title}>{currentPhoto.title}</span>
          </figcaption>
        </figure>
        <IconButton
          className={[styles.IconButton, styles.CloseButton].join(" ")}
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <Close className={styles.Icon} />
        </IconButton>
        <div className={styles.NarrowButton}>
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
              <IconButton className={styles.IconButton}>
                <ArrowForwardIos className={styles.Icon} />
              </IconButton>
            </Link>
          ) : (
            <div className={styles.IconButton}></div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
