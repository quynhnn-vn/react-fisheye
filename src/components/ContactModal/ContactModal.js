import { Close } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import { cloneDeep } from "lodash";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateForm, validEmailRegex } from "utils/utils";
import Button from "../../UI/Button";

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
  const [error, setError] = useState({
    firstName: null,
    lastName: null,
    email: null,
    message: null,
  });

  const matchedUser = photographers.find(
    (photographer) => photographer.id === Number(userId)
  );

  const onCloseModal = () => navigate(`/profile/${userId}`);

  const onChangeForm = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onBlurForm = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    let cloneError = cloneDeep(error);

    cloneError[name] =
      value.length === 0 ? "* Ce champs est obligatoire !" : "";

    if (name === "email") {
      cloneError.email = validEmailRegex.test(value)
        ? ""
        : "* L'email n'est pas valide !";
    }

    setError(cloneError);
  };

  const onSendForm = () => {
    if (validateForm(error)) {
      onCloseModal();
      console.log(form);
    }
  };

  const renderInput = (type, title) => {
    return (
      <>
        <label htmlFor={type} className={styles.Label}>
          {title}
        </label>
        {error[type] && error[type]?.length > 0 && (
          <span className={styles.Error}>{error[type]}</span>
        )}
        {type !== "message" ? (
          <input
            id={type}
            type={"text"}
            name={type}
            arial-label={title}
            value={form[type]}
            onChange={onChangeForm}
            onBlur={onBlurForm}
            className={styles.Input}
          />
        ) : (
          <textarea
            id={type}
            name={type}
            arial-label={title}
            onChange={onChangeForm}
            onBlur={onBlurForm}
            className={[styles.Input, styles.TextAreaInput].join(" ")}
          >
            {form[type]}
          </textarea>
        )}
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
      <section className={styles.ModalContent}>
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
        <Button label="Send" onClick={onSendForm}>
          Envoyer
        </Button>
      </section>
    </Dialog>
  );
}
