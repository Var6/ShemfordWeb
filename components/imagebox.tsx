import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
interface imagebox{
    src:String,
    text:String,
    className?:String
}
const Imagebox = ({src, text, className}:imagebox) => {
  return (
    <div className={cn('flex flex-row items-center justify-center text-black dark:text-white rounded-md',className)}>
      <Image width={500} height={500} alt={`${text}`} src={`${src}`}/>
        {text}
    </div>
  )
}

export default Imagebox
