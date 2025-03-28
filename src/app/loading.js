import React from 'react'

const Loading  = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center z-50 absolute top-0 left-0 bg-white'>
        <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
        </div>
    </div>
    )
}

export default Loading 