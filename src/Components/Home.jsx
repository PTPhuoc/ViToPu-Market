/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";
import { UserContext } from "../Data/User";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const widthScreen = window.innerWidth;
  // eslint-disable-next-line no-unused-vars
  const { User, inforUser, } = useContext(UserContext);
  const [scrollPage, setScrollPage] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [valueSearch, setvalueSearch] = useState("");
  const [productRank, setProductRank] = useState([]);
  const scrollProduct = useRef(null);

  useEffect(() => {
    inforUser()
    axios
      .post("http://localhost:9000/SanPham/GetProductRank")
      .then((rs) => {
        setProductRank(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debounceChange = useRef(
    debounce((value) => {
      setvalueSearch(value);
    }, 1000)
  );

  const ChangeInputSearch = (e) => {
    debounceChange.current(e.target.value);
  };

  const ChangeFirstScroll = () => {
    if (scrollPage === 0) {
      setScrollPage(2);
    } else {
      setScrollPage(scrollPage - 1);
    }
  };

  const ChangeLastScroll = () => {
    if (scrollPage === 2) {
      setScrollPage(0);
    } else {
      setScrollPage(scrollPage + 1);
    }
  };

  const addToCart = (idp) => {
    const id = window.localStorage.getItem("ID");
    console.log(idp)
    if (id) {
      axios
        .post("http://localhost:9000/GioHang/AddToCart", {
          maKhachHang: id,
          maSanPham: idp,
        })
        .then((rs) => {
          if (rs.data.Status === "Success") {
            Navigate("/Cart");
          } else {
            alert("Something Wrong");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Navigate("/SignIn");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      ChangeLastScroll();
    }, 5000);
    return () => clearInterval(interval);
  }, [scrollPage]);

  const TakeList = () => {
    axios
      .post("http://localhost:9000/SanPham/Products")
      .then((rs) => {
        setListProduct(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const TakeListSearch = () => {
    axios
      .post("http://localhost:9000/SanPham/Search", { Search: valueSearch })
      .then((rs) => {
        setListProduct(rs.data);
      })
      .catch((err) => {
        setListProduct([]);
      });
  };

  const Navigate = useNavigate();

  useEffect(() => {
    if (valueSearch) {
      TakeListSearch();
    } else {
      TakeList();
    }
  }, [valueSearch]);

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex items-center justify-center w-full h-[500px] bg-gradient-sky">
        <div className="text-center flex flex-col gap-5">
          <div>
            <p className="text-[70px] font-extrabold text-white">VITOPU</p>
          </div>
          <div className="h-2 w-full bg-white rounded-3xl"></div>
          <div>
            <p className="tetx-[45px] font-extrabold text-white">
              Nơi sẵn sàng bán rẻ mọi thứ cho bạn
              <br />
              Hãy tham gia mua sắm
            </p>
          </div>
        </div>
      </div>
      {productRank && productRank.length > 0 ? (
        <>
          <div
            className={"flex justify-center items-center duration-300 ease-in"}
            style={{
              width: widthScreen * 3 + "px",
              transform: "translateX(" + -1920 * scrollPage + "px)",
            }}
          >
            <div
              className="relative h-[700px] bg-white"
              style={{ width: widthScreen + "px" }}
            >
              <img
                className="w-full h-full object-cover "
                src={
                  "http://localhost:9000/Image/" +
                  productRank[0].productInfo.hinhAnh +
                  "." +
                  productRank[0].productInfo.loaiAnh
                }
                alt=""
              />
            </div>
            <div
              className="relative h-[700px] bg-red-400"
              style={{ width: widthScreen + "px" }}
            >
              <img
                className="w-full h-full object-cover "
                src={
                  "http://localhost:9000/Image/" +
                  productRank[1].productInfo.hinhAnh +
                  "." +
                  productRank[1].productInfo.loaiAnh
                }
                alt=""
              />
            </div>
            <div
              className="relative h-[700px] bg-slate-500"
              style={{ width: widthScreen + "px" }}
            >
              <img
                className="w-full h-full object-cover "
                src={
                  "http://localhost:9000/Image/" +
                  productRank[2].productInfo.hinhAnh +
                  "." +
                  productRank[2].productInfo.loaiAnh
                }
                alt=""
              />
            </div>
          </div>
          <div className="absolute flex justify-between items-center w-full h-[700px] translate-y-[500px]">
            <div>
              <button className="ml-[50px]" onClick={ChangeFirstScroll}>
                <svg
                  className="w-[50px] fill-white stroke-[#858585] stroke-[5px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-5 w-full p-5 ml-[50px] bg-[rgba(0,0,0,0.4)] text-white">
              <div>
                <p className="text-[40px]">
                  Tên sản phẩm: <span className="font-bold">{productRank[scrollPage].productInfo.tenSanPham}</span>
                </p>
              </div>
              <div>
                <p>
                  Tên cửa hàng: <span className="font-bold">{productRank[scrollPage].storeInfo.tenCuaHang}</span>
                </p>
              </div>
              <div>
                <p>
                  Đánh giá: {productRank[scrollPage].averageRating}/5 (
                  {productRank[scrollPage].totalRatings} Lượt đánh giá)
                </p>
              </div>
              <div>
                <p className="text-amber-500">
                  {Intl.NumberFormat().format(
                    productRank[scrollPage].productInfo.giaTien
                  )}{" "}
                  VND
                </p>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(productRank[scrollPage].productInfo._id);
                  }}
                  disabled={
                    window.localStorage.getItem("IDS") ===
                    productRank[scrollPage].productInfo.maCuaHang
                      ? true
                      : false
                  }
                  className={
                    window.localStorage.getItem("IDS") ===
                    productRank[scrollPage].productInfo.maCuaHang
                      ? "text-white p-2 bg-slate-300"
                      : "bg-[rgba(83,165,185,1)] text-white p-2 border-[rgba(83,165,185,1)] border-[2px] duration-200 ease-linear hover:bg-white hover:text-[rgba(83,165,185,1)]"
                  }
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
            <div className="w-full"></div>
            <div>
              <button className="mr-[50px]" onClick={ChangeLastScroll}>
                <svg
                  className="w-[50px] rotate-180 fill-white stroke-[#858585] stroke-[5px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[700px] bg-white">
          <div>
            <span className="loader"></span>
          </div>
          <div>
            <p>Loading...</p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center bg-slate-200 h-[840px]">
        <div className="border-b-[5px] w-[300px] border-[rgba(83,165,185,1)] ">
          <p className="font-bold text-[40px] pt-5 text-center">SẢN PHẨM</p>
        </div>
        <div className="py-5">
          <input
            className="w-[500px] p-2 outline-none"
            placeholder="Tìm kiếm..."
            onChange={ChangeInputSearch}
          ></input>
        </div>
        {listProduct.length === 0 ? (
          <div className="flex flex-col gap-10 justify-center items-center w-full h-full">
            <div>
              <svg
                className="w-[100px] font-extrabold opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            </div>
            <div>
              <p className="text-[40px] font-extrabold opacity-70">
                Không có sản phẩm
              </p>
            </div>
          </div>
        ) : (
          <div
            className="grid grid-cols-4 w-full p-7 h-full overflow-auto bg-white gap-[30px]"
            ref={scrollProduct}
          >
            {listProduct.map((p) => (
              <div>
                <div
                  onClick={() => {
                    window.localStorage.setItem("IDPP", p._id);
                    Navigate("/PageProduct");
                  }}
                  className="flex flex-col duration-200 w-[450px] ease-linear hover:text-[rgba(83,165,185,1)] hover:shadow-2xl cursor-pointer"
                >
                  <div className="relative overflow-hidden w-[450px] h-[300px]">
                    <div className="absolute flex w-full h-full justify-center items-center">
                      <div>
                        <LazyLoadImage
                          className="h-[300px] w-[450px]"
                          effect="blur"
                          src={
                            "http://localhost:9000/Image/" +
                            p.hinhAnh +
                            "." +
                            p.loaiAnh
                          }
                          alt={p.tenSanPham}
                        ></LazyLoadImage>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <p>{p.tenSanPham}</p>
                  </div>
                  <div className="flex justify-between items-center w-full px-2 pb-2">
                    <div>
                      <p>{Intl.NumberFormat().format(p.giaTien)} VND</p>
                    </div>
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p._id);
                        }}
                        disabled={
                          window.localStorage.getItem("IDS") === p.maCuaHang
                            ? true
                            : false
                        }
                        className={
                          window.localStorage.getItem("IDS") === p.maCuaHang
                            ? "text-white p-2 bg-slate-300"
                            : "bg-[rgba(83,165,185,1)] text-white p-2 border-[rgba(83,165,185,1)] border-[2px] duration-200 ease-linear hover:bg-white hover:text-[rgba(83,165,185,1)]"
                        }
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
