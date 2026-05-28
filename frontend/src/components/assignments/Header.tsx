import { ArrowLeft, Bell, ChevronDown, LayoutGrid } from 'lucide-react'
import React from 'react'

export default function Header() {
  return (
    <>
    <header
        className="bg-white rounded-4xl lg:flex items-center justify-between shadow-sm hidden"
        style={{
          padding: "10px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >

        {/* LEFT */}
        <div className="flex items-center gap-2">

          <ArrowLeft size={20} />

          <LayoutGrid size={20} />

          <p className="font-medium">
            Assignment
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <Bell size={20} />

          <div className="flex items-center gap-2">

            <img
              className="rounded-full object-cover"
              src="/profile.jpg"
              width={32}
              height={32}
              alt="Profile"
            />

            <p className="font-medium">
              Keshav
            </p>

            <ChevronDown size={18} />

          </div>

        </div>

      </header>
    </>
  )
}
