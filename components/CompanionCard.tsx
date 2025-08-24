'use client'
import { addBookmark, removeBookmark } from '@/lib/actions/companion.action'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

interface CompanionProps{
  id:string,
  name:string,
  topic:string,
  subject:string,
  duration:number,
  color:string,
  isBookmarked:boolean
}

const CompanionCard = ({id,name,topic,subject,duration,color,isBookmarked}:CompanionProps) => {
   const pathname=usePathname();
   const [bookmarked, setBookmarked] = useState(isBookmarked);
   
   const handleBookmark=async() => {
      if(isBookmarked)
        removeBookmark(id,pathname);
      else
      {
         addBookmark(id,pathname);
         console.log('Clicked');
      }
      setBookmarked((prev)=>!prev);
    }
    // console.log(name+" "+isBookmarked);

  return (
    <article 
      className='flex flex-col justify-between w-full min-lg:max-w-[410px] border border-black group relative p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-out overflow-hidden h-[40vh]'
      style={{backgroundColor:color}}
    >
  
      <div className='flex items-center justify-between '>
        <div className='bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-4xl text-xs font-semibold uppercase shadow-lg'>
          {subject}
        </div>
        <div>
          <button>
          </button>
          <button 
            className='px-2 flex items-center h-full aspect-square cursor-pointer bg-black/80 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200 shadow-md group-hover:scale-110 transform'
            onClick={handleBookmark}
          >
            <Image
              src={cn(isBookmarked?'/icons/bookmark-filled.svg':'/icons/bookmark.svg')}
              alt='bookmark'
              width={15}
              height={15}
            />
          </button>
        </div>
      </div>

     
        <h2 className='text-2xl font-black text-gray-900 leading-tight line-clamp-2'>
          {name}
        </h2>
        
        <p className='text-gray-800/90 text-sm leading-relaxed line-clamp-3 font-medium'>
          {topic}
        </p>

        <div className='flex items-center gap-2 text-gray-800/80'>
          <Image src="/icons/clock.svg" alt="duration" width={14} height={14} className="opacity-80"/>
          <p className='text-sm font-semibold'>{duration} mins</p> 
        </div>

        <Link href={`/companions/${id}`} className='w-full'>
          <button className='w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer'>
            <span>Launch Lesson</span>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
   
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
      </div>
    </article>
  )
}

export default CompanionCard