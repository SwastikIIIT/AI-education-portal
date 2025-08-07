import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { Button } from '@/components/ui/button'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <>
        <main>
          <h1 className='text-2xl'>Popular Companions</h1>
          <section className='home-section'>
              <CompanionCard
                  id="1"
                  name="Neura-The Brainy Explorer"
                  topic="Neural Network of Brain"
                  subject="science"
                  duration={45}
                  color="#ffda6e"
                />
                <CompanionCard
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
                />
          </section>

          <section className='home-section'>
              <CompanionList 
                 title="Recent Sessions"
                 companions={recentSessions}
                 classNames="w-2/3 max-lg:w-full "
              />
              <CTA/>
          </section>
        </main>
    </>
  )
}

export default Page