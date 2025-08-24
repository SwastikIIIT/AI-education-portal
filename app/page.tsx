import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import HeroSections from '@/components/Hero'
import { getAllCompanions, getBookmarks, getRecentSessions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'
import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

export const dynamic = 'force-dynamic'

const Page =async()=>{
   const companions=await getAllCompanions({limit:3});
   const {userId}=await auth();
   const recentSessionsCompanions=await getRecentSessions(4);
   console.log("User",userId);
  
      let userBookmarks:any[]=[];
      if(userId)
      {
         userBookmarks=await getBookmarks(userId);
      }
  
      const bookmarkedIds=new Set(userBookmarks.map(bookmark=>bookmark.id));
  return (
    <>
        <main>
          <HeroSections/>
          <h1 className='text-2xl'>Popular Companions</h1>
          <section className='home-section'>
              {companions.map((companion)=>(
                <CompanionCard
                     key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                    isBookmarked={bookmarkedIds.has(companion.id)}
                  />
              ))}
                {/* <CompanionCard
                  id="2"
                  name="Countsy -The Number Wizard"
                  topic="Derivatives & Integrals"
                  subject="maths"
                  duration={60}
                  color="#e5d0ff"
                />
                <CompanionCard
                  id="3"
                  name="Verba-The Vocabulary Builder"
                  topic="English Liternature"
                  subject="Language"
                  duration={30}
                  color="#bde7ff"
                /> */}
          </section>

          <section className='home-section'>
            {!userId || recentSessionsCompanions.length==0 ?(
                 <div className='w-2/3 max-lg:w-full max-lg:h-[500px] h-[603px]'>
                    <div className='flex flex-col h-full text-gray-600 bg-white/70 rounded-4xl border border-gray-400'>
                      <div className='flex items-center px-6 py-4 border-b border-gray-400'>
                        <h2 className='text-3xl font-semibold text-black'>Recent Sessions</h2>
                      </div>
                      
                      <div className='flex-1 flex items-center justify-center px-6'>
                        <div className='text-center'>
                          <div className='w-25 h-25 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <svg className='w-12 h-12 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path 
                                strokeLinecap='round' 
                                strokeLinejoin='round' 
                                strokeWidth={2} 
                                d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' 
                              />
                            </svg>
                          </div>
                          <p className='text-2xl font-medium mb-3 text-gray-800'>No recent sessions yet</p>
                          <p className='text-base mb-4 max-w-md mx-auto'>
                            Start learning with our AI companions to see your recent sessions here
                          </p>
                            <p className='text-md mt-6'>
                              {!userId ? 'Sign in to track your learning progress' : 'Begin your first session to get started'}
                            </p>
                        </div>
                      </div>
                    </div>
                  </div>                 
               ):
                <CompanionList 
                   title="Recent Sessions"
                   companions={recentSessionsCompanions}
                   classNames="w-2/3 max-lg:w-full "
                />}
              <CTA/>
          </section>
        </main>
    </>
  )
}

export default Page