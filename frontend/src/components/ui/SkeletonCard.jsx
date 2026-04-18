const SkeletonCard = () => {
  return (
    <div className="rounded-2xl overflow-hidden bg-surface border border-border">
      {/* Image skeleton */}
      <div className="aspect-[4/3] bg-surface-light relative overflow-hidden">
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            backgroundImage: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.05), transparent)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-5 w-40 bg-surface-light rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"
                 style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.05), transparent)', backgroundSize: '200% 100%' }} />
          </div>
          <div className="h-5 w-12 bg-surface-light rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"
                 style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.05), transparent)', backgroundSize: '200% 100%' }} />
          </div>
        </div>
        <div className="h-4 w-28 bg-surface-light rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer"
               style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.05), transparent)', backgroundSize: '200% 100%' }} />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 w-24 bg-surface-light rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer"
                 style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.05), transparent)', backgroundSize: '200% 100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
