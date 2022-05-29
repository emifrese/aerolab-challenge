import * as React from "react";
import {useEffect} from "react";
import {useState} from "react";

import {userActions} from "../store/user";
import {productsActions} from "~/store/products";
import {useAppSelector, useAppDispatch} from "~/hooks";
import clienteAxios from "../config/axios";
import logo from "../assets/logo.svg";
import header from "../assets/header.png";
import coin from "../assets/icons/coin.svg";
import Modal from "~/components/UI/Modal";
import Card from "~/components/Card";
import History from "~/components/user/History";
import Coins from "~/components/user/Coins";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const showingProducts = useAppSelector((state) => state.products.showingProducts);
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
    const card = (
      <div key={product._id}>
        <figure>
          <figcaption>{product.name}</figcaption>
          <img alt="Best-Sale" src={product.img.url} />
        </figure>
        <p>{product.cost}</p>
        {user.points >= product.cost ? (
          <button onClick={() => dispatch(userActions.purchase(product))}>Purchase</button>
        ) : (
          <p>Te faltan {product.cost - user.points}</p>
        )}
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
              <img alt="Aerolab" src={logo} width={32} />
            </div>
            <ul>
              <li
                onClick={() => {
                  toggleCoinsHandler();
                }}
              >
                {user.name}
              </li>
              <li onClick={() => toggleHistoryHandler()}>
                {user.points}
                <img alt="Coin" src={coin} width={16} />
              </li>
            </ul>
          </nav>
          <h1>
            <img alt="Aerolab" src={header} />
          </h1>
          <h3>Lets get this party started</h3>
        </header>
        <div>
          <p>Best Sale</p>
          <img
            alt="Best-Sale"
            src="https://coding-challenge-api.aerolab.co/images/iPhone8-x1.png"
          />
        </div>
        <button onClick={() => dispatch(productsActions.sort())}>Sort</button>
        <select onChange={(e) => categoryHandler(e.target.value)}>{options}</select>
        <div className={styles.allProducts}>{content}</div>
      </main>
      <button onClick={() => dispatch(productsActions.changePage("sub"))}>Prev Page</button>
      <button onClick={() => dispatch(productsActions.changePage("add"))}>NextPage</button>
    </>
  );
};

export default App;
