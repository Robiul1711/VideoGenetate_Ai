import React from 'react'
import CommonButton from '../common/CommonButton'
import { MdOutlineArrowOutward } from 'react-icons/md'
import Title from '../common/Title'
import discover from '@/assets/images/discover.png'
const DiscoverAi = () => {
  return (
    <div className='section-padding-x py-14 '>
            <Title level="title40" className="text-center text-Primary mb-4">
           Discover Our AI-Powered Journey
            </Title>
            <Title level="title20" className="text-center text-white">
          From concept to code, we build intelligent solutions that transform the way businesses operate
            </Title>
      <div className='grid grid-cols-2 md:grid-cols-3 w-full gap-10  mt-26'>
      <div className=' inline space-y-6'>
        <CommonButton variant='secondary' className='rounded-full flex items-center gap-2 border border-Primary bg-Primary/10 text-white hover:text-black' >Our Mission <MdOutlineArrowOutward size={20} /></CommonButton>
        <CommonButton variant='secondary' className='rounded-full flex items-center gap-2 border border-Primary bg-Primary/10 text-white hover:text-black' >Our Vision <MdOutlineArrowOutward size={20} /></CommonButton>
        <CommonButton variant='secondary' className='rounded-full flex items-center gap-2 border border-Primary bg-Primary/10 text-white hover:text-black' >Core Values <MdOutlineArrowOutward size={20} /></CommonButton>
      </div>
      <div className='flex flex-col'>
        <Title  level='title20' className='text-white !font-bold' >We build AI tools that solve real problems.</Title>
        <Title  level='title16' className='text-white py-6' >We build AI tools that solve real problems.</Title>
        <Title  level='title16' className='text-white' >Our mission is to democratize the power of artificial intelligence by creating tools that are not just smart, but also simple to use. We aim to empower individuals and businesses to innovate faster, work smarter, and grow sustainably with the help of AI.</Title>
      </div>
      <div>
        <img src={discover} alt="" />
      </div>

      </div>
    </div>
  )
}

export default DiscoverAi
