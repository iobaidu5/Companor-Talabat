import { FaUtensils, FaWineBottle, FaClock, FaTshirt, FaExclamationCircle } from "react-icons/fa";

const Policies = () => {
  const policies = [
    {
      title: "Outside Food",
      description:
        "Bringing outside food or beverages into the restaurant is not permitted. We strive to provide a consistent dining experience for all guests.",
      icon: <FaUtensils />,
    },
    {
      title: "Allergies & Dietary Restrictions",
      description:
        "Please inform us of any allergies or dietary restrictions while placing your order. We will do our best to accommodate your needs.",
      icon: <FaExclamationCircle />,
    },
    {
      title: "Reservation Timings",
      description:
        "Reservations are held for a maximum of 15 minutes beyond the reserved time. Late arrivals may result in forfeited reservations.",
      icon: <FaClock />,
    },
    {
      title: "Dress Code",
      description:
        "Smart casual attire is required. Beachwear, gym attire, and flip-flops are not permitted in the restaurant.",
      icon: <FaTshirt />,
    },
    {
      title: "Corkage Fee",
      description:
        "Guests may bring their own wine, subject to a corkage fee. Please inform us in advance if you plan to bring your own bottle.",
      icon: <FaWineBottle />,
    },
  ];

  return (
    <div className="mx-auto p-8 w-full max-w-7xl bg-gradient-to-br from-white to-gray-50">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10">
        Restaurant Policies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-md hover:shadow-xl border border-gray-200 p-6 transition-all duration-300 group"
          >
            {/* Icon */}
            <div className="absolute -top-8 left-6 bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-full shadow-lg">
              <div className="text-xl">{policy.icon}</div>
            </div>
            {/* Content */}
            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-4 group-hover:text-blue-500">
              {policy.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
