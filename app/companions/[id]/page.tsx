import CompanionContainer from '@/components/CompanionContainer';
import { conversationPermissions, getCompanion } from '@/lib/actions/companion.action';
import { cn, getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
  title: "Intelli Learn – Your Personalized AI Learning Platform",
  description: "Learn smarter with your AI tutor—tailored lessons, instant answers, and interactive guidance."
};


interface CompanionSessionProps{
  params:Promise<{id:string}>
}

const CompanionSession = async({params}:CompanionSessionProps) => {
  const {id}=await params;
  const user=await currentUser();

  const companion=await getCompanion(id);
  const flag=await conversationPermissions();

//   console.log(companion);
//   console.log(user);
  if(!user)redirect("/sign-in");
  if(!companion)redirect("/companions");

  return (
     <main>
        {flag.allowed?(
         <>
         <div className='flex items-center gap-2 rounded-xl w-fit py-1 px-4' style={{backgroundColor:getSubjectColor(companion.subject)}}>
            <div className='w-2 h-2 bg-black/50 rounded-full animate-pulse'></div>
            <div className='text-black'>
               <span className='font-semibold size-4'>{flag.remainConv}</span> conversations remaining this month.
            </div>
         </div>
         <article className='flex rounded-border md:items-center justify-between p-6 max-md:flex-col'>
            <div className='flex items-center gap-4'>
                <div className='size-[72px] rounded-lg flex items-center justify-center max-sm:hidden'
                     style={{backgroundColor:getSubjectColor(companion.subject)}}>
                    <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={35} height={35}/>
                 </div>
                 <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-3'>
                        <p className='font-bold text-2xl'>{companion.name}</p>
                        <div className='subject-badge max-sm:hidden'>{companion.subject}</div>
                    </div>
                    <p className='text-lg lg:max-w-3/4'>{companion.topic}</p>
                    <p className='text-lg md:hidden'>{companion.duration} mins</p>
                 </div>
            </div>

            <div className='text-2xl max-md:hidden'>{companion.duration} mins</div>
        </article>

       <CompanionContainer {...companion} 
          userName={user.firstName!}
          userImage={user.imageUrl!}
          companionId={id}
       /></>):
       (
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

export default CompanionSession