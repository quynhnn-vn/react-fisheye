import { Close } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./ContactModal.module.css";

export default function ContactModal({ photographers }) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const matchedUser = photographers.find(
    (photographer) => photographer.id === Number(userId)
  );

  const onChangeForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onCloseModal = () => navigate(`/profile/${userId}`);

  const renderInput = (type, title) => {
    return (
      <>
        <label htmlFor={type} className={styles.Label}>
          {title}
        </label>
        <input
          id={type}
          type={type !== "message" ? "text" : "textarea"}
          name={type}
          value={form[type]}
          onChange={onChangeForm}
          className={styles.Input}
        />
      </>
    );
  };

  return (
    <Dialog
      open={true}
      onClose={onCloseModal}
      aria-labelledby={`Contact me ${matchedUser?.name}`}
      aria-describedby={`Contact me ${matchedUser?.name}`}
      className={styles.ModalContainer}
      maxWidth="md"
    >
      <div className={styles.ModalContent}>
        <h1 className={styles.Title}>
          Contactez-moi
          <br />
          {matchedUser?.name}
        </h1>
        <IconButton className={styles.CloseButton} onClick={onCloseModal}>
          <Close className={styles.CloseIcon} />
        </IconButton>
        <form className={styles.FormContent}>
          {renderInput("firstName", "Prénom")}
          {renderInput("lastName", "Nom")}
          {renderInput("email", "Email")}
          {renderInput("message", "Votre message")}
        </form>
        <input
          type="submit"
          value="Envoyer"
          className={styles.SendButton}
          onClick={onCloseModal}
        />
      </div>
    </Dialog>
  );
}
