import AdBanner from "./AdBanner";

// components/Tips.js
const Tips = () => {
  return (
    <section className="mt-8 bg-gray-100 p-6 rounded-md">
      <AdBanner
        dataAdSlot="3228536862"
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
      />
      {/* <h2 className="text-2xl font-bold mb-4">Tips on booking cheap flights</h2>
        <p>
          Look for the best time to buy airline tickets to get a cheap ticket to everywhere!
        </p> */}
      {/* Add more tips here */}
    </section>
  );
};

export default Tips;
