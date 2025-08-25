import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

  return(
      <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-lg font-semibold text-gray-800">
         One moment, almost there... 
        </p>
      </div>
    </div>
  )
}