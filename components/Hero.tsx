import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
     
        <div className="z-10 text-center md:text-left">
         <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full">
            <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
            <span className="text-sm font-medium text-purple-800 tracking-wide">
              Educational Services
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 leading-tight mt-4">
              IntelliLearn – <span className="text-blue-600">AI Education Portal</span>
          </h1>
          <p className="mt-6 text-gray-700 max-w-xl">
            Learn smarter with AI-powered tutors that adapt to your pace, style, and goals.  
            Create your own AI tutor in minutes — personalized for any subject.
          </p>
          <div className="mt-8">
            <Link href="/companions/new">
              <button className="cursor-pointer group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="flex items-center justify-center">
                  Build Your Tutor
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
          </Link>
          </div>
        </div>

        <div className="relative w-full h-[400px] flex justify-center items-center">
          <img
            src="/images/i5.svg"
            alt="Main Illustration"
            className="w-52 md:w-64 relative z-10 animate-float"
          /> 

          <img
            src="/images/i1.svg"
            alt="Illustration 1"
            className="absolute  z-10 top-2 left-0  w-20 md:w-35 animate-float-slow"
          />
          <img
            src="/images/i6.svg"
            alt="Illustration 2"
            className="absolute  z-10  top-0 right-0 max-md:hidden md:w-35 animate-float-delay"
          />
          <img
            src="/images/s4.svg"
            alt="Illustration 3"
            className="absolute  z-10  bottom-0 left-0 max-md:hidden md:w-35 animate-float-slow"
          />
          <img
            src="/images/s5.svg"
            alt="Illustration 4"
            className="absolute z-10 bottom-0 right-0 w-20 md:w-35 animate-float-delay"
          />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
