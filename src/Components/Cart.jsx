import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [isWait, setIsWait] = useState(true);
  const [isWaitAll, setIsWaitAll] = useState(false);
  const [total, setTotal] = useState({
    money: 0,
    quantity: 0,
  });
  const [carts, setCarts] = useState({});

  const Navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    const id = window.localStorage.getItem("ID");
    axios
      .post("http://localhost:9000/GioHang/CartOfUser", { ID: id })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setCarts(rs.data.detailCart);
        }else{
          setCarts({})
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCart = (id, idp) => {
    axios
      .post("http://localhost:9000/GioHang/DeleteCart", {
        maKhachHang: id,
        maSanPham: idp,
      })
      .then((rs) => {
        console.log(rs.data);
        if (rs.data.Status === "Success") {
          setIsWait(true);
          getCart();
        } else {
          alert("Something Wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (carts.length > 0) {
      const detailTotal = carts.reduce(
        (acc, item) => {
          acc.giaTien += item.giaTien * item.soLuong;
          acc.soLuong += item.soLuong;
          return acc;
        },
        { giaTien: 0, soLuong: 0 }
      );
      setTotal({
        money: detailTotal.giaTien,
        quantity: detailTotal.soLuong,
      });
      setIsWait(false);
    } else {
      setTimeout(() => {
        setIsWait(false);
      }, [3000]);
    }
  }, [carts]);

  const handleBuyCart = async () => {
    setIsWaitAll(true);
    const CurrenDay = new Date();
    const requests = carts.map((cart) =>
      axios.post("http://localhost:9000/LichSu/AddToHistory", {
        maKhachHang: cart.maKhachHang,
        maSanPham: cart.maSanPham,
        ngayMua: CurrenDay,
        soLuong: cart.soLuong,
        giaTien: cart.giaTien,
      })
    );
    await Promise.all(requests);
    setIsWaitAll(false);
    getCart()
  };

  return (
    <>
      {isWaitAll ? (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-[rgba(255,255,255,1)]">
          <div>
            <span className="loader"></span>
          </div>
          <div>
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <div class="flex items-center justify-center w-full bg-gradient-cloud">
          <div className="flex flex-col w-full p-10">
            <div className="flex items-center justify-between w-full bg-slate-300 p-3">
              <div className="flex gap-5">
                <div className="px-4 py-2 bg-white">
                  <p>
                    Tổng tiền: {Intl.NumberFormat().format(total.money)} VND
                  </p>
                </div>
                <div className="px-4 py-2 bg-white">
                  <p>Tổng sản phẩm: {total.quantity}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={handleBuyCart}
                  className="bg-[#458FFF] border-2 border-[#458FFF] text-white px-5 py-2 duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
                >
                  Mua
                </button>
              </div>
            </div>
            <div className="flex items-center gap-5 bg-slate-100 p-3">
              <div className="w-[400px] text-center max-xl:hidden">
                <p>Hình ảnh</p>
              </div>
              <div className="w-[200px] text-center">
                <p>Sản phẩm</p>
              </div>
              <div className="w-[200px] text-center max-2xl:hidden">
                <p>Cửa hàng</p>
              </div>
              <div className="w-[200px] text-center">
                <p>Giá tiền</p>
              </div>
              <div className="w-[150px] text-center">
                <p>Số lượng</p>
              </div>
            </div>
            {isWait ? (
              <div className="w-full h-[620px] flex flex-col justify-center items-center bg-[rgba(255,255,255,1)]">
                <div>
                  <span className="loader"></span>
                </div>
                <div>
                  <p>Loading...</p>
                </div>
              </div>
            ) : carts.length > 0 ? (
              <div className="flex flex-col gap-3 bg-slate-200 p-3 h-[620px] overflow-auto">
                {carts.map((e) => (
                  <div className="w-full bg-slate-100">
                    <button
                      onClick={() => {
                        window.localStorage.setItem("IDPP", e.maSanPham);
                        Navigate("/PageProduct");
                      }}
                      className="w-full flex items-center bg-white duration-200 ease-linear shadow-none hover:shadow-default"
                    >
                      <div className="flex items-center gap-5 ">
                        <div className="w-[400px] h-[250px] max-xl:hidden">
                          <img
                            className="w-[400px] h-[250px]"
                            src={
                              "http://localhost:9000/Image/" +
                              e.hinhAnh +
                              "." +
                              e.loaiAnh
                            }
                            alt={e.tenSanPham}
                          />
                        </div>
                        <div>
                          <p className="w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                            {e.tenSanPham}
                          </p>
                        </div>
                        <div className="max-2xl:hidden">
                          <p className="w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                            {e.tenCuaHang}
                          </p>
                        </div>
                        <div>
                          <p className="w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                            {Intl.NumberFormat().format(e.giaTien) + " VND"}
                          </p>
                        </div>
                        <div>
                          <p className="w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                            {e.soLuong}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 flex-grow">
                        <button
                          onClick={(p) => {
                            p.stopPropagation();
                            deleteCart(e.maKhachHang, e.maSanPham);
                          }}
                          className="w-[40px] h-[40px]"
                        >
                          <svg
                            className="w-[40px] h-[40px] fill-red-500 stroke-[20px] stroke-red-500 duration-200 ease-linear hover:fill-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </button>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-[620px] flex flex-col justify-center items-center bg-white">
              <div>
                <svg className="w-[100px] h-[100px] fill-slate-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48l45.5 0c3.8 0 7.1 2.7 7.9 6.5l51.6 271c6.5 34 36.2 58.5 70.7 58.5L488 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-288.3 0c-11.5 0-21.4-8.2-23.6-19.5L170.7 288l288.5 0c32.6 0 61.1-21.8 69.5-53.3l41-152.3C576.6 57 557.4 32 531.1 32L360 32l0 102.1 23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-64 64c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23L312 32 120.1 32C111 12.8 91.6 0 69.5 0L24 0zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z" />
                </svg>
              </div>
              <div>
                <p className="font-extrabold text-slate-300">Giỏ trống nè, hãy mua gì đó nào!</p>
              </div>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
