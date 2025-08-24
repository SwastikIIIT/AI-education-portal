'use server'

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";

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

const deleteCompanion=async(id:string)=>{
    const supabase=createSupabaseClient();
    const {data,error}=await supabase
                       .from('companions')
                       .delete()
                       .eq('id',id)
                       .select();
    
    if(error)throw new Error(error?.message || "Failed to delete the companion");
    return data[0];
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

export const companionPermissions=async()=>{
    const {userId,has}=await auth();
    const supabase=createSupabaseClient();

    let limit=0; 
    if(has({plan:'ultimate_plan'}) )
       return {allowed:true};
    else if(has({feature:'3_active_ai_companions'}))
        limit=3;
    else if(has({feature:'10_companions'}) || has({plan:'pro_plan'}))
        limit=10;

    const {data,error}=await supabase
                           .from('companions')
                            .select('id',{count:'exact'})
                            .eq('author',userId);
    if(error)throw new Error(error?.message);

    const companionCount=data?.length;
    if(companionCount>=limit)
        return {allowed:false,message:`You've reached your companion limit (${limit}).Upgrade to create more companions and unlock premium features.`};
   
    return {allowed:true,message:`Remaining Companions Count : ${limit-companionCount}`};
}

export const conversationPermissions=async()=>{
    const {has,userId}=await auth();
    const supabase=createSupabaseClient();

    let conv=30;
    if(has({plan:'ultimate_plan'}) || has({plan:'proplan'}))
        return {allowed:true};
    else if(has({feature:'30_conversations_per_month'}) || has({plan:'free_plan'}))
        conv=30;

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const {data,error}=await supabase
                       .from('companions')
                       .select('id',{count:'exact'})
                       .eq('author',userId)
                       .gte('created_at',firstDayOfMonth.toISOString())
                       .lte('created_at',lastDayOfMonth.toISOString());

    if(error) throw new Error(error?.message);

    const conversationCount=data?.length;
    if(conversationCount>=conv)
        return {allowed:false,message:`You've reached your monthly conversation limit (${conv}).Upgrade for unlimited conversations.`};
    return {allowed:true,remainConv:conv-conversationCount}
}

export const addBookmark=async(companionId:string,path:string)=>{
    const {userId}=await auth();
    if(!userId) return null;
    
    const supabase=createSupabaseClient();
    const {data,error}=await supabase
                            .from('bookmarks')
                            .insert({user_id:userId,companion_id:companionId});
    if(error)throw new Error(error.message);
    revalidatePath(path);
    return data;
}

export const removeBookmark=async(companionId:string,path:string)=>{
    const {userId}=await auth();
    if(!userId) return null;
    
    const supabase=createSupabaseClient();
    const {data,error}=await supabase
                            .from('bookmarks')
                            .delete()
                            .eq('user_id',userId)
                            .eq('companion_id',companionId);
    if(error)throw new Error(error.message);
    revalidatePath(path);
    return data;

}


export const getBookmarks=async(userId:string)=>{

    const supabase=createSupabaseClient();
    const {data,error}=await supabase
                            .from('bookmarks')
                            .select('companions:companion_id(*)')
                            .eq('user_id',userId)
    if(error)throw new Error(error.message);
 
    return data.map(({companions})=>(companions));

}