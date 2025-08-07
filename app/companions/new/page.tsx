import CompanionForm from '@/components/CompanionForm';
import React from 'react'

const NewCompanion = () => {
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