import * as React from "react";
import {useEffect} from "react";

import clienteAxios from "../config/axios";
import logo from "../assets/logo.svg";
import header from "../assets/header.png";
import coin from "../assets/icons/coin.svg";

import styles from "./App.module.scss";

const App: React.FC = () => {
  useEffect(() => {
    async function obtenerPerfil() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhlNDBhZTZjYjE1MDAwMjE3ZWI3NmMiLCJpYXQiOjE2NTM0ODk4Mzh9.P43SoMt8YGai77zEXXdUZrWmEoRxZWx-c7rDqfIAdIQ",
          },
        };

        const {data} = await clienteAxios("/user/me", config);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function obtenerProductos() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjhlNDBhZTZjYjE1MDAwMjE3ZWI3NmMiLCJpYXQiOjE2NTM0ODk4Mzh9.P43SoMt8YGai77zEXXdUZrWmEoRxZWx-c7rDqfIAdIQ",
          },
        };

        const {data} = await clienteAxios("/products", config);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    obtenerPerfil();
    obtenerProductos();
  }, []);

  const content: JSX.Element[] = [];

  for (let i = 0; i < 8; i++) {
    const card = (
      <div>
        <p>Producto N{i + 1}</p>
        <img alt="Best-Sale" src="https://coding-challenge-api.aerolab.co/images/iPhone8-x1.png" />
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
            <li>Emiliano</li>
            <li>
              6000
              <img alt="Coin" src={coin} width={16} />
            </li>
          </ul>
        </nav>
        <h1>
          <img alt="Aerolab" src={header} />
        </h1>
        <h3>Lets get this party started</h3>
        <div>
          <p>Best Sale</p>
          <img
            alt="Best-Sale"
            src="https://coding-challenge-api.aerolab.co/images/iPhone8-x1.png"
          />
        </div>
        <div className={styles.allProducts}>{content}</div>
      </header>
    </main>
  );
};

export default App;
