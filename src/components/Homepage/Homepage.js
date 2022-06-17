import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import IdPhoto from "UI/IdPhoto";

import styles from "./Homepage.module.css";

export default function Main({ photographers }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.Main}>
      {photographers.length &&
        photographers.map((photographer, index) => (
          <section key={index} className={styles.ThumbPhotographer}>
            <Link to={`/profile/${photographer.id}`}>
              <figure>
                <IdPhoto user={photographer} />
                <figcaption>
                  <h2 className={styles.Name}>{photographer?.name}</h2>
                </figcaption>
              </figure>
            </Link>
            <div className={styles.Description}>
              <p
                className={styles.City}
              >{`${photographer?.city}, ${photographer?.country}`}</p>
              <p className={styles.Tagline}>{photographer?.tagline}</p>
              <p className={styles.Price}>{`${photographer?.price}Є/jour`}</p>
            </div>
          </section>
        ))}
    </main>
  );
}
