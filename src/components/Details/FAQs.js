import { useState } from "react";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What are your restaurant's opening hours?",
      answer:
        "Our restaurant is open daily from 10:00 AM to 10:00 PM. On weekends, we extend our hours until 11:00 PM.",
    },
    {
      question: "Do you offer vegetarian and vegan options?",
      answer:
        "Yes, we offer a variety of vegetarian and vegan options. Our menu is designed to accommodate different dietary preferences.",
    },
    {
      question: "Is your restaurant wheelchair accessible?",
      answer:
        "Absolutely! We have a wheelchair-accessible entrance, seating, and restrooms to ensure everyone's comfort.",
    },
    {
      question: "Do you accept online reservations?",
      answer:
        "Yes, you can make reservations online through our website or by calling us directly.",
    },
    {
      question: "Do you provide parking facilities?",
      answer:
        "Yes, we offer free parking for our guests, including designated spots for disabled parking.",
    },
  ];

  return (
    <div className="flex my-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 w-1/5">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4 w-4/5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-md"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              <span className="text-lg font-PoppinsBold text-gray-800">
                {faq.question}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 text-gray-800 transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Answer */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "max-h-[500px] p-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
