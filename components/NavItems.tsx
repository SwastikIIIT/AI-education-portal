'use client';
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navItems=[
      {label:"Home",href:"/"},
      {label:"Companion",href:"/companions"},
      {label:"My Journey",href:"/my-journey"}
]

const NavItems = () => {
    const pathname=usePathname();
    console.log(pathname);
  return (
      <nav className='flex items-center gap-4'>
          {navItems.map(({label,href})=>(
            <Link href={href} key={label} 
               className={cn(pathname===href && 'text-primary bg-amber-200 font-semibold')}>
             {label}
            </Link>
          ))}
      </nav>
  )
}

export default NavItems