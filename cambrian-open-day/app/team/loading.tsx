import { Skeleton } from "@/components/ui/skeleton"

export default function TeamLoading() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-24" />
        </div>

        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex space-x-3">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-16 text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-2" />
          <Skeleton className="h-4 w-full max-w-xl mx-auto mb-6" />
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>
      </div>
    </div>
  )
}
