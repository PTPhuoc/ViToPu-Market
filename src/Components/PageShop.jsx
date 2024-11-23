import axios from "axios";
import { UserContext } from "../Data/User";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PageShop() {
  // eslint-disable-next-line no-unused-vars
  const { user, inforUser, shop, checkShop, shopPreview, inforShop } =
    useContext(UserContext);
  const [isWait, setIsWait] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [listProduct, setListProduct] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState({
    id: "",
    name: "",
  });
  const [isOwner] = useState(
    window.localStorage.getItem("IDS") === window.localStorage.getItem("IDSP")
  );
  const [product, setProduct] = useState({
    id: "",
    tenSanPham: "",
    moTa: "",
    giaTien: 0,
    maCuaHang: "",
    loaiAnh: "",
  });
  const inputFile = useRef(null);

  const takeListProduct = () => {
    const IDSP = window.localStorage.getItem("IDSP");
    axios
      .post("http://localhost:9000/SanPham/ProductOfShop", { IDSP: IDSP })
      .then((rs) => {
        if (rs.data.Status !== "Not Found") {
          setListProduct(rs.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Navigate = useNavigate();

  useEffect(() => {
    inforShop();
    takeListProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shopPreview._id) {
      setIsWait(false);
      if (isOwner) {
        setProduct({
          ...product,
          maCuaHang: shopPreview._id,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopPreview]);

  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      setSelectedImage(file);
      setProduct({ ...product, loaiAnh: fileExtension });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickInput = (e) => {
    e.preventDefault();
    inputFile.current.click();
  };

  const handleSetInput = (p) => {
    setProduct({
      tenSanPham: p.tenSanPham,
      giaTien: p.giaTien,
      moTa: p.moTa,
      maCuaHang: p.maCuaHang,
      loaiAnh: p.loaiAnh,
      id: p._id,
    });
    const imageUrl = `http://localhost:9000/Image/${p.hinhAnh}.${p.loaiAnh}`;
    setImagePreview(imageUrl);
    axios
      .get(imageUrl, { responseType: "blob" })
      .then((response) => {
        const file = new File([response.data], `${p.hinhAnh}.${p.loaiAnh}`, {
          type: response.data.type,
        });
        setSelectedImage(file);
      })
      .catch((error) => {
        console.error("Error setting selected image:", error);
      });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("DataImage", selectedImage);
    fd.append("tenSanPham", product.tenSanPham);
    fd.append("maCuaHang", product.maCuaHang);
    fd.append("moTa", product.moTa);
    fd.append("giaTien", product.giaTien);
    fd.append("loaiAnh", product.loaiAnh);
    axios
      .post("http://localhost:9000/SanPham/AddProduct", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((rs) => {
        setProduct({
          tenSanPham: "",
          moTa: "",
          giaTien: 0,
          maCuaHang: "",
          loaiAnh: "",
        });
        setSelectedImage(null);
        setImagePreview("");
        if (inputFile.current) {
          inputFile.current.value = null;
        }
        window.localStorage.setItem("IDP", rs.data.IDP);
        setListProduct([]);
        takeListProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("DataImage", selectedImage);
    fd.append("tenSanPham", product.tenSanPham);
    fd.append("id", product.id);
    fd.append("moTa", product.moTa);
    fd.append("giaTien", product.giaTien);
    fd.append("loaiAnh", product.loaiAnh);
    axios
      .post("http://localhost:9000/SanPham/UpdateProduct", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((rs) => {
        setIsUpdate(false);
        setProduct({
          tenSanPham: "",
          moTa: "",
          giaTien: 0,
          id: "",
          loaiAnh: "",
        });
        setSelectedImage(null);
        setImagePreview("");
        if (inputFile.current) {
          inputFile.current.value = null;
        }
        window.localStorage.setItem("IDP", rs.data.IDP);
        setListProduct([]);
        takeListProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProduct = () => {
    axios
      .post("http://localhost:9000/SanPham/DeleteProduct", {
        IDP: deleteProduct.id,
      })
      .then((rs) => {
        if (rs.data.Status === "Success") {
          setListProduct([]);
          takeListProduct();
          setIsSubmit(false);
        } else {
          alert("Xóa tất bại");
        }
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
          <div className="w-full flex items-center justify-center bg-gradient-cloud">
            <div className="relative w-full h-[500px] overflow-hidden">
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                src={
                  "http://localhost:9000/Image/" +
                  shopPreview.hinhAnh +
                  "." +
                  shopPreview.loaiAnh
                }
                alt={shopPreview.tenCuaHang}
              />

              <div className="absolute flex flex-col justify-center items-center top-0 w-full h-full">
                <div className="flex flex-col w-[70%] h-[400px] justify-center items-center gap-3 bg-[rgba(255,255,255,0.4)] rounded-xl">
                  <div>
                    <p className="text-[35px] font-bold">CỬA HÀNG</p>
                  </div>
                  <div className="w-[50%] h-1 bg-slate-500 rounded-xl"></div>
                  <div>
                    <p className="text-[50px] font-serif py-5">
                      {shopPreview.tenCuaHang}
                    </p>
                  </div>
                  <div className="w-[50%] h-1 bg-slate-500 rounded-xl"></div>
                  <div>
                    <p>Địa Chỉ: {shopPreview.diaChi}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isOwner ? (
            <div className="w-full flex justify-center items-center bg-cyan-200">
              <div className="w-[80%]">
                <form
                  className="flex w-full"
                  onSubmit={isUpdate ? handleUpdateProduct : handleAddProduct}
                >
                  <div className="h-[400px]">
                    <button
                      type="button"
                      className="w-[500px] h-[400px]"
                      onClick={handleClickInput}
                    >
                      <img
                        className="object-cover"
                        src={imagePreview ? imagePreview : "/Image/Product.jpg"}
                        alt=""
                      />
                    </button>
                    <input
                      ref={inputFile}
                      onChange={handleImageChange}
                      type="file"
                      className="hidden"
                    ></input>
                  </div>
                  <div className="flex flex-col flex-grow gap-3 justify-center items-center">
                    <div>
                      <input
                        onChange={ChangeInput}
                        required
                        name="tenSanPham"
                        value={product.tenSanPham}
                        placeholder="Tên sản phẩm"
                        className="px-4 py-3 w-[450px] rounded-xl"
                        type="text"
                      />
                    </div>
                    <div>
                      <input
                        onChange={ChangeInput}
                        required
                        value={product.giaTien}
                        name="giaTien"
                        placeholder="Giá tiền"
                        className="px-4 py-3 w-[450px] rounded-xl"
                        type="number"
                      />
                    </div>
                    <div>
                      <textarea
                        onChange={ChangeInput}
                        required
                        placeholder="Mô tả"
                        value={product.moTa}
                        className="resize-none px-4 py-3 w-[450px] h-[150px] outline-none rounded-xl"
                        name="moTa"
                      ></textarea>
                    </div>
                    {isUpdate ? (
                      <div className="flex gap-5 justify-center items-center">
                        <div>
                          <button
                            type="submit"
                            className="bg-[#458FFF] border-2 border-[#458FFF] text-[25px] text-white rounded-2xl px-3 py-1 duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
                          >
                            Xác nhận
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsUpdate(false);
                              setProduct({
                                tenSanPham: "",
                                moTa: "",
                                giaTien: 0,
                                id: "",
                                loaiAnh: "",
                              });
                              setSelectedImage(null);
                              setImagePreview("");
                              if (inputFile.current) {
                                inputFile.current.value = null;
                              }
                            }}
                            className="bg-red-500 border-2 border-red-500 text-[25px] text-white rounded-2xl px-3 py-1 duration-200 ease-linear hover:bg-white hover:text-red-500"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="submit"
                          className="bg-[#458FFF] border-2 border-[#458FFF] text-[25px] text-white rounded-2xl px-3 py-1 duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
                        >
                          Thêm Sản Phẩm
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="w-full bg-[#29c6c0] p-5 text-white">
            <p>Sản phẩm của cửa hàng</p>
          </div>
          {listProduct.length === 0 ? (
            <div className="flex flex-col gap-10 justify-center items-center w-full bg-[#c2fffd] h-[760px]">
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
            <div className="bg-[#69b0af] w-full h-[760px] p-5 relative">
              {isUpdate ? (
                <div className="absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.7)] z-20"></div>
              ) : (
                <></>
              )}
              <div className="grid grid-cols-4 gap-5 justify-center w-full h-full overflow-auto">
                {listProduct.map((p) => (
                  <div className="w-full">
                    <button
                      onClick={() => {
                        window.localStorage.setItem("IDPP", p._id);
                        Navigate("/PageProduct");
                      }}
                      className="relative flex flex-col shadow-none bg-transparent duration-200 ease-linear text-white border-2 border-white hover:bg-white hover:border-transparent hover:shadow-default hover:text-slate-600"
                    >
                      <div className="flex justify-center items-center w-full h-[300px]">
                        <div>
                          <img
                            className="w-[450px] h-[300px] object-fill"
                            src={
                              "http://localhost:9000/Image/" +
                              p.hinhAnh +
                              "." +
                              p.loaiAnh
                            }
                            alt={p.tenSanPham}
                          ></img>
                        </div>
                      </div>
                      <div className="p-3">
                        <p>{p.tenSanPham}</p>
                      </div>
                      <div className="flex items-center w-full justify-between p-3">
                        <div>
                          <p>{p.giaTien} VND</p>
                        </div>
                        {isOwner ? (
                          <></>
                        ) : (
                          <div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(p._id);
                              }}
                              className="bg-[rgba(83,165,185,1)] text-white p-2 border-[rgba(83,165,185,1)] border-[2px] duration-200 ease-linear hover:bg-white hover:text-[rgba(83,165,185,1)]"
                            >
                              Thêm
                            </button>
                          </div>
                        )}
                      </div>
                      {isOwner ? (
                        <div className="absolute top-0 right-0 m-3 flex gap-5">
                          <div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetInput(p);
                                setIsUpdate(true);
                              }}
                            >
                              <svg
                                className="w-[40px] h-[40px] fill-sky-500 stroke-[20px] stroke-sky-500 duration-200 ease-linear hover:fill-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                              </svg>
                            </button>
                          </div>
                          <div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteProduct({
                                  id: p._id,
                                  name: p.tenSanPham,
                                });
                                setIsSubmit(true);
                              }}
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
                        </div>
                      ) : (
                        <></>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {isSubmit ? (
        <div className="w-full h-screen bg-[rgba(255,255,255,0.7)] fixed top-0 flex justify-center items-center">
          <div className="flex flex-col w-[500px] bg-slate-200 border-2 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center p-3 bg-white">
              <div>
                <p className="font-bold">Xóa sản phẩm</p>
              </div>
              <div className="w-[50px] h-[50px]">
                <button
                  className="bg-transparent fill-black duration-200 ease-linear hover:bg-slate-400 hover:fill-white"
                  onClick={() => {
                    setIsSubmit(false);
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
            <div className="flex bg-white flex-col justify-center items-center">
              <div className="py-20 text-center w-full bg-slate-100">
                <p>
                  Bạn có chắc muốn xóa<br></br>
                  {deleteProduct.name}
                </p>
              </div>

              <div className="p-3">
                <button
                  onClick={handleDeleteProduct}
                  className="bg-red-400 border-2  border-red-400 text-[25px] text-white rounded-2xl px-3 py-1 duration-200 ease-linear hover:bg-white hover:text-red-400"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
