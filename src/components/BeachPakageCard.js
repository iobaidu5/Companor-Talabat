const BeachPackageCard = () => {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden mx-auto mt-8">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/banner.webp')", objectFit: 'cover', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-200 opacity-20"></div>

      {/* Content Box */}
      <div className="relative p-8 bg-white rounded-lg max-w-xs m-6 space-y-4 shadow-lg">
        <h2 className="text-3xl font-bold text-[#1f254f]">Restaurant Advertisement</h2>
        <p className="text-sm text-gray-600">
          20% off on this Restaurant
        </p>
        <button className="bg-[#0071eb] text-white font-semibold px-4 py-2 rounded-lg">
          Get your doscount
        </button>
      </div>
    </div>
  );
};

export default BeachPackageCard;
