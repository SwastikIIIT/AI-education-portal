import CompanionForm from '@/components/CompanionForm';
import { permissions } from '@/lib/actions/companion.action';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const NewCompanion =async() => {
  const {userId}=await auth();
  if(!userId)redirect('/sign-in');

  const flag=await permissions();

  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center px-6'>
         {flag?(<article className='flex flex-col gap-6 w-full'>
            <h1>Companion Builder</h1>    
            <CompanionForm/> 
         </article>)
         :(
           <article className='companion-limit '>
               <Image src="/images/limit.svg" alt="Companion Limit Reached" width={360} height={250}/>
               <div className='cta-badge'>
                  Upgrade Your Plan
               </div>
               <h1>You’ve Reached Your Limit</h1>
               <p>You’ve reached your companion limit. Upgrade to create more companions and premium features.</p>
              <Link href='/subscription' className='btn-primary justify-center w-full'>Upgrade Your Plan</Link>
           </article>
         )}   
    </main>
  )
}

export default NewCompanion;