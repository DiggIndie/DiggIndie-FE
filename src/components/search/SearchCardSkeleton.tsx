export function SearchCardSkeleton() {
  return (
    <div className="animate-pulse flex gap-3">
      <div className="w-16 h-16 bg-gray-700 rounded" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-600 rounded w-1/2" />
      </div>
    </div>
  );
}
