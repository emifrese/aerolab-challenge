import React from "react";

import styles from "../../App/App.module.scss";
import {useAppSelector} from "~/hooks";

const History: React.FC = () => {
  const user = useAppSelector((state) => state.user);

  const content: JSX.Element[] = [];

  for (const product of user.redeemHistory) {
    const element = (
      <li>
        <p>{product.amount}</p>
        <figure>
          <figcaption>{product.name}</figcaption>
          <img alt={product.name} src={product.img.url} />
        </figure>
        <p>{product.cost}</p>
      </li>
    );

    content.push(element);
  }

  return <ul className={styles.historyList}>{content}</ul>;
};

export default History;
