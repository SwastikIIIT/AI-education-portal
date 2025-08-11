import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { getBookmarks, getUserCompanions, getUserSessions } from '@/lib/actions/companion.action';
import Image from 'next/image';
import CompanionList from '@/components/CompanionList';
import type { Metadata } from "next";
import Graph from '@/components/Graph';

export async function generateMetadata(): Promise<Metadata> {
  const user = await currentUser();
  const appName = "Intelli Learn";

  return {
    title: user?.firstName ? `${appName} | ${user.firstName}` : appName,
    description: "Personalized AI education platform"
  };
}
const Profile = async() => {
  const user = await currentUser();
  if(!user) redirect('/sign-in');

  const userCompanions = await getUserCompanions(user.id);
  const userSessions = await getUserSessions(user.id);
  const bookmarks = await getBookmarks(user.id);

  return (
    <main className='max-w-5xl mx-auto p-6 space-y-8'>
      <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-8'>
        <div className='flex flex-col lg:flex-row gap-8 items-center lg:items-start'>
          
          <div className='flex flex-col sm:flex-row gap-6 items-center flex-1'>
            <div className='relative'>
              <Image 
                src={user.imageUrl} 
                alt={user.firstName} 
                width={120} 
                height={120} 
                className='rounded-2xl shadow-lg'
              />
              <div className='absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-lg'></div>
            </div>
            
            <div className='text-center sm:text-left space-y-2'>
              <h1 className='text-3xl font-bold text-gray-900'>
                {user.firstName} {user.lastName}
              </h1>
              <p className='text-gray-600 text-lg'>
                {user.emailAddresses[0].emailAddress}
              </p>
              <div className='inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mt-3'>
                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                </svg>
                Active Learner
              </div>
            </div>
          </div>

          <div className='flex gap-4'>
            <div className='bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg min-w-[120px]'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='bg-white/20 p-2 rounded-lg'>
                  <Image src='/icons/check.svg' alt='checkmark' width={20} height={20} className='brightness-0 invert'/>
                </div>
                <span className='text-2xl font-bold'>{userSessions.length}</span>
              </div>
              <p className='text-blue-100 text-sm font-medium'>Lessons Completed</p>
            </div>

            <div className='bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 shadow-lg min-w-[120px]'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='bg-white/20 p-2 rounded-lg'>
                  <Image src='/icons/cap.svg' alt='cap' width={20} height={20} className='brightness-0 invert'/>
                </div>
                <span className='text-2xl font-bold'>{userCompanions.length}</span>
              </div>
              <p className='text-purple-100 text-sm font-medium'>Companions Created</p>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.05)] border border-white/20'>
        <h2 className='text-xl font-bold text-gray-900 mb-4'>Learning Progress</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100'>
            <div className='text-2xl font-bold text-green-600'>{bookmarks.length}</div>
            <div className='text-sm text-green-700 font-medium'>Bookmarked</div>
          </div>
          <div className='text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100'>
            <div className='text-2xl font-bold text-orange-600'>{userSessions.length}</div>
            <div className='text-sm text-orange-700 font-medium'>Sessions</div>
          </div>
          <div className='text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'>
            <div className='text-2xl font-bold text-blue-600'>{userCompanions.length}</div>
            <div className='text-sm text-blue-700 font-medium'>Created</div>
          </div>
        </div>
      </div>


      <div className='bg-white/70 backdrop-blur-sm rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.05)] border border-white/20 overflow-hidden'>
        <Accordion type="multiple" className='w-full'>
          
         <AccordionItem value="monthly_progress" className='border-b border-gray-100 last:border-b-0'>
           <span className='absolute top-7 left-[275px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold'>
                    PRO
            </span>
          <AccordionTrigger className='px-8 py-6 hover:bg-gray-50/50 text-left'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center shadow-sm'>
                <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd'/>
                </svg>
              </div>
              <div>
                <div className='flex items-center gap-3'>
                  <h3 className='font-bold text-xl text-gray-900'>Monthly Progress</h3>
                 
                </div>
                <p className='text-sm text-gray-500'>Check your journey</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='px-8 pb-6'>
              <Graph/>
          </AccordionContent>
        </AccordionItem>

          <AccordionItem value="bookmarks" className='border-b border-gray-100 last:border-b-0'>
            <AccordionTrigger className='px-8 py-6 hover:bg-gray-50/50 text-left'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-sm'>
                  <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z'/>
                  </svg>
                </div>
                <div>
                  <h3 className='font-bold text-xl text-gray-900'>My Bookmarks</h3>
                  <p className='text-sm text-gray-500'>{bookmarks.length} saved companions</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-8 pb-6'>
              <CompanionList 
                title='Bookmarks'
                companions={bookmarks}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="recent" className='border-b border-gray-100 last:border-b-0'>
            <AccordionTrigger className='px-8 py-6 hover:bg-gray-50/50 text-left'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-sm'>
                  <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd'/>
                  </svg>
                </div>
                <div>
                  <h3 className='font-bold text-xl text-gray-900'>Recent Sessions</h3>
                  <p className='text-sm text-gray-500'>Your learning history</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-8 pb-6'>
              <CompanionList 
                title='My Session History'
                companions={userSessions}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="companions" className='border-b border-gray-100 last:border-b-0'>
            <AccordionTrigger className='px-8 py-6 hover:bg-gray-50/50 text-left'>
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center shadow-sm'>
                  <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z'/>
                  </svg>
                </div>
                <div>
                  <h3 className='font-bold text-xl text-gray-900'>My Companions</h3>
                  <p className='text-sm text-gray-500'>{userCompanions.length} AI tutors created</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-8 pb-6'>
              <CompanionList 
                title='Companions'
                companions={userCompanions}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  )
}

export default Profile