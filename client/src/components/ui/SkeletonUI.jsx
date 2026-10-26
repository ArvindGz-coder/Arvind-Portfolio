export function Shimmer({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-white/[0.04] rounded-xl ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
}

export function ProjectSkeletonCard() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#030712]/70 p-6 sm:p-9 lg:p-10 backdrop-blur-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shimmer className="h-4 w-10" />
              <Shimmer className="h-4 w-32" />
            </div>
            <Shimmer className="h-6 w-20 rounded-full" />
          </div>

          <Shimmer className="h-9 w-3/4" />

          {/* Problem / Solution Box Skeleton */}
          <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-5">
            <div className="flex gap-3">
              <Shimmer className="h-5 w-5 rounded-full shrink-0" />
              <div className="space-y-2 w-full">
                <Shimmer className="h-3 w-28" />
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-4/5" />
              </div>
            </div>

            <div className="flex gap-3 border-t border-white/10 pt-3">
              <Shimmer className="h-5 w-5 rounded-full shrink-0" />
              <div className="space-y-2 w-full">
                <Shimmer className="h-3 w-36" />
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-5/6" />
              </div>
            </div>
          </div>

          {/* Tech Badges Skeleton */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Shimmer key={i} className="h-7 w-20 rounded-lg" />
            ))}
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex gap-3 pt-3">
            <Shimmer className="h-10 w-32 rounded-xl" />
            <Shimmer className="h-10 w-32 rounded-xl" />
          </div>
        </div>

        {/* Right Column Skeleton (Browser Mockup) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-white/10 bg-[#030712] p-2 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 px-2">
              <div className="flex gap-1.5">
                <Shimmer className="h-2.5 w-2.5 rounded-full" />
                <Shimmer className="h-2.5 w-2.5 rounded-full" />
                <Shimmer className="h-2.5 w-2.5 rounded-full" />
              </div>
              <Shimmer className="h-3.5 w-36 rounded-md" />
              <div className="w-6" />
            </div>

            <div className="aspect-[16/10] w-full p-4 space-y-3">
              <Shimmer className="h-5 w-1/3" />
              <div className="grid grid-cols-3 gap-2">
                <Shimmer className="h-12 w-full rounded-lg" />
                <Shimmer className="h-12 w-full rounded-lg" />
                <Shimmer className="h-12 w-full rounded-lg" />
              </div>
              <Shimmer className="h-20 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BentoSkeletonCard({ className = "" }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Shimmer className="h-11 w-11 rounded-2xl" />
        <Shimmer className="h-4 w-16" />
      </div>
      <Shimmer className="h-6 w-3/4" />
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-5/6" />
      <div className="pt-4 flex flex-wrap gap-2">
        <Shimmer className="h-6 w-16 rounded-md" />
        <Shimmer className="h-6 w-20 rounded-md" />
        <Shimmer className="h-6 w-16 rounded-md" />
      </div>
    </div>
  );
}
