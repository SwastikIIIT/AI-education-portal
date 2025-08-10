'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import NavItems from './NavItems'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <nav className={`sticky top-6 z-50 mx-auto my-6 px-6 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-24'
    }`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center rounded-2xl px-6 py-4 backdrop-blur-md bg-white/70 shadow-[0_0_20px_rgba(0,0,0,0.05)] border border-gray-200">
        <Link href="/">
          <div className='flex items-center gap-2.5 cursor-pointer'>
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={46}
              height={44}
            />
          </div>
        </Link>

        <div className="hidden md:flex"><NavItems/></div>

        <div className='flex items-center gap-4'>
          <SignedOut>
            <SignInButton>
              <button className='flex items-center gap-2 cursor-pointer border border-black text-black bg-white px-4 py-2 rounded-xl font-semibold text-sm hover:bg-black hover:text-white transition'>
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default Navbar