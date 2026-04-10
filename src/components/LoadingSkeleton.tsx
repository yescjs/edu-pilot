"use client";

export function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Summary bar skeleton */}
      <div className="flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl px-5 py-4 flex-1"
          >
            <div className="h-4 w-20 bg-border rounded animate-pulse mb-2" />
            <div className="h-8 w-12 bg-border rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Heatmap skeleton */}
      <div>
        <div className="h-5 w-32 bg-border rounded mb-4 animate-pulse" />
        <div className="grid grid-cols-6 gap-px bg-border rounded-xl overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="h-12 bg-card animate-pulse"
              style={{
                animationDelay: `${i * 50}ms`,
                opacity: 0.4 + ((i * 7 + 3) % 10) / 20,
              }}
            />
          ))}
        </div>
      </div>

      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="h-5 w-24 bg-border rounded mb-4 animate-pulse" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 bg-card border border-border rounded-xl animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="h-5 w-20 bg-border rounded mb-4 animate-pulse" />
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-32 bg-card border border-border rounded-xl animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
