import React from 'react'
import Title from '../common/Title'
import CommonButton from '../common/CommonButton'
import { MdOutlineArrowOutward } from "react-icons/md";
const Banner = () => {
  return (
    <div className='section-padding-x flex items-center justify-center w-full max-w-[1350px] mx-auto flex-col'>
      <Title level='title56' className='text-center text-Primary mb-6' >Tell Your Story, We’ll Turn It Into a Video.</Title>
      <Title level='title20' className='text-center text-white' >Whether it’s a personal memory, product idea, or creative fiction write it down in 4-5 lines and let our AI do the rest. No editing skills needed. Just write and watch it come to life..</Title>
      <CommonButton link={"/dashboard"} variant='secondary' className='mt-12 rounded-full flex items-center gap-2' >Get Start Now <MdOutlineArrowOutward size={20} /></CommonButton>
    </div>
  )
}

export default Banner
