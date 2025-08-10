import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface CompanionListInterface{
   title:string,
   companions?:Companion[],
   classNames?:string
}

const CompanionList = ({title,companions,classNames}:CompanionListInterface) => {
  return (
    <article className={cn('companion-list',classNames)}>
      <h1 className='font-bold text-3xl py-2.5'>{title}</h1>
      <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg w-2/3">Lessons</TableHead>
              <TableHead className='text-lg'>Subject</TableHead>
              <TableHead className='text-lg text-right'>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companions?.map((companion,index)=>(
              <TableRow key={index}>
                 <TableCell className="py-4">
                   <Link href={`/companions/${companion.id}`}>
                      <div className='flex items-start gap-3'>
                          <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden flex-shrink-0'
                           style={{backgroundColor:getSubjectColor(companion.subject)}}>
                             <Image
                               src={`/icons/${companion.subject}.svg`}
                               alt={companion.subject}
                               width={30}
                               height={30}
                             />
                          </div>
                          <div className='flex flex-col gap-2 flex-1 min-w-0'>
                              <p className='font-bold text-2xl leading-tight'>{companion.name}</p>
                              <p className='text-lg text-gray-600 leading-relaxed break-words hyphens-auto'>
                                {companion.topic}
                              </p>
                          </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className='subject-badge w-fit max-md:hidden'>
                        {companion.subject}
                    </div>
                    <div className='flex items-center justify-center rounded-lg w-fit p-2 md:hidden flex-shrink-0' 
                        style={{backgroundColor:getSubjectColor(companion.subject)}}>
                        <Image
                            src={`/icons/${companion.subject}.svg`}
                            alt={companion.subject}
                            width={18}
                            height={18}
                          />
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className='flex items-center justify-end gap-2 w-full'>
                       <p className='text-2xl whitespace-nowrap'>{companion.duration} <span className='max-md:hidden'>mins</span>
                        </p>
                        <Image
                          src={`/icons/clock.svg`}
                          alt="minutes"
                          width={14}
                          height={14}
                          className='md:hidden flex-shrink-0'
                        />
                    </div>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </article>
  )
}

export default CompanionList