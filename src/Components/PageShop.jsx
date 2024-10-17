import axios from "axios";
import { UserContext } from "../Data/User";
import { useContext, useState, useEffect, useRef } from "react";

export default function PageShop() {
  // eslint-disable-next-line no-unused-vars
  const { user, inforUser, shop, checkShop, shopPreview, inforShop } =
    useContext(UserContext);
  const [isWait, setIsWait] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [listProduct, setListProduct] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [isOwner] = useState(
    window.localStorage.getItem("IDS") === window.localStorage.getItem("IDSP")
  );
  const [product, setProduct] = useState({
    tenSanPham: "",
    moTa: "",
    giaTien: 0,
    maCuaHang: "",
    loaiAnh: "",
  });
  const inputFile = useRef(null);

  useEffect(() => {
    const IDS = window.localStorage.getItem("IDS");
    inforShop();
    axios
      .post("http://localhost:9000/SanPham/ProductOfShop", { IDS: IDS })
      .then((rs) => {
        if (rs.data.Status !== "Not Found") {
          setListProduct(rs.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shopPreview.maCuaHang) {
      setIsWait(false);
      if (isOwner) {
        setProduct({
          ...product,
          maCuaHang: shopPreview.maCuaHang,
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
        window.localStorage.setItem("IDP", rs.data.IDP);
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
                <form className="flex w-full">
                  <div className="h-[400px]">
                    <button
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
                      required
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
                        placeholder="Tên sản phẩm"
                        className="px-4 py-3 w-[450px] rounded-xl"
                        type="text"
                      />
                    </div>
                    <div>
                      <input
                        onChange={ChangeInput}
                        required
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
                        className="resize-none px-4 py-3 w-[450px] h-[150px] outline-none rounded-xl"
                        name="moTa"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        onSubmit={handleAddProduct}
                        type="submit"
                        className="bg-[#458FFF] border-2 border-[#458FFF] text-[25px] text-white rounded-2xl px-3 py-1 duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
                      >
                        Thêm Sản Phẩm
                      </button>
                    </div>
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
            <div className="bg-[#c2fffd] w-full grid grid-cols-4 justify-center overflow-auto h-[760px] p-5">
              {listProduct.map((p) => (
                <div className="w-full">
                  <button className="relative flex flex-col gap-3 shadow-none bg-transparent duration-200 ease-linear border-2 border-white hover:bg-white hover:border-transparent hover:shadow-default">
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
                    <div className="flex items-center justify-between">
                      <div className="p-3">
                        <p>{p.giaTien} VND</p>
                      </div>
                      {isOwner ? (
                        <></>
                      ) : (
                        <div>
                          <button className="bg-[rgba(83,165,185,1)] text-white p-2 border-[rgba(83,165,185,1)] border-[2px] duration-200 ease-linear hover:bg-white hover:text-[rgba(83,165,185,1)]">
                            Thêm
                          </button>
                        </div>
                      )}
                    </div>
                    {isOwner? <button className="absolute top-0 right-0 m-3">
                      <svg
                      className="w-[50px] h-[50px] fill-red-400 stroke-white stroke-[5px] duration-200 ease-linear hover:fill-white hover:stroke-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </button>: <></>}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
