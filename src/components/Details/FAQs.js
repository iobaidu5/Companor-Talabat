import { useState } from "react";

const faqData = [
  {
    question:
      "Does Boulders Resort & Spa Scottsdale, Curio Collection by Hilton have a pool?",
    answer: "Yes, this property has 3 outdoor pools.",
  },
  {
    question:
      "Is Boulders Resort & Spa Scottsdale, Curio Collection by Hilton pet-friendly?",
    answer: "No, only service animals are welcome at the property.",
  },
  {
    question:
      "How much is parking at Boulders Resort & Spa Scottsdale, Curio Collection by Hilton?",
    answer: "Valet parking is available for USD 25 per day.",
  },
  {
    question:
      "What time is check-in at Boulders Resort & Spa Scottsdale, Curio Collection by Hilton?",
    answer: "Check-in start time: 4 PM; Check-in end time: 2:00 AM.",
  },
  {
    question:
      "What time is check-out at Boulders Resort & Spa Scottsdale, Curio Collection by Hilton?",
    answer: "Check-out is at noon.",
  },
  {
    question:
      "Where is Boulders Resort & Spa Scottsdale, Curio Collection by Hilton located?",
    answer:
      "Located in Pinnacle Peak, this luxury hotel is 0.4 mi (0.6 km) from Boulders Golf Club and within 12 mi (20 km) of Pinnacle Peak Park and Cave Buttes Recreation Area. Desert Ridge Marketplace and Musical Instrument Museum are also within 12 mi (20 km).",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track the currently open FAQ index

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Open clicked FAQ or close if already open
  };

  return (
    <div className="space-y-4">
      {faqData.map((faq, index) => (
        <div className="border-b" key={index}>
          <button
            onClick={() => toggle(index)}
            className="flex justify-between w-full py-4 text-left text-lg font-semibold text-gray-900 focus:outline-none"
          >
            <span className="font-PoppinsSemiBold">{faq.question}</span>
            <span>
              {openIndex === index ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </span>
          </button>
          {openIndex === index && (
            <p className="pl-4 pb-4 text-gray-700">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
