import React from 'react'
import NavbarStaff from '@/components/NavbarStaff'
import StaffTab from '@/components/Staff/StaffTab'
import { Link } from 'react-router-dom'
import Footer from '@/components/Footer'
import { WithUser } from '@/components/Hoc/WithUser'

const StaffPage = () => {

  return (
    <>
      <div className='w-full h-full bg-slate-100'>
        <div className='fixed pt-12 ml-[3%] z-50'>
          <Link to={'/'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="absolute left-[3%] w-6 h-6 -translate-y-4 text-center">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg></Link>
        </div>
        <NavbarStaff
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />

        <StaffTab />
        <Footer />
      </div>
    </>
  )
}

export default WithUser(StaffPage);
