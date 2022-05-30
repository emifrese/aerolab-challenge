import React from "react";

import {useAppSelector, useAppDispatch} from "~/hooks";
import {productsActions} from "~/store/products";
import styles from "../App/App.module.scss";

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const sortDir = useAppSelector((state) => state.products.sortIncrement);

  const options: JSX.Element[] = [];
  const categories: string[] = [
    "All",
    "Phones",
    "Gaming",
    "Laptops",
    "Cameras",
    "Audio",
    "Monitors & TV",
    "Drones",
    "Phone Accessories",
    "Smart Home",
    "PC Accessories",
    "Tablets & E-readers",
  ];

  for (const option of categories) {
    const item = (
      <option key={categories.indexOf(option)} value={option}>
        {option}
      </option>
    );

    options.push(item);
  }

  const categoryHandler: (category: string) => void = (category) => {
    dispatch(productsActions.filter(category));
  };

  return (
    <div className={styles.filterSection}>
      <select onChange={(e) => categoryHandler(e.target.value)}>{options}</select>
      <button onClick={() => dispatch(productsActions.sort())}>
        Sort {sortDir ? "Decreasing" : "Increasing"}
      </button>
    </div>
  );
};

export default Filter;
