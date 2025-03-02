import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface Card{
    image:string,
    Text:string,
    link:string,
    className?:string
}
const Mycard = ({image,link,Text,className}:Card) => {
  return (
    <Link href={link}>
    <div className={cn("flex flex-col p-4 rounded-md dark:border-2 m-3 dark:border-neutral-500 justify-center items-center shadow-md hover:shadow-2xl h-40 w-40",className)}>
        <Image width={100} height={10} alt={Text} src={`/assets/${image}`}/>
        <span className='dark:text-blue-600'> {Text} </span>
    </div>
    </Link>
  )
}

export default Mycard
