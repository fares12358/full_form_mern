"use client"
import React, { useState } from 'react'

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'T-Shirt',
      image: '/img/image.png',
      price: 20,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Hoodie',
      image: '/img/image.png',
      price: 35,
      quantity: 2,
    },
  ]);
  const handleQuantityChange = (id, type) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
            ...product,
            quantity:
              type === 'increase'
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
    <div className="overflow-x-auto mt-5 md:mt-0">
      <table className="min-w-full bg-white text-sm text-left text-gray-700 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#FDEAFB] text-gray-900 uppercase text-xs">
          <tr className='text-[#B6349A]'>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Total</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="max-w-[150px] md:max-w-[250px] whitespace-normal break-words mr-3">
                  {item.name}
                </span>
              </td>
              <td className="px-6 py-4">${item.price}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 'increase')}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">${item.price * item.quantity}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <img src="/svg/delete-com.svg" alt="delete" className='w-[20px] h-[20px]' />
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No products in the cart.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="text-[#B6349A] md:text-[15px] text-[10px] font-normal my-10">Save Changes</button>
    </div>
  );
};



export default Cart;
