import React from 'react'
import { AlertTriangle, BookOpenCheck, Ban, ShieldCheck, Info } from 'lucide-react'

const Guidelines = () => {
   const instructions = [
        {
            serialNO: 1,
            statement: "You must select a subject from the provided list only."       
        },
        {
            serialNO: 2,
            statement: "The chosen topic must directly align with the selected subject. Any unrelated topics will not be accepted."       
        },
        {
            serialNO: 3,
            statement: "Vulgar, abusive, sexual, drug-related, violent, or offensive content is strictly prohibited."       
        },
        {
            serialNO: 4,
            statement: "Only academic and educational topics are permitted."       
        },
        {
            serialNO: 5,
            statement: "If you attempt to enter irrelevant or inappropriate content, the tutor will immediately refuse and may terminate the session."       
        }
   ]
  
   return (
      <div className="mb-6 border border-red-300 bg-red-50 rounded-xl p-6 shadow-sm">
        <h2 className="font-bold text-lg text-red-800 flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-red-700" />Mandatory Rules for Subject & Topic Selection
        </h2>

        <ul className="space-y-2">
          {instructions.map(({serialNO,statement})=>(
            <li key={serialNO}>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold text-gray-900">{serialNO}.</span>  {statement}
              </p>
            </li>
          ))}
        </ul>
      </div>
   )
}

export default Guidelines
