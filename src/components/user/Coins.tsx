import React from "react";

import styles from "../../App/App.module.scss";

type AppProps = {
  AddCoinsHandler: (amount: number) => void;
  Toggle: () => void;
};

const Coins: React.FC<AppProps> = ({AddCoinsHandler, Toggle}) => {
  return (
    <div className={styles.coinsManager}>
      <p>How much coins do yo want?</p>
      <ul>
        <li
          value={1000}
          onClick={(e) => {
            AddCoinsHandler(e.currentTarget.value);
            Toggle();
          }}
        >
          1000
        </li>
        <li
          value={5000}
          onClick={(e) => {
            AddCoinsHandler(e.currentTarget.value);
            Toggle();
          }}
        >
          5000
        </li>
        <li
          value={7500}
          onClick={(e) => {
            AddCoinsHandler(e.currentTarget.value);
            Toggle();
          }}
        >
          7500
        </li>
      </ul>
    </div>
  );
};

export default Coins;
