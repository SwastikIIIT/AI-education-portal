'use client';
import { cn, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import soundwaves from '@/constants/soundwaves.json'

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

  const toggleMicrophone=()=>{
        const status=vapi.isMuted();
        vapi.setMuted(!status);
        setIsMuted(!status);
  }

  const handleCall=async()=>{
      setCallStatus(CallStatus.CONNECTING);

      const assistantOverrides={
        variableValues:[topic,subject,style],
        clientMessages:['transcript'],
        serverMessages:[],
      }

      vapi.start();
  }

  const handleDisconnect=()=>{

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
            const onCallEnd=()=>setCallStatus(CallStatus.FINISHED);
            const onMessage=()=>{};
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
      <section className='flex flex-col h-[70vh]'>
          <section className='flex gap-8 max-sm:flex-col'>
              <div className='companion-section py-6'>
                  <div className='companion-avatar' style={{backgroundColor:getSubjectColor(subject)}}>
                       <div className={cn('absolute transition-opacity duration-1000',
                         callStatus===CallStatus.INACTIVE || callStatus===CallStatus.FINISHED?'opacity-1001':'opacity-0',
                          callStatus===CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                        )}>
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className='max-sm:w-fit'/>
                      </div>

                      <div className={cn('absolute transition-opacity duration-1000',
                          callStatus===CallStatus.ACTIVE?'opacity-100':'opacity-0'
                      )}>
                        <Lottie lottieRef={lottieRef}
                           animationData={soundwaves}
                           autoPlay={false}
                           className='companion-lottie'
                        />
                      </div>
                  </div>
                  
                  <p className='font-bold text-2xl'>{name}</p>
              </div>

              <div className='user-section'>
                 <div className='user-avatar'>
                     <Image src={userImage} alt={userName} width={130} height={130} className='rounded-lg'/>
                     <p className='font-bold text-2xl'>{userName}</p>
                 </div>

                 <button className={cn('btn-mic',callStatus!==CallStatus.ACTIVE && 'cursor-not-allowed')} onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                     <Image src={!isMuted?"/icons/mic-on.svg":"/icons/mic-off.svg"} alt='MIC' width={36} height={36}/>
                     <p className='max-sm:hidden'>{isMuted?"Turn on Microphone":"Turn off Microphone"}</p>
                 </button>

                 <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white',
                    callStatus===CallStatus.ACTIVE?"bg-red-700":"bg-primary",
                    callStatus===CallStatus.CONNECTING && 'animate-pulse'
                   )}
                   onClick={callStatus===CallStatus.ACTIVE?handleDisconnect:handleCall}
                  >{callStatus===CallStatus.ACTIVE?"End Session":callStatus===CallStatus.CONNECTING?"Connecting":"Start Session"}</button>
                 {/* <div className=''></div> */}
              </div>
          </section>

          <section className='transcript'>
              <div className='transcript-message no-scrollbar'>Transcript Speech</div>
              <div className='transcript-fade'/>
          </section>
      </section>
  )
}

export default CompanionContainer