import { useState } from 'react';

function DateDisplay() {
  const [startDate, setStartDate] = useState('2024-10-26');
  const [endDate, setEndDate] = useState('2024-10-28');

  return (
    <div className="flex space-x-2 border rounded-lg px-4 py-5 w-full">
      {/* Calendar Icon */}
      {/* <div className="bg-gray-100 rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-blue-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 3v1.5m7.5-1.5v1.5M3 9h18M4.5 7.5h15A1.5 1.5 0 0121 9v10.5A1.5 1.5 0 0119.5 21h-15A1.5 1.5 0 013 19.5V9a1.5 1.5 0 011.5-1.5z"
          />
        </svg>
      </div> */}

      {/* Date Input Fields */}
      <div>
        <p className="text-xs font-semibold text-gray-500">Dates</p>
        <div className="flex items-center space-x-1">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-gray-800 text-lg font-semibold focus:outline-none w-full"
          />
          {/* <span className="text-gray-800 text-lg font-semibold">-</span> */}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-gray-800 text-lg font-semibold focus:outline-none w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default DateDisplay;
