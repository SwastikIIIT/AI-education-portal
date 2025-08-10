import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { getAllCompanions, getBookmarks, getRecentSessions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

export const dynamic = 'force-dynamic'

const Page =async()=>{
  const companions=await getAllCompanions({limit:3});
  const recentSessionsCompanions=await getRecentSessions(5);
   const user=await currentUser();
  
      let userBookmarks:any[]=[];
      if(user)
      {
         userBookmarks=await getBookmarks(user?.id);
      }
  
      const bookmarkedIds=new Set(userBookmarks.map(bookmark=>bookmark.id));
  return (
    <>
        <main>
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
                <CompanionList 
                   title="Recent Sessions"
                   companions={recentSessionsCompanions}
                   classNames="w-2/3 max-lg:w-full "
                />
              <CTA/>
          </section>
        </main>
    </>
  )
}

export default Page