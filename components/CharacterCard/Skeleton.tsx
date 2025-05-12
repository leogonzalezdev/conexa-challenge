const SkeletonCard = () => {
  return (
    <div className="w-full max-w-xs rounded-3xl bg-[#121212]/90 backdrop-blur-2xl p-4 shadow-2xl ring-1 ring-[#00B5CC]/10 animate-pulse">
      <div className="w-full aspect-[5/3] rounded-2xl bg-gray-700" />
      <div className="mt-4 h-5 bg-gray-600 rounded w-3/4" />
      <div className="mt-2 h-4 bg-gray-700 rounded w-1/2" />
      <div className="mt-4 h-9 rounded-xl bg-[#00B5CC]/10" />
    </div>
  )
}

export default SkeletonCard