import axios from "axios";
import { io } from "socket.io-client";
import React, { createContext, useState } from "react";

export const UserContext = createContext();
export default function User({ Componnent }) {
  const [User, setUser] = useState({});
  const [shop, setShop] = useState({});
  const [product, setProduct] = useState({});
  const [shopPreview, setShopPreview] = useState({});

  const socket = io("http://localhost:9000");

  const inforUser = () => {
    const ID = window.localStorage.getItem("ID");
    axios
      .post("http://localhost:9000/Client/GetInfor", { ID: ID })
      .then((rs) => {
        if (rs.data.Status !== "False") {
          setUser(rs.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkShop = () => {
    const ID = window.localStorage.getItem("ID");
    axios
      .post("http://localhost:9000/CuaHang/CheckShop", { ID: ID })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setShop(rs.data.shop);
          window.localStorage.setItem("IDS", rs.data.shop._id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inforShop = () => {
    const IDSP = window.localStorage.getItem("IDSP");
    axios
      .post("http://localhost:9000/CuaHang/InforShop", { IDSP: IDSP })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setShopPreview(rs.data.shop);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inforProduct = () => {
    const IDPP = window.localStorage.getItem("IDPP")
    axios.post("http://localhost:9000/SanPham/InforProduct", { IDPP: IDPP}).then(rs => {
      if(rs.data.Status === "Success"){
        setProduct(rs.data.product)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <UserContext.Provider
      value={{ User, inforUser, shop, checkShop, shopPreview, inforShop, product, inforProduct, socket }}
    >
      {Componnent}
    </UserContext.Provider>
  );
}
