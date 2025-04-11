"use client";
import React, { useState } from "react";

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Black Dashers",
      description: "Men's shoes",
      image: "/img/image.png",
      price: 64,
      quantity: 1,
    },
    {
      id: 2,
      name: "Pink Dashers",
      description: "Women's shoes",
      image: "/img/image.png",
      price: 95,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id, type) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
            ...product,
            quantity:
              type === "increase"
                ? product.quantity + 1
                : Math.max(1, product.quantity - 1),
          }
          : product
      )
    );
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="p-4 flex flex-col gap-3 h-fit ">
      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No products in the cart.
        </div>
      ) : (
        products.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white rounded-xl shadow-md px-5 py-5 flex-wrap gap-5"
          >
            {/* Left: Image + Info */}
            <div className="flex items-center gap-2 md:gap-5">
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full rounded-xl object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[14px] font-medium text-gray-800">
                  {item.name}
                </span>
                <span className="text-xs text-gray-400 font-extralight">
                  {item.description}
                </span>
                <span className="text-sm font-normal mt-1-2 flex flex-row gap-1 text-gray-500"><p className="text-gray-800">price:</p>${item.price}</span>
                <span className="text-sm font-normal mt-1 flex flex-row gap-1 text-gray-500"><p className="text-gray-800">total:</p>${item.price * item.quantity}</span>
              </div>
            </div>

            {/* Right: Quantity + Delete */}
            <div className="flex flex-row items-center justify-between  gap-5 w-full md:w-fit">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.id, "decrease")}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shadow text-lg hover:bg-gray-200"
                >
                  -
                </button>
                <span className="text-sm font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, "increase")}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shadow text-lg hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <img
                onClick={() => handleDelete(item.id)}
                className="text-red-500 text-xs hover:text-red-700 w-[18px] h-[18px]"
                src="/svg/delete-com.svg"
                alt="delete"
              />
            </div>
          </div>
        ))
      )}
      {products.length > 0 && (
        <div className="flex items-center justify-between mt-5">
          <div className="text-right text-[#B6349A] font-semibold text-base flex items-center justify-center gap-2">
            <p className="text-black ">
              Total:
            </p>
            $
            {products.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          </div>
          <button className="text-[#B6349A] text-sm font-medium">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
