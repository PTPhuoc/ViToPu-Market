import React from 'react';

export default function Home() {
  return (
    <div class="flex w-[1424px] ml-64">
      <div class="flex-grow flex flex-col mr-4  rounded-2xl">
        <div class="flex items-center bg-[#86B8D4] p-2 rounded-t-2xl relative h-[80px]">
          <input type="text" class="w-[400px] p-2 border rounded-xl pl-12" />
          <button class="absolute flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </button>
        </div>
        <div class="bg-white bg-opacity-30 flex items-center justify-center">
        <div class="grid-container grid grid-cols-2 gap-5 w-[950px] h-[600px] mt-4 overflow-y-auto">
          {Array(20).fill(0).map((_, index) => (
            <div key={index} class="bg-white rounded-lg flex flex-col">
              <button class="bg-[#D9D9D9] h-32 mb-2 rounded-md text-center w-full flex justify-center items-center">Ảnh sản phẩm</button>
              <div class="flex justify-between items-center">
                <div class="text-lg font-semi text-center">*Tên sản phẩm</div>
                <div class="text-[#FF7816] text-right text-lg">100,000.00₫</div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      <div class="w-[400px] h-[600px] rounded-2xl">
        <div class="flex items-center bg-[#86B8D4] p-2 rounded-t-2xl relative h-[80px]">
          <div class="h-full w-full mt-7 text-center text-white font-bold">Sản phẩm tích cực</div>
        </div>
        <div class="bg-white bg-opacity-30 flex items-center justify-center">
        <div class="grid-container grid grid-cols-1 gap-[30px] h-[600px] w-[300px] mt-4 overflow-y-auto">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} class="bg-white rounded-lg p-4">
              <button class="bg-[#D9D9D9] h-32 mb-2 rounded-md text-center w-full flex justify-center items-center">Ảnh sản phẩm</button>
              <div class="flex justify-between items-center">
                <span class="text-yellow-500 font-semibold">⭐ 5</span>
                <div class="text-[#FF7816] text-right font-bold">100,000 lượt</div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
