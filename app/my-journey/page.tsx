import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import { getUserCompanions, getUserSessions } from '@/lib/actions/companion.action';
import Image from 'next/image';
import CompanionList from '@/components/CompanionList';

const Profile =async() => {
  const user=await currentUser();
  if(!user)redirect('/sign-in');

  const userCompanions=await getUserCompanions(user.id);
  const userSessions=await getUserSessions(user.id);


  return (
      <main className='min-lg:w-3/4'>
        <section className='flex justify-between gap-4 max-sm:flex-col items-center'>
          
          <div className='flex gap-4 items-center'>
              <Image src={user.imageUrl} alt={user.firstName} width={110} height={110} className='rounded-md'/>
              <div className='flex flex-col gap-2'>
                  <h1 className='font-bold text-2xl'>{user.firstName}{user.lastName}</h1>
                  <p className='text-muted-foreground text-sm'>{user.emailAddresses[0].emailAddress}</p>
              </div>
           </div>

           <div className='flex gap-4'>
              
              <div className='border border-black rounded-lg p-3 gap-2 flex flex-col h-fit'>
                  <div className='flex gap-2 items-center'>
                    <Image src='/icons/check.svg' alt='checkmark' width={22} height={22}/>
                    <p className='text-2xl font-bold'>{userSessions.length}</p>
                  </div>
                    <div>Lessons Completed</div>
              </div>

               <div className='border border-black rounded-lg p-3 gap-2 flex flex-col h-fit'>
                  <div className='flex gap-2 items-center'>
                    <Image src='/icons/cap.svg' alt='cap' width={22} height={22}/>
                    <p className='text-2xl font-bold'>{userCompanions.length}</p>
                  </div>
                    <div>Companions Completed</div>
              </div>
           </div>
        </section>
          
           <Accordion type="multiple">
              <AccordionItem value="recent">
                <AccordionTrigger className='font-bold text-2xl'>Recent Sessions</AccordionTrigger>
                <AccordionContent>
                   <CompanionList 
                      title='My Session History'
                      companions={userSessions}
                   />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="companions">
                <AccordionTrigger className='font-bold text-2xl'>My Companions{`(${userCompanions.length})`}</AccordionTrigger>
                <AccordionContent>
                   <CompanionList 
                      title='Companions'
                      companions={userCompanions}
                   />
                </AccordionContent>
              </AccordionItem>
          </Accordion>
      </main>
  )
}

export default Profile