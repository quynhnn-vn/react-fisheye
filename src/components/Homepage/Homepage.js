import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import IdPhoto from "UI/IdPhoto";

import styles from "./Homepage.module.css";

/**
 * Component of the homepage, including a list of photographers, each photographer has:
 * - A profile photo
 * - Some details such as description, city of price
 */
export default function Homepage({ photographers }) {
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
                  <article
                    className={styles.Description}
                    aria-label="city tagline price"
                  >
                    <p
                      className={styles.City}
                    >{`${photographer?.city}, ${photographer?.country}`}</p>
                    <p className={styles.Tagline}>{photographer?.tagline}</p>
                    <p
                      className={styles.Price}
                    >{`${photographer?.price}Є/jour`}</p>
                  </article>
                </figcaption>
              </figure>
            </Link>
          </section>
        ))}
    </main>
  );
}
