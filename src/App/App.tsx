import * as React from "react";
import {useEffect} from "react";
import {useState} from "react";

import {userActions} from "../store/user";
import {productsActions} from "~/store/products";
import {useAppDispatch} from "~/hooks";
import clienteAxios from "../config/axios";
import Modal from "~/components/UI/Modal";
import Card from "~/components/Card";
import History from "~/components/user/History";
import Coins from "~/components/user/Coins";
import Header from "~/components/Header";
import Filter from "~/components/Filter";
import Products from "~/components/Products";
import PageChanger from "~/components/PageChanger";
import Layout from "~/components/UI/Layout";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [modalHistory, setModalHistory] = useState(false);
  const [modalCoins, setModalCoins] = useState(false);

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

  const toggleHistoryHandler: () => void = () => {
    setModalHistory((state) => !state);
  };

  const toggleCoinsHandler: () => void = () => {
    setModalCoins((state) => !state);
  };

  return (
    <>
      {modalCoins && (
        <Modal Toggle={toggleCoinsHandler}>
          <Card>
            <Coins AddCoinsHandler={addCoins} Toggle={toggleCoinsHandler} />
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
      <Layout>
        <Header toggleCoins={toggleCoinsHandler} toggleHistory={toggleHistoryHandler} />
        <Filter />
        <Products />
        <PageChanger />
      </Layout>
    </>
  );
};

export default App;
