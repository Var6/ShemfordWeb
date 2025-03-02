import Mycard from '@/components/card';
import { title } from '@/components/primitives';
import React from 'react'

const page = () => {
  return (
    <div>
    <h1 className={title()}>Pedagogical Information</h1>
    <div className='flex flex-row'> 
    <Mycard Text='Pedagogical Plan' link='/CBSE/Pedagogical/plan' image='images1.png'/>
    <Mycard Text='Pedagogical Committee' link='/CBSE/Pedagogical/Committee' image='images1.png'/>
    </div>
  </div>
  )
}

export default page
