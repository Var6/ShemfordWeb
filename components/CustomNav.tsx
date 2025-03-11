import { cn } from '@/lib/utils'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
interface CustomNavbar{
    className?:string;
    Page?:string;
}
const CustomNav = ({className,Page}:CustomNavbar) => {
  return (
    // bg-gradient-to-br from-orange-600 via-orange-300 
    // to-yellow-600
    <div
    className={cn(
      `flex flex-row w-full items-center justify-end align-baseline fixed z-50 top-0 left-0`,
      className
    )}
  >
    {/* Logo Section */}
    <div className="flex w-1/3">
      <Link href="/" className="flex ml-3 flex-col items-center">
        <Image src="/icon.png" className="scale-75" alt="logo" height={150} width={150} />
        <p className="text-black">Shemford</p>
      </Link>
    </div>
  
    {/* Page Title Section - Aligned to Bottom Left */}
    <div className="w-2/3 flex flex-col items-start justify-end h-full pb-2">
      <div className="text-3xl">
        <span className="text-xl block">Home</span>
        {Page}
      </div>
    </div>
  </div>
  
  
  )
}

export default CustomNav
