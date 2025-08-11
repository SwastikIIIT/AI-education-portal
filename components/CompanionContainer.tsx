
'use client';
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import soundwaves from '@/constants/soundwaves.json'
import { AssistantOverrides, CreateAssistantDTO } from '@vapi-ai/web/dist/api';
import { addSesssionHistory } from '@/lib/actions/companion.action';
import Transcripts from './Transcripts';

enum CallStatus{
    INACTIVE='INACTIVE',
    ACTIVE='ACTIVE',
    FINISHED='FINISHED',
    CONNECTING='CONNECTING'
}

const CompanionContainer = ({userName,userImage,name,topic,subject,voice,style,companionId}:CompanionComponentProps) => {
   const [callStatus,setCallStatus]=useState<CallStatus>(CallStatus.INACTIVE);
   const [isSpeaking,setIsSpeaking]=useState(false);
   const lottieRef=useRef<LottieRefCurrentProps>(null);
   const [isMuted,setIsMuted]=useState(true);
   const [messages,setMessages]=useState<SavedMessage[]>([]);

  const toggleMicrophone=()=>{
        const status=vapi.isMuted();
        vapi.setMuted(!status);
        setIsMuted(!status);
  }

  const handleCall=async()=>{
      setCallStatus(CallStatus.CONNECTING);
      
      const assistantOverrides:AssistantOverrides={
        variableValues:{topic,subject,style},
        clientMessages:['transcript'],
        serverMessages:[],
      }

      const assistant:CreateAssistantDTO=configureAssistant(voice,style);

      vapi.start(assistant,assistantOverrides);
  }

  const handleDisconnect=()=>{
     setCallStatus(CallStatus.FINISHED);
     vapi.stop();
  }

   useEffect(()=>{
       if(lottieRef)
       {
          if(isSpeaking)lottieRef.current?.play();
          else lottieRef.current?.stop();
       }
   },[lottieRef,isSpeaking])

   useEffect(()=>{
            const onCallStart=()=>setCallStatus(CallStatus.ACTIVE);
            const onCallEnd=()=>{
                setCallStatus(CallStatus.FINISHED);
                addSesssionHistory(companionId);
            };
            const onMessage=(message:Message)=>{
                 if(message.type==='transcript')
                 {
                      const newMessage={role:message.role,content:message.transcript};
                     setMessages((prev) => {
                        const filtered = prev.filter(msg=>!(msg.role === message.role && prev.indexOf(msg)===0));
                        return [newMessage,...filtered];
                       });
                 }
            };
            const onError=(error:Error)=>console.log('Error',error);
            const onSpeechStart=()=>setIsSpeaking(true);
            const onSpeechEnd=()=>setIsSpeaking(false);

            vapi.on('call-start',onCallStart);
            vapi.on('call-end',onCallEnd);
            vapi.on('message',onMessage);
            vapi.on('error',onError);
            vapi.on('speech-start',onSpeechStart);
            vapi.on('speech-end',onSpeechEnd);

            return ()=>{
                vapi.off('call-start',onCallStart);
                vapi.off('call-end',onCallEnd);
                vapi.off('message',onMessage);
                vapi.off('error',onError);
                vapi.off('speech-start',onSpeechStart);
                vapi.off('speech-end',onSpeechEnd);
            }
   },[]);
  
    return (
      <section className='flex flex-col h-[75vh] py-4'>
          <section className='flex gap-8 max-sm:flex-col mb-6'>
              
              <div className='companion-section py-6'>
                  <div className='relative w-48 h-48 rounded-full shadow-lg border-4 border-white'
                       style={{backgroundColor:getSubjectColor(subject)}}>
                       <div className={cn('absolute inset-0 flex items-center justify-center transition-opacity duration-1000',
                         callStatus===CallStatus.INACTIVE || callStatus===CallStatus.FINISHED?'opacity-100':'opacity-0',
                          callStatus===CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                        )}>
                        <Image 
                          src={`/icons/${subject}.svg`} 
                          alt={subject} 
                          width={100} 
                          height={100} 
                          className='max-md:w-20 max-md:h-20'
                        />
                      </div>

                      <div className={cn('absolute  flex items-center justify-center transition-opacity duration-1000',
                          callStatus===CallStatus.ACTIVE?'opacity-100':'opacity-0'
                      )}>
                        <Lottie 
                          lottieRef={lottieRef}
                          animationData={soundwaves}
                          autoPlay={false}
                          className='w-40 h-40'
                        />
                      </div>
                  </div>
                  
                  <div className='text-center flex flex-col mt-4'>
                    
                    <h2 className='font-bold text-xl text-gray-900'>{name}</h2>
                    
                    <div className='flex items-center justify-center gap-2 mt-2'>
                      <div className={cn('w-3 h-3 rounded-full transition-colors',
                        callStatus === CallStatus.ACTIVE ? 'bg-green-500' :
                        callStatus === CallStatus.CONNECTING ? 'bg-yellow-500 animate-pulse' :
                        'bg-gray-400'
                      )}></div>
                      <span className='text-sm text-gray-600 capitalize font-medium'>
                        {callStatus === CallStatus.ACTIVE ? 'Active' :
                         callStatus === CallStatus.CONNECTING ? 'Connecting' :
                         callStatus === CallStatus.FINISHED ? 'Session Ended' : 'Ready'}
                      </span>
                    </div>
                  </div>
              </div>

              
              <div className='user-section' >
                 <div className='py-5 flex flex-col items-center justify-between gap-3 hidden sm:flex'>
                     <div className='w-36 h-36 rounded-full overflow-hidden shadow-lg border-4 border-white'>
                       <Image 
                         src={userImage} 
                         alt={userName} 
                         width={130} 
                         height={130} 
                         className='object-cover w-full h-full'
                       />
                     </div>
                     <h3 className='font-bold text-xl text-gray-800'>{userName}</h3>
                 </div>
        
                   <button 
                        className={cn('flex items-center justify-center w-full rounded-lg gap-3 px-4 py-3 transition-all duration-200 font-medium',
                        callStatus !== CallStatus.ACTIVE?'bg-gray-100 border-2 border-black text-gray-800 cursor-not-allowed':isMuted 
                            ?'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
                            :'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100'
                        )} 
                        onClick={toggleMicrophone} 
                        disabled={callStatus !== CallStatus.ACTIVE}
                    >
                        <Image 
                            src={!isMuted ? "/icons/mic-on.svg" : "/icons/mic-off.svg"} 
                            alt='MIC' 
                            width={24} 
                            height={24}
                        />
                        <span className='max-sm:hidden text-sm'>
                        {isMuted ? "Turn on Microphone" : "Turn off Microphone"}
                        </span>
                   </button>
                  
                   <button 
                     className={cn('px-6 py-3 rounded-lg font-semibold w-full cursor-pointer text-white transition-all duration-200 transform hover:scale-105 shadow-md',
                       callStatus === CallStatus.ACTIVE 
                         ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                         : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
                       callStatus === CallStatus.CONNECTING && 'animate-pulse'
                     )}
                     onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                   >
                     {callStatus === CallStatus.ACTIVE ? "End Session" : 
                      callStatus === CallStatus.CONNECTING ? "Connecting..." : 
                      "Start Session"}
                   </button>
              </div>
          </section>

          <section className='w-full border border-gray-600 bg-gray-50 rounded-xl p-4 relative overflow-hidden min-h-[300px]'>
             <Transcripts 
               messages={messages}
               name={name}
               subject={subject}
               userImage={userImage}
               userName={userName}
             />
          </section>
      </section>
  )
}

export default CompanionContainer
