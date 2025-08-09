import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

const Page =async()=>{
  const companions=await getAllCompanions({limit:3});
  const recentSessionsCompanions=await getRecentSessions(5);
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