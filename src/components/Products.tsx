import React from "react";

import {userActions} from "~/store/user";
import {useAppSelector, useAppDispatch} from "~/hooks";
import styles from "../App/App.module.scss";
import coin from "../assets/icons/coin.svg";
import logo from "../assets/logo.svg";

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const showingProducts = useAppSelector((state) => state.products.showingProducts);
  const content: JSX.Element[] = [];

  for (const product of showingProducts) {
    const buyFunction =
      user.points >= product.cost ? () => dispatch(userActions.purchase(product)) : () => null;

    const card = (
      <div
        key={product._id}
        className={user.points < product.cost ? styles.productExpensive : styles.productElement}
        onClick={buyFunction}
      >
        <figure className={styles.imageCard}>
          <img alt="Best-Sale" src={product.img.url} />
          <figcaption>{product.name}</figcaption>
        </figure>
        {user.points >= product.cost && (
          <figure className={styles.priceCard}>
            <figcaption className={styles.productCost}>{product.cost}</figcaption>

            <img alt="Aerolab" src={coin} />
          </figure>
        )}
        {user.points < product.cost && <p>Te faltan {product.cost - user.points}</p>}
      </div>
    );

    content.push(card);
  }

  return (
    <main>
      {content.length < 1 && (
        <figure>
          <img alt="Aerolab" className={styles.loadingLogo} src={logo} width={128} />
          <figcaption>Loading...</figcaption>
        </figure>
      )}
      {content.length === showingProducts.length && (
        <div className={styles.allProducts}>{content}</div>
      )}
    </main>
  );
};

export default Products;
