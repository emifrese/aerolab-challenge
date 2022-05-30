import React from "react";

import {useAppSelector} from "~/hooks";
import logo from "../assets/logo.svg";
import header from "../assets/header.png";
import coin from "../assets/icons/coin.svg";
import cart from "../assets/shopping-cart.png";
import styles from "../App/App.module.scss";

type AppProps = {
  toggleCoins: () => void;
  toggleHistory: () => void;
};

const Header: React.FC<AppProps> = ({toggleCoins, toggleHistory}) => {
  const user = useAppSelector((state) => state.user);

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.navLogo}>
          <img alt="Aerolab" src={logo} />
        </div>
        <ul>
          <li onClick={() => toggleCoins()}>
            <figure>
              <figcaption>{user.points}</figcaption>
              <img alt="Coin" src={coin} />
            </figure>
          </li>
          <li
            onClick={() => {
              toggleHistory();
            }}
          >
            <figure>
              <figcaption className={styles.shoppingLabel}>{user.cartItems}</figcaption>
              <img alt="shopping-cart" src={cart} />
            </figure>
          </li>
        </ul>
      </nav>
      <h1>
        <figure>
          <figcaption>Hot sales</figcaption>
          <img alt="Aerolab" src={header} />
        </figure>
      </h1>
    </header>
  );
};

export default Header;
