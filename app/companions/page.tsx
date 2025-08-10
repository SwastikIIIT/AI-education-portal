import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import { getAllCompanions, getBookmarks } from '@/lib/actions/companion.action';
import { getSubjectColor } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs/server';
import React from 'react'


//Next js page components have access to some props by default like params(route) and searchParams(query)-Destructure them
//Page components can be async server component 
const CompanionLibrary =async({searchParams}:SearchParams) => {
    const filters=await searchParams;
    const subject=filters.subject?filters?.subject:'';
    const topic=filters.topic?filters?.topic:'';

    const companions=await getAllCompanions({subject,topic});
    const user=await currentUser();

    let userBookmarks:any[]=[];
    if(user)
    {
       userBookmarks=await getBookmarks(user?.id);
    }

    const bookmarkedIds=new Set(userBookmarks.map(bookmark=>bookmark.id));
//     console.log("UserId",userId);
//     console.log("User",user?.id);
    
  return (
    <main>
        <section className='flex  justify-between gap-4 max-sm:flex-col'>
             <h1>Companions Library</h1>
             <div className='flex gap-4'>
                <SearchInput/>
                <SubjectFilter/>
             </div>
        </section>

        <section className='companions-grid'>
             {companions.map((companion)=>(
                  <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} 
                  isBookmarked={bookmarkedIds.has(companion.id)}/>
             ))}
        </section>
    </main>
  )
}

export default CompanionLibrary