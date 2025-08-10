import { getSubjectColor } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface TranscriptProps {
  messages: SavedMessage[],
  name: string,
  subject: string,
  userName: string;
  userImage: string;
}

const Transcripts = ({messages, name, subject, userImage, userName}: TranscriptProps) => {
  return (
    <div className='h-full flex flex-col'>
      <div className='flex items-center gap-3 pb-4 border-b border-gray-500'>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></div>
          <h3 className='font-semibold text-gray-800'>Live Transcript</h3>
        </div>
        <span className='text-xs text-white bg-gray-950 px-2 py-1 rounded-lg'>
          {messages.length} messages
        </span>
      </div>

      <div className='w-full overflow-y-auto space-y-4 py-4'>
        {messages.length === 0 ? (
          <div className='flex items-center justify-center h-full text-gray-600'>
            <div className='py-4 text-center'>
              <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
              </div>
              <p className='text-lg font-medium mb-2'>No conversation yet</p>
              <p className='text-sm'>Start a session to begin chatting with {name}</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => {
            if (message.role === 'assistant') {
              return (
                <div key={index} className='flex gap-3 items-start animate-fade-in'>
                  <div 
                    className='w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-white'
                    style={{backgroundColor: getSubjectColor(subject)}}
                  >
                    <Image 
                      src={`/icons/${subject}.svg`} 
                      alt={subject} 
                      width={20} 
                      height={20}
                    />
                  </div>

                  <div className='bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm border border-gray-100 flex-1 max-w-[80%]'>
                    <p className='text-xs font-semibold text-gray-600 mb-1'>
                      {name.split(/[\s-]/)[0]}
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                      {message.content}
                    </p>
                  </div>
                </div>
              )
            } else {
              return (
                <div key={index} className='flex gap-3 items-start justify-end animate-fade-in'>
                  <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg rounded-tr-none px-4 py-3 shadow-sm flex-1 max-w-[80%]'>
                    <p className='text-xs font-semibold mb-1 opacity-90'>
                      {userName}
                    </p>
                    <p className='leading-relaxed'>
                      {message.content}
                    </p>
                  </div>
                  
                  <div className='w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm border-2 border-white'>
                    <Image 
                      src={userImage} 
                      alt={userName} 
                      width={40} 
                      height={40}
                      className='object-cover w-full h-full'
                    />
                  </div>
                </div>
              )
            }
          })
        )}
      </div>
    </div>
  )
}

export default Transcripts