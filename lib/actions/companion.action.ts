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


export const getCompanion=async(id:string)=>{
    const supabase=createSupabaseClient();
    const {data,error}=await supabase
          .from("companions")
          .select()
          .eq("id",id);

    if(error)throw new Error(error?.message || "Failed to get the companion");

    return data[0];
}

export const addSesssionHistory=async(companionId:string)=>{
    const {userId}=await auth();
    const supabase=createSupabaseClient();

    const {data,error}=await supabase
                       .from('session_history')
                       .insert({
                          companion_id:companionId,
                          user_id:userId
                       });

    if(error)throw new Error(error?.message || "Failed to create the session");
    return data;
}

export const getRecentSessions=async(limit:10)=>{
    const supabase=createSupabaseClient();

    const {data,error}=await supabase
                            .from('session_history')
                            .select('companions:companion_id(*)')
                            .order('created_at',{ascending:false})
                            .limit(limit);

    if(error)throw new Error(error?.message || "Failed to load recent sessions");

    return data.map(({companions})=>companions);

}


export const getUserSessions=async(userdId:string,limit:10)=>{
    const supabase=createSupabaseClient();

    const {data,error}=await supabase
                            .from('session_history')
                            .select('companions:companion_id(*)')
                            .eq('user_id',userdId)
                            .order('created_at',{ascending:false})
                            .limit(limit);

    if(error)throw new Error(error?.message || "Failed to load recent sessions");

    return data.map(({companions})=>companions);
}


export const getUserCompanions=async(userdId:string)=>{
    const supabase=createSupabaseClient();
    const {data,error}=await supabase
                            .from('companions')
                            .select()
                            .eq('author',userdId);

    if(error)throw new Error(error?.message || "Failed to load user-specific companions");

    return data;
}