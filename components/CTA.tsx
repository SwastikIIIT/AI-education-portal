import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
     <section className='cta-section'>
       <div className='cta-badge'>Start Learning Your Way</div>
       <h2 className='text-3xl font-bold'>Build and Personalize Learning Experience</h2>
       <p>Pick a name,subject,voice,& personality-and start learning through voice conversations that feel natural and fun</p>
       <Image src="images/cta.svg" alt="cta" width={360} height={230}/>
       <button className='btn-primary px-8 py-2'>
          <Image src="/icons/plus.svg" alt="plus" width={12} height={12}/>
          <Link href="/companions/new" className='text-lg'>Build a new Companion</Link>
       </button>
     </section>
  )
}

export default CTA