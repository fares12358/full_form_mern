import React from 'react'

const Loader = () => {
    return (
        <div className='w-full h-full flex items-center justify-center z-50 absolute top-0 left-0 bg-white'>
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>
        </div>
    )
}

export default Loader