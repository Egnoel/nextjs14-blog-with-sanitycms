import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToogle'

const Navbar = () => {
  return (
    <div className='w-full flex items-center justify-between relative max-w-2xl mx-auto px-4 py-5'>
        <Link href='/' className='font-bold text-3xl'>
            Egnoel<span className='text-primary'>Blog</span>
        </Link>
        <ModeToggle />
    </div>
  )
}

export default Navbar