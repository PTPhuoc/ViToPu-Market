import React from 'react'

export default function Home() {
  return (
      <div class="flex w-[1424px] ml-5">
        <div class="flex-grow flex flex-col mr-4">
          <div class="flex items-center bg-[#86B8D4] p-2 rounded-t-2xl relative m-4 h-[80px]">
            <input
              type="text"
              class="w-[400px]  p-2 border rounded-xl pl-12"
              placeholder="Tìm kiếm"
            />
            <button class="absolute flex items-center pl-3">
              <img src="./image/magnifying-glass-solid.svg" alt="Search icon" class="w-6 h-6" />
            </button>
          </div>
          <div class="grid grid-cols-2 gap-5 w-[950px] h-[600px] mx-auto">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} class=" bg-white rounded-lg flex flex-col">
                <div class="bg-[#D9D9D9] h-32 mb-2 rounded-md text-center w-full ">Ảnh sản phẩm</div>
                <div class="flex justify-between items-center">
                  <div class="text-lg font-semi text-center">*Tên sản phẩm</div>
                  <div class="text-[#FF7816] text-right text-lg">100,000.00₫</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div class="w-[400px]">
          <div class="flex items-center bg-[#86B8D4] p-2 rounded-t-2xl relative  m-4 h-[80px]">
            <div class="h-full w-full mt-7 text-center text-white font-bold">Sản phẩm tích cực</div>
          </div>
          <div class="grid grid-cols-1 gap-[30px] h-[600px] w-[300px] mx-auto mb-4">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} class=" bg-white rounded-lg ">
                <div class="bg-[#D9D9D9] h-32 mb-2 rounded-md text-center ">Ảnh sản phẩm</div>
                <div class="flex justify-between items-center">
                  <span class="text-yellow-500 font-semibold">⭐ 5</span>
                  <div class="text-[#FF7816] text-right font-bold">100,000 lượt </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}
