import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "components/Homepage/Homepage";
import Profile from "components/Profile/Profile";
import Header from "components/Header/Header";
import Loader from "UI/Loader";
import Modal from "components/PhotoModal/PhotoModal";

import "./App.css";
import ContactModal from "components/ContactModal/ContactModal";

function App() {
  const location = useLocation();
  const [photographers, setPhotographers] = useState([]);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchPhotographers();
  }, []);

  //
  const fetchPhotographers = async () => {
    try {
      let response = await fetch("/data/photographers.json");
      const { photographers, media } = await response.json();
      setPhotographers(photographers);
      setMedia(media);
    } catch (error) {
      console.log(error);
    }
  };

  // The `backgroundLocation` state is the location that we were at when one of
  // the gallery links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the gallery in the background, behind the modal.
  let state = location.state;

  return (
    <>
      <Header />
      {photographers.length !== 0 ? (
        <>
          <Routes location={state?.backgroundLocation || location}>
            <Route
              path="/"
              element={<Homepage photographers={photographers} />}
            />
            <Route
              path="/profile/:userId"
              element={<Profile photographers={photographers} media={media} />}
            />
          </Routes>
          {/* Show the modal when a `backgroundLocation` is set */}
          {state?.backgroundLocation && (
            <Routes>
              <Route
                path="/profile/:userId/photo/:photoId"
                element={<Modal media={media} />}
              />
              <Route
                path="/profile/:userId/contact"
                element={<ContactModal photographers={photographers} />}
              />
            </Routes>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
