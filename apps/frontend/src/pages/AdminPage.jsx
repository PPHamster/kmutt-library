import React from 'react'
import NavbarAdmin from '@/components/NavbarAdmin'
import Footer from '@/components/Footer'
import UserManage from '@/components/Admin/UserManage'
import { WithUser } from '@/components/Hoc/WithUser'

function AdminPage () {

  return (
    <>
      <div className='w-full h-full bg-slate-100'>
        <NavbarAdmin
          bgcolor='bg-white hover:drop-shadow-md'
          textcolor='text-black'
        />
        <UserManage />
        <Footer />
      </div>
    </>
  )
}

export default WithUser(AdminPage);
