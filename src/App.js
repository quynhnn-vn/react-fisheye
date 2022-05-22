import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "components/Homepage/Homepage";
import Profile from "components/Profile/Profile";
import Header from "components/Header/Header";
import Loader from "UI/Loader";

import "./App.css";

function App() {
  const [photographers, setPhotographers] = useState([]);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchPhotographers().catch((error) => console.log(error));
  }, []);

  const fetchPhotographers = async () => {
    const response = await fetch("/data/photographers.json");
    const { photographers, media } = await response.json();
    setPhotographers(photographers);
    setMedia(media);
  };

  return (
    <>
      <Header />
      {photographers.length !== 0 ? (
        <Routes>
          <Route
            path="*"
            element={<Homepage photographers={photographers} />}
          />
          <Route
            path="profile/:userId"
            element={<Profile photographers={photographers} media={media} />}
          />
        </Routes>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
