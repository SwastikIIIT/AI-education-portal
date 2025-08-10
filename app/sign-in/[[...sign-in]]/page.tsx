import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'


export default function Page() {
  return (
    <main className='items-center justify-center'>
      <div className='w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center'>
        <div className='hidden lg:flex flex-col space-y-8'>
          <div className='space-y-6'>
            <Link href="/" className='mb-8'>
              <span className='text-2xl font-bold text-gray-800'>Converso</span>
            </Link>
            
            <div className='space-y-4'>
              <h1 className='text-4xl font-bold text-gray-900 leading-tight'>
                Welcome back to your
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'> AI Learning Journey</span>
              </h1>
              <p className='text-lg text-gray-600 leading-relaxed'>
                Continue your personalized education experience with AI-powered companions tailored to your learning style.
              </p>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center gap-4'>
              <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'>
                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <span className='text-gray-700 font-medium'>Personalized AI Tutors</span>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center'>
                <svg className='w-5 h-5 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>
              <span className='text-gray-700 font-medium'>Real-time Feedback</span>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-8 h-8 rounded-full bg-green-100 flex items-center justify-center'>
                <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
              </div>
              <span className='text-gray-700 font-medium'>Progress Tracking</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <div className='w-full max-w-md space-y-6'>
            
    
            <div className='lg:hidden text-center space-y-4'>
              <Link href="/">
                <span className='text-xl font-bold text-gray-800'>Converso</span>
              </Link>
              <h2 className='text-2xl font-bold text-gray-900'>Welcome back!</h2>
            </div>

            <div className='bg-transparent rounded-2xl'>
              <SignIn 
                appearance={{
                  elements: {
                    formButtonPrimary: 
                      'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm font-semibold',
                    card: 'bg-transparent shadow-none',
                    headerTitle: 'hidden lg:block text-2xl font-bold text-gray-900',
                    headerSubtitle: 'hidden lg:block text-gray-600',
                    socialButtonsBlockButton:
                      'border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium',
                    formFieldInput:
                      'border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl bg-white/80',
                    footerActionLink: 'text-blue-600 hover:text-blue-700 font-semibold',
                    identityPreviewEditButton: 'text-blue-600 hover:text-blue-700',
                    formResendCodeLink: 'text-blue-600 hover:text-blue-700',
                  },
                  layout: {
                    socialButtonsPlacement: 'top',
                    socialButtonsVariant: 'blockButton'
                  }
                }}
              />
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}