/* eslint-disable no-unused-vars */
import axios from "axios";
import { UserContext } from "../Data/User";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PageProduct() {
  const {
    user,
    inforUser,
    shop,
    checkShop,
    shopPreview,
    inforShop,
    product,
    inforProduct,
  } = useContext(UserContext);
  const [isWait, setIsWait] = useState(true);
  const [isWaitComment, setIsWaitComment] = useState(true);
  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState({
    content: "",
    rate: 5,
  });
  const [userComment, setUserComment] = useState({});
  const [filterRate, setFilterRate] = useState(0);
  const Navigate = useNavigate();

  const ID = window.localStorage.getItem("ID");

  useEffect(() => {
    setUserComment({});
    setFilterRate(0);
    inforProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (product._id && window.localStorage.getItem("IDPP") === product._id) {
      inforShop();
      window.localStorage.setItem("IDSP", product.maCuaHang);
      if (ID) {
        checkComment(ID);
        setIsWait(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    if (userComment.length > 0) {
      setIsWaitComment(false);
    } else {
      setTimeout(() => {
        setIsWaitComment(false);
      }, [2000]);
    }
  }, [userComment]);

  useEffect(() => {
    if (filterRate > 0) {
      setUserComment({});
      setIsWaitComment(true);
      filterComment();
    } else {
      if (product._id && window.localStorage.getItem("IDPP") === product._id) {
        getComment();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRate, product]);

  const getComment = () => {
    axios
      .post("http://localhost:9000/DanhGia/GetCommentByProduct", {
        maSanPham: product._id,
      })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setUserComment(rs.data.userComment);
        } else {
          setUserComment({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeComment = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const checkComment = (id) => {
    axios
      .post("http://localhost:9000/DanhGia/CheckComment", {
        maKhachHang: id,
        maSanPham: product._id,
      })
      .then((rs) => {
        setIsComment(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (idp) => {
    const id = window.localStorage.getItem("ID");
    console.log(id);
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

  const filterComment = () => {
    axios
      .post("http://localhost:9000/DanhGia/FilterComment", {
        maSanPham: product._id,
        mucDoDanhGia: filterRate,
      })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setUserComment(rs.data.filterComment);
          setIsWaitComment(false);
        } else {
          setUserComment({});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComment = (e) => {
    e.preventDefault();
    const maCuaHang = window.localStorage.getItem("IDSP");
    const currnetDate = new Date();
    axios
      .post("http://localhost:9000/DanhGia/Comment", {
        maKhachHang: ID,
        maSanPham: product._id,
        ngayDanhGia: currnetDate,
        mucDoDanhGia: comment.rate,
        noiDung: comment.content,
        maCuaHang: maCuaHang,
        tenSanPham: product.tenSanPham,
      })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setIsWaitComment(true);
          setUserComment({});
          checkComment(ID);
          getComment();
        } else {
          alert("Something Wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isWait ? (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-[rgba(255,255,255,1)]">
          <div>
            <span className="loader"></span>
          </div>
          <div>
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <div class="flex flex-col w-full h-full">
          <div className="flex justify-center items-center bg-white ">
            <div className="flex flex-wrap w-[70%] justify-center items-center gap-5 bg-slate-200">
              <div className="p-5">
                <img
                  className="w-[600px] object-fill"
                  src={
                    "http://localhost:9000/Image/" +
                    product.hinhAnh +
                    "." +
                    product.loaiAnh
                  }
                  alt={product.tenSanPham}
                ></img>
              </div>
              <div className="flex flex-col flex-grow justify-center h-full bg-slate-200 gap-[50px] p-10">
                <div className="h-1 w-full bg-slate-500"></div>
                <div>
                  <p className="text-[50px] font-serif text-center">
                    {product.tenSanPham}
                  </p>
                </div>
                <div className="h-1 w-full bg-slate-500"></div>
                <div>
                  <p className="text-orange-400 text-[30px]">
                    {Intl.NumberFormat("vi-VN").format(product.giaTien)} VND
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      addToCart(product._id);
                    }}
                    disabled={
                      window.localStorage.getItem("IDS") === product.maCuaHang
                        ? true
                        : false
                    }
                    className={
                      window.localStorage.getItem("IDS") === product.maCuaHang
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
          <div className="flex w-full bg-slate-300 justify-center items-center">
            <div className="flex w-[80%] justify-between items-center bg-white m-3">
              <div className="ml-3">
                <p className="text-[30px] font-serif">
                  {shopPreview.tenCuaHang}
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    Navigate("/PageShop");
                  }}
                  className="bg-[#458FFF] border-2 border-[#458FFF] text-[25px] text-white px-5 py-2 duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
                >
                  Xem
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full bg-slate-300 justify-center items-center">
            <div className="flex w-[80%] justify-between items-center bg-white m-3">
              <pre className="font-sans p-3 max-h-[200px] overflow-auto w-full text-wrap">
                {product.moTa}
              </pre>
            </div>
          </div>
          <div className="flex w-full bg-slate-300 justify-center items-center">
            <div className="flex flex-col w-[80%] justify-between bg-[#b9fffe] m-3">
              <div className="flex gap-3 items-center">
                <div className="p-3 bg-slate-400">
                  <svg
                    className="w-[30px] h-[30px] fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                  </svg>
                </div>
                <div className="w-[30px] h-[30px]">
                  <button
                    onClick={() => {
                      if (filterRate === 0) {
                        setFilterRate(1);
                      } else {
                        if (filterRate !== 1) {
                          setFilterRate(1);
                        } else {
                          setFilterRate(0);
                        }
                      }
                    }}
                  >
                    <svg
                      className={
                        filterRate >= 1
                          ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                          : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                  </button>
                </div>
                <div className="w-[30px] h-[30px]">
                  <button
                    onClick={() => {
                      if (filterRate === 0) {
                        setFilterRate(2);
                      } else {
                        if (filterRate !== 2) {
                          setFilterRate(2);
                        } else {
                          setFilterRate(0);
                        }
                      }
                    }}
                  >
                    <svg
                      className={
                        filterRate >= 2
                          ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                          : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                  </button>
                </div>
                <div className="w-[30px] h-[30px]">
                  <button
                    onClick={() => {
                      if (filterRate === 0) {
                        setFilterRate(3);
                      } else {
                        if (filterRate !== 3) {
                          setFilterRate(3);
                        } else {
                          setFilterRate(0);
                        }
                      }
                    }}
                  >
                    <svg
                      className={
                        filterRate >= 3
                          ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                          : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                  </button>
                </div>
                <div className="w-[30px] h-[30px]">
                  <button
                    onClick={() => {
                      if (filterRate === 0) {
                        setFilterRate(4);
                      } else {
                        if (filterRate !== 4) {
                          setFilterRate(4);
                        } else {
                          setFilterRate(0);
                        }
                      }
                    }}
                  >
                    <svg
                      className={
                        filterRate >= 4
                          ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                          : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                  </button>
                </div>
                <div className="w-[30px] h-[30px]">
                  <button
                    onClick={() => {
                      if (filterRate === 0) {
                        setFilterRate(5);
                      } else {
                        if (filterRate !== 5) {
                          setFilterRate(5);
                        } else {
                          setFilterRate(0);
                        }
                      }
                    }}
                  >
                    <svg
                      className={
                        filterRate >= 5
                          ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                          : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                  </button>
                </div>
              </div>
              {isComment ? (
                <>
                  <div className="w-full h-1 bg-slate-500"></div>
                  <div className="w-full">
                    <form className="flex" onSubmit={handleComment}>
                      <div className="flex-grow h-[100px]">
                        <textarea
                          required
                          className="resize-none outline-none w-full h-[100px] p-2"
                          name="content"
                          onChange={changeComment}
                          placeholder="Đánh giá sản phẩm"
                        ></textarea>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-100 px-5">
                        <div className="w-[30px] h-[30px]">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setComment({ ...comment, rate: 1 });
                            }}
                          >
                            <svg
                              className={
                                comment.rate >= 1
                                  ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                                  : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                              }
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                            </svg>
                          </button>
                        </div>
                        <div className="w-[30px] h-[30px]">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (comment.rate === 0) {
                                setComment({ ...comment, rate: 2 });
                              } else {
                                if (comment.rate !== 2) {
                                  setComment({ ...comment, rate: 2 });
                                } else {
                                  setComment({ ...comment, rate: 0 });
                                }
                              }
                            }}
                          >
                            <svg
                              className={
                                comment.rate >= 2
                                  ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                                  : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                              }
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                            </svg>
                          </button>
                        </div>
                        <div className="w-[30px] h-[30px]">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (comment.rate === 0) {
                                setComment({ ...comment, rate: 3 });
                              } else {
                                if (comment.rate !== 3) {
                                  setComment({ ...comment, rate: 3 });
                                } else {
                                  setComment({ ...comment, rate: 0 });
                                }
                              }
                            }}
                          >
                            <svg
                              className={
                                comment.rate >= 3
                                  ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                                  : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                              }
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                            </svg>
                          </button>
                        </div>
                        <div className="w-[30px] h-[30px]">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (comment.rate === 0) {
                                setComment({ ...comment, rate: 4 });
                              } else {
                                if (comment.rate !== 4) {
                                  setComment({ ...comment, rate: 4 });
                                } else {
                                  setComment({ ...comment, rate: 0 });
                                }
                              }
                            }}
                          >
                            <svg
                              className={
                                comment.rate >= 4
                                  ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                                  : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                              }
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                            </svg>
                          </button>
                        </div>
                        <div className="w-[30px] h-[30px]">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (comment.rate === 0) {
                                setComment({ ...comment, rate: 5 });
                              } else {
                                if (comment.rate !== 5) {
                                  setComment({ ...comment, rate: 5 });
                                } else {
                                  setComment({ ...comment, rate: 0 });
                                }
                              }
                            }}
                          >
                            <svg
                              className={
                                comment.rate >= 5
                                  ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                                  : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                              }
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="h-full px-3 bg-[#458FFF] text-white duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
                        >
                          Đánh giá
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="w-full h-1 bg-slate-500"></div>
                </>
              ) : (
                <></>
              )}
              {isWaitComment ? (
                <div className="w-full h-[200px] flex flex-col justify-center items-center bg-[rgba(255,255,255,1)]">
                  <div>
                    <span className="loader"></span>
                  </div>
                  <div>
                    <p>Loading...</p>
                  </div>
                </div>
              ) : userComment.length > 0 ? (
                <div className="w-full flex flex-col gap-3 p-3 bg-slate-200">
                  {userComment.map((e) => (
                    <>
                      <ElementComment
                        c={e}
                        getComment={getComment}
                        setIsWaitComment={setIsWaitComment}
                        setUserComment={setUserComment}
                        key={e._id}
                      ></ElementComment>
                    </>
                  ))}
                </div>
              ) : (
                <div className="w-full h-[200px] flex flex-col justify-center items-center bg-[rgba(255,255,255,1)]">
                  <div>
                    <p>Chưa có đánh giá nào cho sản phẩm này</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const ElementComment = ({
  c,
  getComment,
  setIsWaitComment,
  setUserComment,
}) => {
  const [isOption, setIsOption] = useState(false);
  const [isFeedback, setIsFeedback] = useState(false);
  const [isOptionFeedback, setIsOptionFeedback] = useState(false);
  const [isUpdateFeedback, setIsUpdateFeedback] = useState(false);
  const [comment, setComment] = useState({
    content: c.noiDung,
    rate: c.mucDoDanhGia,
  });
  const [feedback, setFeedback] = useState("");
  const ID = window.localStorage.getItem("ID");
  const IDS = window.localStorage.getItem("IDS");
  const IDSP = window.localStorage.getItem("IDSP");

  const getAllDate = (date) => {
    const fullDate = new Date(date);
    return (
      fullDate.getDate() +
      "/" +
      (fullDate.getMonth() + 1) +
      "/" +
      fullDate.getFullYear() +
      ", " +
      fullDate.getHours() +
      ":" +
      fullDate.getMinutes()
    );
  };

  const handleFeedback = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    axios
      .post("http://localhost:9000/PhanHoi/Feedback", {
        maDanhGia: c.maDanhGia,
        maCuaHang: IDS,
        noiDung: feedback,
        ngayPhanHoi: currentDate,
      })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setIsWaitComment(true);
          setUserComment({});
          getComment();
        } else {
          alert("Something Wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderIcons = (count) => {
    const icons = [];
    for (let i = 0; i < count; i++) {
      icons.push(
        <div key={i}>
          <svg
            key={i}
            className="w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </div>
      );
    }
    return icons;
  };

  const handleUpdateComment = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    axios
      .post("http://localhost:9000/DanhGia/UpdateComment", {
        maDanhGia: c.maDanhGia,
        mucDoDanhGia: comment.rate,
        noiDung: comment.content,
        ngayDanhGia: currentDate,
      })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setIsWaitComment(true);
          setIsUpdateFeedback(false);
          setUserComment({});
          getComment();
        } else {
          alert("Something Wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateFeedback = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    axios
      .post("http://localhost:9000/PhanHoi/UpdateFeedback", {
        maDanhGia: c.maDanhGia,
        noiDung: comment.content,
        ngayPhanHoi: currentDate,
      })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setIsWaitComment(true);
          setIsOptionFeedback(false);
          setUserComment({});
          getComment();
        } else {
          alert("Something Wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isUpdateFeedback ? (
        <div className="fixed flex items-center justify-center h-full w-full bg-[rgba(210,238,255,0.7)] top-0 left-0 z-10">
          <form
            onSubmit={
              isOptionFeedback ? handleUpdateFeedback : handleUpdateComment
            }
          >
            <div className="flex flex-col items-center bg-white">
              <div className="flex justify-between w-[600px] items-center p-3 bg-white">
                <div>
                  <p>Chỉnh sửa đánh giá</p>
                </div>
                <div className="w-[50px] h-[50px]">
                  <button
                    className="bg-transparent fill-black duration-200 ease-linear hover:bg-slate-400 hover:fill-white"
                    onClick={() => {
                      setIsUpdateFeedback(false);
                      setIsOptionFeedback(false);
                    }}
                  >
                    <svg
                      className="w-[50px] h-[50px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </button>
                </div>
              </div>
              {isOptionFeedback ? (
                <></>
              ) : (
                <div className="flex gap-3 p-3 bg-[#faffc7] w-full">
                  <div className="w-[30px] h-[30px]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setComment({ ...comment, rate: 1 });
                      }}
                    >
                      <svg
                        className={
                          comment.rate >= 1
                            ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                            : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </button>
                  </div>
                  <div className="w-[30px] h-[30px]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (comment.rate === 0) {
                          setComment({ ...comment, rate: 2 });
                        } else {
                          if (comment.rate !== 2) {
                            setComment({ ...comment, rate: 2 });
                          } else {
                            setComment({ ...comment, rate: 0 });
                          }
                        }
                      }}
                    >
                      <svg
                        className={
                          comment.rate >= 2
                            ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                            : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </button>
                  </div>
                  <div className="w-[30px] h-[30px]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (comment.rate === 0) {
                          setComment({ ...comment, rate: 3 });
                        } else {
                          if (comment.rate !== 3) {
                            setComment({ ...comment, rate: 3 });
                          } else {
                            setComment({ ...comment, rate: 0 });
                          }
                        }
                      }}
                    >
                      <svg
                        className={
                          comment.rate >= 3
                            ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                            : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </button>
                  </div>
                  <div className="w-[30px] h-[30px]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (comment.rate === 0) {
                          setComment({ ...comment, rate: 4 });
                        } else {
                          if (comment.rate !== 4) {
                            setComment({ ...comment, rate: 4 });
                          } else {
                            setComment({ ...comment, rate: 0 });
                          }
                        }
                      }}
                    >
                      <svg
                        className={
                          comment.rate >= 4
                            ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                            : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </button>
                  </div>
                  <div className="w-[30px] h-[30px]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (comment.rate === 0) {
                          setComment({ ...comment, rate: 5 });
                        } else {
                          if (comment.rate !== 5) {
                            setComment({ ...comment, rate: 5 });
                          } else {
                            setComment({ ...comment, rate: 0 });
                          }
                        }
                      }}
                    >
                      <svg
                        className={
                          comment.rate >= 5
                            ? "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-yellow-500 duration-200 ease-linear"
                            : "w-[30px] h-[30px] stroke-[50px] stroke-yellow-500 fill-white duration-200 ease-linear"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              <div className="h-1 w-full bg-slate-300"></div>
              <div className="h-[200px] w-full">
                <textarea
                  className="resize-none w-full outline-none h-[200px] p-3"
                  placeholder="Nhập đánh giá mới"
                  onChange={(e) => {
                    setComment({ ...comment, content: e.target.value });
                  }}
                  value={comment.content}
                ></textarea>
              </div>
              <div className="h-1 w-full bg-slate-300"></div>
              <div>
                <button
                  type="submit"
                  className="h-full px-6 py-1 my-1 border-2 border-[#458FFF] bg-[#458FFF] text-white duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
                >
                  Sửa
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col w-[50%] bg-white">
        <div className="flex justify-between items-center">
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex items-center px-3 py-1 gap-3">
                <div className="w-[60px] h-[60px] flex items-center justify-center rounded-full overflow-hidden">
                  <div>
                    <img
                      src={
                        "http://localhost:9000/Image/" +
                        c.hinhAnh +
                        "." +
                        c.loaiAnh
                      }
                      alt={c.hoVaTen}
                    />
                  </div>
                </div>
                <div>
                  <p>{c.hoVaTen}</p>
                </div>
                {renderIcons(c.mucDoDanhGia)}
              </div>
              <div className="px-3 py-1 text-slate-400">
                <p>{getAllDate(c.ngayDanhGia)}</p>
              </div>
            </div>
          </div>
          <div className="px-3 h-[30px] relative">
            {ID === c._id || IDS === IDSP ? (
              <>
                <button
                  onClick={() => {
                    if (isOption) {
                      setIsOption(false);
                    } else {
                      setIsOption(true);
                    }
                  }}
                  className={
                    "w-[15px] h-[30px] " +
                    (IDS === IDSP && c.phanHoi ? "hidden" : "")
                  }
                >
                  <svg
                    className="w-[15px] h-[30px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 512"
                  >
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                  </svg>
                </button>

                {isOption ? (
                  IDS === IDSP ? (
                    c.phanHoi ? (
                      <></>
                    ) : (
                      <div className="absolute top-0 left-11 -translate-y-2 w-[200px] bg-white flex flex-col">
                        <button
                          onClick={() => {
                            setIsFeedback(true);
                            setIsOption(false);
                          }}
                          className="h-full px-3 py-1 bg-white text-[#458FFF] duration-200 ease-linear hover:bg-[#458FFF] hover:text-white"
                        >
                          Phản hồi
                        </button>
                      </div>
                    )
                  ) : ID === c._id ? (
                    <div className="absolute top-0 left-11 -translate-y-2 w-[200px] bg-white flex flex-col">
                      <button
                        onClick={() => {
                          setIsOption(false);
                          setIsUpdateFeedback(true);
                        }}
                        className="h-full px-3 py-1 bg-white text-[#458FFF] duration-200 ease-linear hover:bg-[#458FFF] hover:text-white"
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="h-1 w-full bg-slate-500"></div>
        <div className="w-full max-h-[300px] overflow-auto p-3">
          <p className="w-full">{c.noiDung}</p>
        </div>
      </div>
      <div
        className={
          isFeedback
            ? "h-[100px] w-[50%] bg-white overflow-hidden duration-200 ease-linear"
            : "h-0 w-0 bg-white overflow-hidden duration-200 ease-linear"
        }
      >
        <form onSubmit={handleFeedback} className="flex w-full h-full">
          <div className="flex-grow">
            <textarea
              required
              className="resize-none w-full h-full outline-none p-1"
              placeholder="Phản hồi"
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <div className="justify-stretch">
            <button
              type="submit"
              className="h-full px-3 bg-[#458FFF] text-white duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
            >
              Phản hồi
            </button>
          </div>
          <div className="justify-stretch">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsFeedback(false);
              }}
              className="h-full px-3 bg-red-400 text-white duration-200 ease-linear hover:bg-white hover:text-red-400"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
      {c.phanHoi ? (
        <div className="flex flex-col w-[50%] ml-[10%] bg-white">
          <div className="flex flex-col relative">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="px-3 py-1">
                  <p>Shop</p>
                </div>
                <div className="px-3 py-1 text-slate-400">
                  <p>{getAllDate(c.phanHoi.ngayPhanHoi)}</p>
                </div>
              </div>
              {IDS === IDSP ? (
                <div className="w-[15px] h-[30px] mr-3 relative">
                  <button
                    onClick={() => {
                      if (isOptionFeedback) {
                        setIsOptionFeedback(false);
                      } else {
                        setIsOptionFeedback(true);
                      }
                    }}
                    className="w-[15px] h-[30px]"
                  >
                    <svg
                      className="w-[15px] h-[30px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 512"
                    >
                      <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                    </svg>
                  </button>
                  {isOptionFeedback ? (
                    <div className="absolute top-0 left-8 -translate-y-2 w-[200px] bg-white flex flex-col">
                      <button
                        onClick={() => {
                          setComment({ rate: 0, content: c.phanHoi.noiDung });
                          setIsUpdateFeedback(true);
                        }}
                        className="h-full px-3 py-1 bg-white text-[#458FFF] duration-200 ease-linear hover:bg-[#458FFF] hover:text-white"
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="absolute top-0 "></div>
          </div>
          <div className="h-1 w-full bg-slate-500"></div>
          <div className="w-full max-h-[300px] overflow-auto p-3">
            <p>{c.phanHoi.noiDung}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
