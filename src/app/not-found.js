import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full h-[calc(100%-104px)] lg:h-[calc(100%-80px)] bg-white flex flex-col gap-5 items-center justify-center font-bold uppercase lg:text-2xl text-md'>
      <img src='/svg/not-found-com.svg' alt='not found' className='w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]'/>
      <h3>
        404 not-found
      </h3>
    </div>
  )
}

export default NotFound