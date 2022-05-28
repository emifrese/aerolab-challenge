import React from "react";

import styles from "../App/App.module.scss";

type AppProps = {
  children: JSX.Element | string;
};

const Card = ({children}: AppProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
