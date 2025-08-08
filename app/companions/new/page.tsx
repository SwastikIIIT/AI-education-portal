import CompanionForm from '@/components/CompanionForm';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const NewCompanion =async() => {
  const {userId}=await auth();
  if(!userId)redirect('/sign-in');

  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center px-6'>
         <article className='flex flex-col gap-6 w-full'>
            <h1>Companion Builder</h1>    
            <CompanionForm/> 
         </article>   
    </main>
  )
}

export default NewCompanion;