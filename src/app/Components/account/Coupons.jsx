import React, { useState } from 'react';

const Coupons = () => {
  // Sample coupons data
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'DISCOUNT20', description: '20% off on your next purchase' },
    { id: 2, code: 'SAVE15', description: 'Save 15% on your first order' },
  ]);

  return (
    <div className="p-6 w-full h-full">
      {coupons.length === 0 ? (
        <div className="text-center text-[10px] md:text-[16px] text-gray-500 w-full h-full flex items-center justify-center">No Coupons Available</div>
      ) : (
        <div>
          <h2 className="text-xl font-normal text-[#B6349A] text-start mb-4">Available Coupons</h2>
          <ul className="space-y-4">
            {coupons.map((coupon) => (
              <li
                key={coupon.id}
                className="flex flex-col gap-5 md:flex-row justify-start md:justify-between items-start md:items-center p-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="font-light text-[15px]">{coupon.code}</h3>
                  <p className="text-gray-500 text-[14px]">{coupon.description}</p>
                </div>
                <button
                  className="px-4 py-2 bg-[#e52cbd] text-white rounded-md hover:bg-[#B6349A] text-[12px]"
                  onClick={() => alert(`Coupon applied: ${coupon.code}`)}
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Coupons;
