export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Heatmap skeleton */}
      <div>
        <div className="h-5 w-48 bg-stone-200 rounded mb-4" />
        <div className="grid grid-cols-6 gap-1 rounded-lg overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="h-11 bg-stone-200"
              style={{ opacity: 0.5 + Math.random() * 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Questions skeleton */}
        <div>
          <div className="h-5 w-40 bg-stone-200 rounded mb-4" />
          <div className="h-28 bg-stone-200 rounded-lg mb-3" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-stone-100 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Risk areas skeleton */}
        <div>
          <div className="h-5 w-28 bg-stone-200 rounded mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-32 bg-stone-100 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
