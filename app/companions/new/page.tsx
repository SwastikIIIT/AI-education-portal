import CompanionForm from '@/components/CompanionForm';
import { companionPermissions} from '@/lib/actions/companion.action';
import { auth } from '@clerk/nextjs/server';
import { Star, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { Metadata } from 'next';

export const metadata:Metadata= {
  title: "Create Your AI Companion – Intelli Learn",
  description: "Design and personalize your own AI tutor with Intelli Learn. Choose its subject, style, and personality to match your learning needs.",
}


const NewCompanion = async() => {
  const {userId} = await auth();
  if(!userId) redirect('/sign-in');

  const flag = await companionPermissions();

  return (
    <main className='bg-transparent'>
      <div className='container mx-auto px-6 max-w-4xl'>
        {flag.allowed ? (
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>

            <div className='bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white'>
              <div className='flex items-center justify-between'>
               
                <div>
                  <h1 className='text-3xl font-bold mb-2'>Companion Builder</h1>
                  <p className='text-blue-100 opacity-90'>{flag.message}</p>
                </div>

                <div className='max-md:hidden'>
                  <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center'>
                    <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/>
                    </svg>
                  </div>
                </div>

              </div>
            </div>

           
            <div className='p-8'>
              <div className='mb-6'>
                <div className='flex items-center gap-2 text-gray-600 mb-2'>
                  <div className='w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse'></div>
                  <span className='text-md font-medium'>Ready to create</span>
                </div>
                <p className='text-gray-500 text-md'>Design and customize your AI companion with unique personality traits.</p>
              </div>
              
              <CompanionForm/> 
            </div>
          </div>
        ) : (
          <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-w-xl mx-auto'>

            <div className='text-center p-8'>
              <div className='mb-6 flex justify-center'>
                <div>
                  <Image 
                    src='/images/limit.svg'
                    alt="Subjects & Topics" 
                    width={360} 
                    height={250}
                  />
                </div>
              </div>

              <div className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-md'>
                <StarIcon/>
                Unlock Premium Access
              </div>

              <h1 className='text-2xl font-bold text-gray-800 mb-3'>You've Reached Your Limit</h1>

              <p className='text-gray-600 mb-8 leading-relaxed'>{flag.message}</p>

              <Link 
                href='/subscription' 
                className='inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl w-full'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
                Upgrade Your Plan
              </Link>
            </div>

            <div className='h-1 bg-gradient-to-r from-blue-200 via-purple-500 to-pink-200'></div>
          </div>
        )}   
      </div>
    </main>
  )
}

export default NewCompanion;