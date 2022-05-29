import * as React from "react";
import {useEffect} from "react";
import {useState} from "react";

import {userActions} from "../store/user";
import {productsActions} from "~/store/products";
import {useAppSelector, useAppDispatch} from "~/hooks";
import clienteAxios from "../config/axios";
import logo from "../assets/logo.svg";
import header from "../assets/header.png";
import cart from "../assets/shopping-cart.png";
import coin from "../assets/icons/coin.svg";
import prevArrow from "../assets/icons/arrow-left.svg";
import nextArrow from "../assets/icons/arrow-right.svg";
import Modal from "~/components/UI/Modal";
import Card from "~/components/Card";
import History from "~/components/user/History";
import Coins from "~/components/user/Coins";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const showingProducts = useAppSelector((state) => state.products.showingProducts);
  const sortDir = useAppSelector((state) => state.products.sortIncrement);
  const pages = useAppSelector((state) => state.products.pages);
  const currentPage = useAppSelector((state) => state.products.currentPage);
  const [modalHistory, setModalHistory] = useState(false);
  const [modalCoins, setModalCoins] = useState(false);

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

  async function addCoins(amount: number) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
        },
      };

      const toAdd = {
        amount,
      };

      const {data} = await clienteAxios.post("/user/points", toAdd, config);

      dispatch(userActions.addCoins(amount));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function obtenerPerfil() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
          },
        };

        const {data} = await clienteAxios("/user/me", config);

        dispatch(userActions.getUser(data));
      } catch (error) {
        console.log(error);
      }
    }

    async function obtenerProductos() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}`,
          },
        };

        const {data} = await clienteAxios("/products", config);

        dispatch(productsActions.getAllProducts(data));
      } catch (error) {
        console.log(error);
      }
    }

    obtenerPerfil();
    obtenerProductos();
  }, [dispatch]);

  const content: JSX.Element[] = [];
  const options: JSX.Element[] = [];

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

  for (const option of categories) {
    const item = (
      <option key={categories.indexOf(option)} value={option}>
        {option}
      </option>
    );

    options.push(item);
  }

  const toggleHistoryHandler: () => void = () => {
    setModalHistory((state) => !state);
  };

  const toggleCoinsHandler: () => void = () => {
    setModalCoins((state) => !state);
  };

  const categoryHandler: (category: string) => void = (category) => {
    dispatch(productsActions.filter(category));
  };

  return (
    <>
      {modalCoins && (
        <Modal Toggle={toggleCoinsHandler}>
          <Card>
            <Coins CoinsHandler={addCoins} Toggle={toggleCoinsHandler} />
          </Card>
        </Modal>
      )}
      {modalHistory && (
        <Modal Toggle={toggleHistoryHandler}>
          <Card>
            <History />
          </Card>
        </Modal>
      )}
      <main className={styles.container}>
        <header className={styles.header}>
          <nav>
            <div className={styles.navLogo}>
              <img alt="Aerolab" src={logo} />
            </div>
            <ul>
              <li onClick={() => toggleCoinsHandler()}>
                <figure>
                  <figcaption>{user.points}</figcaption>
                  <img alt="Coin" src={coin} />
                </figure>
              </li>
              <li
                onClick={() => {
                  toggleHistoryHandler();
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
        <div className={styles.filterSection}>
          <select onChange={(e) => categoryHandler(e.target.value)}>{options}</select>
          <button onClick={() => dispatch(productsActions.sort())}>
            Sort {sortDir ? "Decreasing" : "Increasing"}
          </button>
        </div>
        <div>
          {content.length < 1 && (
            <figure>
              <img alt="Aerolab" className={styles.loadingLogo} src={logo} width={128} />
              <figcaption>Loading...</figcaption>
            </figure>
          )}
          {content.length === showingProducts.length && (
            <div className={styles.allProducts}>{content}</div>
          )}
        </div>
        <div className={styles.pageChanger}>
          {currentPage > 1 && (
            <img src={prevArrow} onClick={() => dispatch(productsActions.changePage("sub"))} />
          )}
          {currentPage < pages && (
            <img src={nextArrow} onClick={() => dispatch(productsActions.changePage("add"))} />
          )}
        </div>
      </main>
    </>
  );
};

export default App;
