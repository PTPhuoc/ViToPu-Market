import React from 'react'

export default function SignUp() {
  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" >
      <div class="bg-[#253133] bg-opacity-70 rounded-lg p-8 w-[1150px] h-[700px] flex flex-col justify-center items-center">
        <div class="text-center mb-8 ">
          <h2 class="text-2xl font-bold text-center  text-white">ĐĂNG KÝ</h2>
          <div class="border-t-8 mt-3 border-[#e5e5e5] rounded-full w-[255px]"></div>
        </div>
        <div class="flex w-full justify-center items-center ml-20">
          {/* Ảnh đại diện */}
          <div class="w-1/3 flex flex-col items-center">
            <div class="relative mb-8">
              <div class="bg-gray-200 rounded-full flex items-center justify-center w-[300px] h-[300px]">
                <img src="./image/circle-user-solid.svg" alt="icon users" class="w-[220px] h-[220px]" />
              </div>
              {/* input file */}
              <div class="absolute bg-white w-[75px] h-[75px] rounded-full flex items-center justify-center right-[-10px] bottom-[-40px]">
                <input type="file" class="absolute  rounded-full opacity-0 cursor-pointer" />
                <img src="./image/camera-solid.svg" alt="camera icon" class="w-[40px] h-[40px]" />
              </div>
            </div>
          </div>
          <div class="w-[10px] h-[500px] bg-[#00D1FF] rounded-full ml-24 "></div>
          {/* Form đăng ký */}
          <div class="w-1/2">
          <form class="space-y-4 flex-col w-[450px] ml-20 ">
            <div>
              <input type="text" placeholder="Họ và tên" class="mt-1 w-full border border-gray-300 rounded-2xl p-2" />
            </div>
            <div class="flex items-center space-x-4 mt-1 text-black">
              <div class="flex justify-center items-center w-[155px] h-[55px] bg-white rounded-2xl">Ngày sinh</div>
              <input type="text" id="birthDateDay" class="w-16 p-2 text-center rounded-full border border-gray-300 " />
              <span class="text-[40px] font-bold text-white ">/</span>
              <input type="text" id="birthDateMonth" class="w-16 p-2 text-center rounded-full border border-gray-300  " />
              <span class="text-[40px] font-bold text-white ">/</span>
              <input type="text" id="birthDateYear" class="w-20 p-2 text-center rounded-full border border-gray-300 " />
            </div>
            <div>
              <input type="text" placeholder="Địa chỉ" class="mt-1 w-full border border-gray-300 rounded-2xl p-2" />
            </div>
            <div>
              <input type="email" placeholder="Email" class="mt-1 w-full border border-gray-300 rounded-2xl p-2" />
            </div>
            <div>
              <input type="password" placeholder="Mật khẩu" class="mt-1 w-full border border-gray-300 rounded-2xl p-2" />
            </div>
            <div>
              <input type="password" placeholder="Xác nhận mật khẩu" class="mt-1 w-full border border-gray-300 rounded-2xl p-2" />
            </div>
            <div class="flex items-center space-x-16 mt-1 text-black">
              <div class="flex justify-center items-center w-[155px] h-[55px] bg-white rounded-2xl">
                Giới tính
              </div>
              <label class="flex justify-center items-center w-[95px] h-[55px] bg-white rounded-2xl cursor-pointer ">
                <input type="radio" name="gender" value="male" class="hidden peer" />
                <span class="peer-checked:bg-blue-500 peer-checked:text-white w-full h-full flex justify-center items-center rounded-2xl">
                  Nam
                </span>
              </label>
              <label class="flex justify-center items-center w-[95px]  h-[55px] bg-white rounded-2xl cursor-pointer">
                <input type="radio" name="gender" value="female" class="hidden peer" />
                <span class="peer-checked:bg-pink-500 peer-checked:text-white w-full h-full flex justify-center items-center rounded-2xl">
                  Nữ
                </span>
              </label>
            </div>
          </form>
          </div>
        </div>
        <div class="text-center  w-[150px] mt-5  ">
          <button type="submit" class="w-full bg-[#458FFF] text-white font-semibold py-2 rounded-3xl ">
            Xác nhận
          </button>
        </div>
      </div>
      <div class="text-center mt-14">
        <a href="/SignIn" class="w-[350px] p-3 bg-[#7CD0FF] text-center rounded-3xl">
          Đăng nhập nếu đã có tài khoản
        </a>
      </div>
    </div>
  )
}
