'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from '@/constants';
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SubjectFilter = () => {
      const pathname=usePathname();
      const router=useRouter();
      const searchParams=useSearchParams();
      const query=searchParams.subject?searchParams.subject:'';
    
      const [searchQuery,setSearchQuery]=useState('');
    
      useEffect(()=>{ 
              if(searchQuery)
                {
                    const newUrl=formUrlQuery({
                      params:searchParams.toString(),
                      key:"subject",
                      value:searchQuery
                    })
                    router.push(newUrl,{scroll:false});
                }
                else if(pathname==='/companions' || searchQuery==='all')
                {
                  const newUrl=removeKeysFromUrlQuery({
                      params:searchParams.toString(),
                      keysToRemove:["subject"],
                  })
                  router.push(newUrl,{scroll:false});
                }
      },[searchParams,router,pathname,searchQuery])
    
  return (
      <Select onValueChange={setSearchQuery} value={searchQuery}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
  )
}

export default SubjectFilter