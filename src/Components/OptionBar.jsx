import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function OptionBar() {
  const [PathURL, setPathURL] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setPathURL(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <div className="w-full flex justify-between bg-[rgba(214,214,214,0.3)]">
        <div className="w-[20%]">
          <Link to="/">
            <div className="bg-[#717F94] p-[20px] w-full text-center text-white rounded-r-[30px] border-y-[2px] border-r-[2px] border-[#717F94] duration-200 hover:border-white hover:bg-[#86B8D4] ease-linear">
              <p>
                <b>VITOPU MARKET</b>
              </p>
            </div>
          </Link>
        </div>
        <div className="w-[30%]">
          <div className="flex justify-center items-center bg-[#717F94] p-[10px] gap-[50px] rounded-l-[30px] rounded-r-[30px]">
            <div
              className={
                PathURL === "/Notification"
                  ? "py-[5px] px-[10px] bg-white rounded-full duration-200 ease-linear"
                  : "py-[5px] px-[10px] rounded-full duration-200 ease-linear"
              }
            >
              <Link to="/Notification">
                <div>
                  <svg
                    className="w-[50px] h-[50px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill={PathURL === "/Notification" ? "#458FFF" : "#fff"}
                  >
                    <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                  </svg>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/">
                <div
                  className={
                    PathURL === "/"
                      ? "py-[5px] px-[10px] bg-white rounded-full duration-200 ease-linear"
                      : "py-[5px] px-[10px] rounded-full duration-200 ease-linear"
                  }
                >
                  <svg
                    className="w-[50px] h-[50px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill={PathURL === "/" ? "#458FFF" : "#fff"}
                  >
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/Cart">
                <div
                  className={
                    PathURL === "/Cart"
                      ? "py-[5px] px-[10px] bg-white rounded-full duration-200 ease-linear"
                      : "py-[5px] px-[10px] rounded-full duration-200 ease-linear"
                  }
                >
                  <svg
                    className="w-[50px] h-[50px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill={PathURL === "/Cart" ? "#458FFF" : "#fff"}
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[20%]">
          <Link to="/Account">
            <div className="bg-[#717F94] p-[9px] flex justify-center items-center gap-10 text-white rounded-l-[30px] border-y-[2px] border-l-[2px] border-[#717F94] duration-200 hover:border-white hover:bg-[#86B8D4] ease-linear">
              <div>
                <p>
                  <b>Tài khoản</b>
                </p>
              </div>
              <div className="bg-white p-1 rounded-full">
                <svg
                  className="w-[50px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#458FFF"
                >
                  <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}