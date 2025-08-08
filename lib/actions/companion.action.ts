'use server'

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";

export const createCompanion=async(formData:CreateCompanion)=>{
    const {userId:author}=await auth();   // accessing used id from clerk
    const supabase=createSupabaseClient();  //accessing the supabase database,entrypoint of supabase 

    const {data,error}=await supabase
                       .from('companions')
                       .insert({...formData,author})
                       .select(); //returns array of inserted rows

    if(error || !data)throw new Error(error?.message || "Failed to create Companion");
    return data[0];
}

export const getAllCompanions=async({limit=10,page=1,subject,topic}:GetAllCompanions)=>{
   const supabase=createSupabaseClient();
   
   //This is a query which will not fetch the data unless awaited
    let query=supabase
                .from('companions')
                .select();
    
    if(subject && topic)
        query=query.ilike('subject',`%${subject}%`)
                 .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    else if(subject)
        query=query.ilike('subject',`%${subject}%`);
    else if(topic)
        query=query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);

    query=query.range((page-1)*limit,page*limit-1);

    const {data,error}=await query;

    if(error) throw new Error(error?.message || "Failed to fetch the required rows");

    return data;
}