import React from "react";
import {useDispatch} from "react-redux";

import styles from "../../App/App.module.scss";
import {useAppSelector} from "~/hooks";
import {userActions} from "~/store/user";
import trash from "../../assets/trash-bin.png";

const History: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const content: JSX.Element[] = [];

  for (const product of user.redeemHistory) {
    const element = (
      <li key={product._id}>
        <p>{product.amount}</p>
        <figure>
          <figcaption>{product.name}</figcaption>
          <img alt={product.name} src={product.img.url} />
        </figure>
        <div>
          <img
            alt="trash-icon"
            src={trash}
            onClick={() => dispatch(userActions.return(product._id))}
          />
        </div>
      </li>
    );

    content.push(element);
  }

  return content.length > 0 ? (
    <ul className={styles.historyList}>{content}</ul>
  ) : (
    <p className={styles.historyEmpty}>No items bought</p>
  );
};

export default History;
