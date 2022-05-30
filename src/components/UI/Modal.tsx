import ReactDOM from "react-dom";
import React from "react";

import styles from "../../App/App.module.scss";

type AppProps = {
  onClose: () => void;
};

type OverlayProps = {
  children: JSX.Element;
};

type ModalProps = {
  Toggle: () => void;
  children: JSX.Element;
};

const Backdrop = ({onClose}: AppProps) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({children}: OverlayProps) => {
  return (
    <div className={styles.modal__container}>
      <div className={styles.modal}>
        <>{children}</>
      </div>
    </div>
  );
};

const portalElement: HTMLElement | null = document.getElementById("overlays")!;

const Modal = ({Toggle, children}: ModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={Toggle} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
