import React from 'react'

export default function SignIn() {
  return (
    <div class=" bg-cover bg-center  flex items-center justify-center mt-[150px]">
      <div>
        <div class="bg-black bg-opacity-30 p-6 rounded-3xl w-96 items-center">
          <h2 class="text-white font-bold text-center text-2xl mb-6">ĐĂNG NHẬP</h2>
          <div class="border-t-8 border-[#FFFFFF] mb-8 rounded-full w-[255px] mx-auto"></div>
          <form class="flex flex-col items-center">
            <div class="mb-4 ">
              <input
                class=" h-[50px] p-3 text-white  rounded-2xl"
                type="email"
                placeholder="Email"
              />
            </div>
            <div class="mb-4 ">
              <input
                class=" h-[50px] p-3 text-white  rounded-2xl"
                type="password"
                placeholder="Mật khẩu"
              />
            </div>
            <div class="mb-6">
              <button
                class="w-[150px] p-3 bg-[#458FFF] text-white rounded-3xl mt-11 font-bold"
                type="submit"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
        <div class="text-center mt-4">
          <a href="Signup" class="w-[350px] p-3 bg-[#7CD0FF] text-center rounded-3xl ">
            Đăng ký nếu chưa có tài khoản
          </a>
        </div>
      </div>
    </div>
  )
}
