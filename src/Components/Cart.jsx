import React from 'react';

export default function Cart() {
  return (
    <div className="flex items-center justify-center ">
      <div className=" w-[1800px] h-[750px] mt-4 rounded-3xl bg-gray-100 bg-opacity-30">
        <div className="flex justify-between items-center h-[80px] bg-[#86B8D4] text-white rounded-2xl">
          <div className="bg-white rounded-lg px-4 py-2  ml-4 text-2xl text-center font-semibold w-[200px] text-black">
            Tổng tiền
          </div>
          <button className="bg-[#458FFF] rounded-r-2xl w-[125px] h-full">Mua</button>
        </div>

        {/* Cart Items */}
        <div className="grid-container grid grid-cols-1 gap-5 p-6 overflow-y-auto h-[650px] ">
  {Array(6).fill(0).map((_, index) => (
    <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4">
      <div className="flex items-center">
        <div className="w-[312px] h-[190px] bg-[#D9D9D9] rounded-lg mr-4 flex items-center justify-center">
          *Ảnh sản phẩm
        </div>
        <div className="font-semi ml-20">Tên sản phẩm</div>
        <div>
          <div className="flex items-center ml-28">
            <button className="flex bg-[#00D1FF] w-10 h-10 rounded-full"></button>
            <div className="ml-4">Tên cửa hàng</div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-orange-500 font-semibold">x1</div>
        <div className="text-orange-500 font-semibold">100,000.00đ</div>
      </div>
      <button className='mr-16'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-10">
          <path
            d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
            fill="red"
          />
        </svg>
      </button>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}
