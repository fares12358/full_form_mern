import React from 'react'

const Addresses = () => {
  return (
    <div className='w-full h-full flex flex-col items-start justify-start p-1 md:p-5 gap-5 overflow-auto'>
      <h3 className='md:text-2xl'>My Addresses</h3>
      {
        [...Array(20)].map((_, i) => (

          <div key={i} className="h-fit w-full border border-[#F0EEF0] rounded-xl p-5 flex items-center justify-start gap-5">

            <label className="border-2 border-[#B6349A] rounded-full p-1 flex items-center self-start md:self-center cursor-pointer">
              <input type="radio" name="address" id="" className='peer hidden' />
              <div className="md:h-3 h-[3px] w-[3px] md:w-3 rounded-full peer-checked:border-[#B6349A] peer-checked:bg-[#B6349A] transition-colors"></div>
            </label>

            <div className="flex flex-col items-start">
              <h4 className='md:text-xl text-[16px] font-medium'>Home</h4>
              <p className='text-[#9C939D] font-light  text-[10px] md:text-[14px] max-w-full'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium ad ducimus corrupti iure fugiat saepe molestias ut odio autem deserunt!</p>
            </div>

            <div className="md:text-[15px] text-[8px] font-medium text-[#B6349A] ml-auto cursor-pointer self-start md:self-center">Edit</div>
          </div>
        ))
      }

      <div className="text-[14px] font-medium text-[#B6349A] cursor-pointer mb-10">Add address</div>
    </div >
  )
}

export default Addresses