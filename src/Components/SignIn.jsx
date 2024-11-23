import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [user, setUser] = useState({
    email: "",
    matKhau: "",
  });

  const changeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const Navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/Client/SignIn", user).then((rs) => {
      if (rs.data.Status === "Not Found") {
        alert("Tài khoản không tồn tại!");
      } else if (rs.data.Status === "Fault") {
        alert("Sai mật khẩu!");
      } else {
        window.localStorage.setItem("ID", rs.data.ID);
        Navigate("/");
      }
    });
  };

  return (
    <div class=" bg-cover bg-center flex items-center justify-center mt-[150px]">
      <div>
        <div class="bg-black bg-opacity-30 p-6 rounded-3xl w-96 items-center">
          <h2 class="text-white font-bold text-center text-2xl mb-6">
            ĐĂNG NHẬP
          </h2>
          <div class="border-t-8 border-[#FFFFFF] mb-8 rounded-full w-[255px] mx-auto"></div>
          <form onSubmit={handleSignIn} class="flex flex-col items-center">
            <div class="mb-4 ">
              <input
                class=" h-[50px] p-3 text-white  rounded-2xl"
                type="email"
                name="email"
                placeholder="Email"
                onChange={changeInput}
              />
            </div>
            <div class="mb-4 ">
              <input
                class=" h-[50px] p-3  rounded-2xl"
                type="password"
                name="matKhau"
                placeholder="Mật khẩu"
                onChange={changeInput}
              />
            </div>
            <div class="mb-6">
              <button
                className="bg-[#458FFF] border-2 border-[#458FFF] text-[25px] text-white rounded-2xl px-3 py-1 duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
                type="submit"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-5 ">
          <div class="text-center mt-4">
            <Link
              to="/SignUp"
              className="bg-[#458FFF] border-2 border-[#458FFF] text-[25px] text-white rounded-2xl px-3 py-1 duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
            >
              Đăng ký nếu chưa có tài khoản
            </Link>
          </div>
          <div class="text-center mt-4">
            <Link
              to="/ForgotPass"
              className="bg-[#458FFF] border-2 border-[#458FFF] text-[25px] text-white rounded-2xl px-3 py-1 duration-200 ease-linear hover:bg-white hover:text-[#458FFF]"
            >
              Quên mật khẩu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
