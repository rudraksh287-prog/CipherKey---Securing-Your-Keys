import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black flex justify-around items-center px-4 h-16 my-4 mx-4 rounded-3xl sticky top-[10px] z-50'>
      <div className="logo font-bold">
        <h1 className="text-4xl text font-bold text-center">
                    <span className="text-green-700">&lt;</span>

                    <span className='text-white'>Cipher</span>
                    <span className="text-green-700">Key/&gt;</span>
                </h1>
      </div>
      <button className='flex justify-center gap-2 items-center '>
        <img className='invert w-8' src="icons/github.svg" alt="" />
        <span className='text-white'>GitHub</span>
      </button>
    </nav>
  )
}

export default Navbar
