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
      <h1 className='font-bold text-3xl py-2.5'>Recent Sessions</h1>
      <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg w-2/3">Lessons</TableHead>
              <TableHead className='text-lg'>Subject</TableHead>
              <TableHead className='text-lg text-right'>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companions?.map((companion)=>(
              <TableRow key={companion.id}>
                 <TableCell>
                   <Link href={`/companions/${companion.id}`}>
                      <div className='flex items-center gap-2'>
                          <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden'
                           style={{backgroundColor:getSubjectColor(companion.subject)}}>
                             <Image
                               src={`/icons/${companion.subject}.svg`}
                               alt={companion.subject}
                               width={30}
                               height={30}
                             />
                          </div>
                          <div className='flex flex-col gap-2'>
                              <p className='font-bold text-2xl'>{companion.name}</p>
                              <p className='text-lg'>{companion.topic}</p>
                          </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className='subject-badge w-fit max-md:hidden'>
                        {companion.subject}
                    </div>
                    <div className='flex items-center justify-center rounded-lg w-fit p-2 md:hidden' 
                        style={{backgroundColor:getSubjectColor(companion.subject)}}>
                        <Image
                            src={`/icons/${companion.subject}.svg`}
                            alt={companion.subject}
                            width={18}
                            height={18}
                          />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-end gap-2 w-full'>
                       <p className='text-2xl'>{companion.duration} <span className='max-md:hidden'>mins</span>
                        </p>
                        <Image
                          src={`/icons/clock.svg`}
                          alt="minutes"
                          width={14}
                          height={14}
                          className='md:hidden'
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