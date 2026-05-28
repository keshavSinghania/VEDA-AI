import React from 'react'
import { ArrowLeft, LayoutGrid, Bell, ChevronDown } from 'lucide-react'

function NotFound() {
  return (

    <div 
    className='bg-[#e7e7e7] min-h-screen w-full'
    style={{paddingTop: "10px"}}
    >

      {/* HEADER */}
      <header
       className='bg-white rounded-4xl lg:flex items-center justify-between p-10 shadow-sm hidden '
       style={{padding:"10px"}}
       >

        {/* LEFT */}
        <div className='flex items-center gap-2'>
          <ArrowLeft size={20} />
          <LayoutGrid size={20} />
          <p className='font-medium'>Not Found</p>
        </div>

        {/* RIGHT */}
        <div className='flex items-center gap-4'>

          <Bell size={20} />

          <div className='flex items-center gap-2'>
            <img
              className="rounded-full object-cover"
              src="/profile.jpg"
              width={32}
              height={32}
              alt="Profile"
            />

            <p className='font-medium'>Keshav</p>

            <ChevronDown size={18} />
          </div>

        </div>

      </header>

      {/* MAIN PAGE */}
      <div className='flex items-center justify-center flex-col'>
        <img src="/notfound.png" alt="" />
        <h2 className='text-center'>This page will be available soon.</h2>
      </div>

    </div>
  )
}

export default NotFound