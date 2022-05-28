import React from "react";

import styles from "../../App/App.module.scss";
import {useAppSelector} from "~/hooks";

type AppProps = {
  CoinsHandler: (amount: number) => void;
  Toggle: () => void;
};

const Coins: React.FC<AppProps> = ({CoinsHandler, Toggle}) => {
  return (
    <ul>
      <li
        value={1000}
        onClick={(e) => {
          CoinsHandler(e.currentTarget.value);
          Toggle();
        }}
      >
        1000
      </li>
      <li
        value={5000}
        onClick={(e) => {
          CoinsHandler(e.currentTarget.value);
          Toggle();
        }}
      >
        5000
      </li>
      <li
        value={7500}
        onClick={(e) => {
          CoinsHandler(e.currentTarget.value);
          Toggle();
        }}
      >
        7500
      </li>
    </ul>
  );
};

export default Coins;
