import CompanionContainer from '@/components/CompanionContainer';
import { getCompanion } from '@/lib/actions/companion.action';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'
interface CompanionSessionProps{
  params:Promise<{id:string}>
}

const CompanionSession = async({params}:CompanionSessionProps) => {
  const {id}=await params;
  const companion=await getCompanion(id);
  const user=await currentUser();


  console.log(companion);
  console.log(user);
  if(!user)redirect("/sign-in");
  if(!companion)redirect("/companions");

  return (
     <main>
        <article className='flex rounded-border md:items-center justify-between p-6 max-md:flex-col'>
            <div className='flex items-center gap-4'>
                <div className='size-[72px] rounded-lg flex items-center justify-center max-sm:hidden'
                     style={{backgroundColor:getSubjectColor(companion.subject)}}>
                    <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={35} height={35}/>
                 </div>
                 <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                        <p className='font-bold text-2xl'>{companion.name} <span className='font-light max-sm:hidden'>||</span></p>
                        <div className='subject-badge max-sm:hidden'>{companion.subject}</div>
                    </div>
                    <p className='text-lg'>{companion.topic}</p>
                    <p className='text-lg md:hidden'>{companion.duration} mins</p>
                 </div>
            </div>

            <div className='text-2xl max-md:hidden'>{companion.duration} minutes</div>
        </article>

       <CompanionContainer {...companion} 
          userName={user.firstName!}
          userImage={user.imageUrl!}
          companionId={id}
       />
     </main>
  )
}

export default CompanionSession