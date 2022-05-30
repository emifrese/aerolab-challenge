import React from "react";

import {productsActions} from "~/store/products";
import {useAppSelector, useAppDispatch} from "~/hooks";
import prevArrow from "../assets/icons/arrow-left.svg";
import nextArrow from "../assets/icons/arrow-right.svg";
import styles from "../App/App.module.scss";

const PageChanger: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.products.currentPage);
  const pages = useAppSelector((state) => state.products.pages);

  return (
    <footer className={styles.pageChanger}>
      {currentPage > 1 && (
        <img src={prevArrow} onClick={() => dispatch(productsActions.changePage("sub"))} />
      )}
      {currentPage < pages && (
        <img src={nextArrow} onClick={() => dispatch(productsActions.changePage("add"))} />
      )}
    </footer>
  );
};

export default PageChanger;
