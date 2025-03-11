import Facilities from '@/components/ui/facilities'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='dark:text-white'>
        <Image src={`/assets/whyshemford.jpg`} width={700} height={300} alt='image' className='rounded-lg banner'/>
        <div className='text-3xl bold text-left my-3'>Campus</div>
        <h3 className="text-2xl mb-4 font-semibold text-gray-800 dark:text-white mt-6 text-left">
        Acedmic Facilities
      </h3>
        <div className='flex flex-row w-full '>
        <div className='flex flex-col text-left w-1/2'>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-white ml-4">
        <li>Unique open school design</li>
        <li>Well-equipped, IT-enabled classrooms with multimedia projectors</li>
        <li>State-of-the-art Computer, Physics, Chemistry, Biology, and Mathematics laboratories</li>
        <li>Multipurpose Auditorium</li>
        <li>A modern Centre for Performing Arts</li>
        <li>Special Activity rooms for Art, Music (Western & Indian), Dance, Drama, and Yoga</li>
        <li>Purpose-built play areas for pre-primary and primary</li>
        <li>Sporting Facilities Basketball, Tennis, Table-tennis, Badminton, Cricket, and JudoAstroTurf football field</li>
      </ul>
        </div>
    <div className='w-1/2 flex flex-row text-left'>
      <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-white ">
        <li>Medical Centre with qualified nurses and a doctor</li>
        <li>
          Learning Centre with 38,200 books, 40 journals and magazines, 1600 multimedia (CD/DVD/Audio Cassettes), and 16 online databases
        </li>
        <li>Wi-Fi enabled campus</li>
        <li>Cafeteria: Ultra-modern kitchen and two dining halls</li>
        <li>
          Energy conservation initiatives like LED lighting, air-conditioning timetable, solar-powered water heaters; water conservation efforts; waste-paper management
        </li>
        <li>Safe campus with modern security systems</li>
      </ul>
</div>
</div>
<span className='text-3xl my-3 underline'>
    Facility images will come over here 
    </span>
    <Facilities/>
    </div>
  )
}

export default page
