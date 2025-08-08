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