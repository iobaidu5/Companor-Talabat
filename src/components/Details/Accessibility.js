const Accessibility = () => {
  return (
    <div className=" p-6 space-y-8 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Accessibility</h1>
        <p className="text-gray-700">
          If you have specific accessibility needs, please contact the
          restaurant using the information provided during your reservation
          confirmation.
        </p>
      </div>

      {/* Accessibility Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Common Areas Section */}
        <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-blue-600 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15a4.5 4.5 0 107.5 0m-7.5 0V5.25a1.5 1.5 0 013 0v9.75m4.5 0V5.25a1.5 1.5 0 013 0v9.75"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">
              Common Areas
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Wheelchair-accessible entrance</li>
            <li>Wheelchair-accessible seating</li>
            <li>Stair-free path to entrance</li>
            <li>Well-lit path to entrance</li>
            <li>Wheelchair-accessible parking</li>
            <li>Wheelchair-accessible restrooms</li>
            <li>Assistive listening devices available</li>
            <li>Valet parking for wheelchair-equipped vehicles</li>
          </ul>
        </div>

        {/* Dining Area Section */}
        <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-green-600 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.75c-2.485 0-4.5 2.015-4.5 4.5S9.515 12.75 12 12.75s4.5-2.015 4.5-4.5S14.485 3.75 12 3.75zM4.5 20.25v-1.5a4.5 4.5 0 119 0v1.5m-9 0h9"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">
              Dining Area
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Wide aisles between tables</li>
            <li>Wheelchair-accessible buffet stations</li>
            <li>High chairs and booster seats available</li>
            <li>Adjustable seating for accessibility</li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-red-600 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25a1.5 1.5 0 00-3 0V9m-6.75 0V5.25a1.5 1.5 0 00-3 0V9m15 0v9.75a1.5 1.5 0 01-3 0V9m-6.75 0v9.75a1.5 1.5 0 01-3 0V9"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">Services</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Braille menus available</li>
            <li>Staff trained in accessibility standards</li>
            <li>Sign language interpretation upon request</li>
            <li>Service animals welcome</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
