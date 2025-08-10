import CompanionForm from '@/components/CompanionForm';
import { companionPermissions} from '@/lib/actions/companion.action';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const NewCompanion =async() => {
  const {userId}=await auth();
  if(!userId)redirect('/sign-in');

  const flag=await companionPermissions();

  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center px-6'>
         {flag.allowed?(
          <article className='flex flex-col gap-6 w-full'>
             <p className='font-semibold'>{flag.message}</p> 
            <div className='flex items-center justify-between'>
                <h1>Companion Builder</h1>
            </div>
            <CompanionForm/> 
         </article>)
         :(
           <article className='companion-limit '>
               <Image src="/images/limit.svg" alt="Companion Limit Reached" width={360} height={250}/>
               <div className='cta-badge'>
                    Unlock premium access
               </div>
               <h1>You’ve Reached Your Limit</h1>
               <p>{flag.message}</p>
              <Link href='/subscription' className='btn-primary justify-center w-full'>Upgrade Your Plan</Link>
           </article>
         )}   
    </main>
  )
}

export default NewCompanion;