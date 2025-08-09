'use client'
import { PricingTable } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Subscription = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className='flex flex-col gap-4 justify-center items-center  w-full '>
              <Image src="/images/limit.svg" alt="Companion Limit Reached" width={360} height={250}/>
              <div className='cta-badge'>
                  Upgrade Your Plan
              </div>
          </div>
              
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock unlimited companions and premium features. Transform your learning experience with our AI-powered educational platform.
          </p>
        </div>
        
        <div className="mb-16">
          <div className="clerk-pricing-enhanced">
            <PricingTable />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            What You'll Get With Premium
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Unlimited AI Companions</h4>
              <p className="text-gray-600">Create as many learning companions as you need for different subjects and topics.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h4>
              <p className="text-gray-600">Track your progress with detailed insights and personalized learning recommendations.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Priority Support</h4>
              <p className="text-gray-600">Get instant help and priority access to new features and improvements.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Trusted by thousands of learners</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>30-day money back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>24/7 support</span>
            </div>
          </div>
        </div>

      <style jsx global>{`
        .clerk-pricing-enhanced .cl-pricingTable {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        
        .clerk-pricing-enhanced .cl-pricingCard {
          border-radius: 1rem !important;
          border: 2px solid #f1f5f9 !important;
          transition: all 0.3s ease !important;
          position: relative !important;
          overflow: hidden !important;
          background: white !important;
        }
        
        .clerk-pricing-enhanced .cl-pricingCard:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
          border-color: #8b5cf6 !important;
        }
        
        .clerk-pricing-enhanced .cl-pricingCard[data-active="true"] {
          border-color: #8b5cf6 !important;
          background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%) !important;
          color: white !important;
          position: relative !important;
        }
        
        .clerk-pricing-enhanced .cl-pricingCard[data-active="true"]::before {
          content: "Most Popular" !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          background: #fbbf24 !important;
          color: #1f2937 !important;
          text-align: center !important;
          padding: 8px !important;
          font-size: 0.8rem !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
        }
        
        .clerk-pricing-enhanced .cl-pricingCard button {
          background: #1f2937 !important;
          border: none !important;
          border-radius: 2rem !important;
          font-weight: 600 !important;
          padding: 12px 32px !important;
          transition: all 0.3s ease !important;
          color: white !important;
        }
        
        .clerk-pricing-enhanced .cl-pricingCard button:hover {
          background: #374151 !important;
          transform: translateY(-2px) !important;
        }
        
        .clerk-pricing-enhanced .cl-pricingCard[data-active="true"] button {
          background: white !important;
          color: #8b5cf6 !important;
        }
        
        .clerk-pricing-enhanced .cl-pricingCard[data-active="true"] button:hover {
          background: #f8fafc !important;
        }
      `}</style>
    </main>
  )
}

export default Subscription