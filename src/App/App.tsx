import * as React from "react";
import {useEffect} from "react";

import {userActions} from "../store/user";
import {productsActions} from "~/store/products";
import {useAppSelector, useAppDispatch} from "~/hooks";
import clienteAxios from "../config/axios";
import logo from "../assets/logo.svg";
import header from "../assets/header.png";
import coin from "../assets/icons/coin.svg";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  console.log(user);
  console.log(products);

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
  }, []);

  const content: JSX.Element[] = [];

  for (const product of products) {
    const card = (
      <div key={product._id}>
        <figure>
          <figcaption>{product.name}</figcaption>
          <img alt="Best-Sale" src={product.img.url} />
        </figure>
        <p>{product.cost}</p>
        <button onClick={() => dispatch(userActions.purchase(product))}>Purchase</button>
      </div>
    );

    content.push(card);
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <nav>
          <div className={styles.navLogo}>
            <img alt="Aerolab" src={logo} width={32} />
          </div>
          <ul>
            <li>{user.name}</li>
            <li>
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
        <img alt="Best-Sale" src="https://coding-challenge-api.aerolab.co/images/iPhone8-x1.png" />
      </div>
      <button onClick={() => dispatch(productsActions.sort())}>Sort</button>
      <div className={styles.allProducts}>{content}</div>
    </main>
  );
};

export default App;
