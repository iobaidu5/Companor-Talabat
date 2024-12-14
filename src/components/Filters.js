import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Filters({ setFilters }) {
  const router = useRouter();
  const [localFilters, setLocalFilters] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (key, value) => {
    // Update the local filters state
    const updatedFilters = { ...localFilters, [key]: value };
    if (!value) delete updatedFilters[key]; // Remove empty keys
    setLocalFilters(updatedFilters);

    // Serialize and update the URL
    const serializedFilter = JSON.stringify(updatedFilters);
    const updatedQuery = { ...router.query, filter: serializedFilter };
    const queryString = new URLSearchParams(updatedQuery).toString();
    const updatedUrl = `${router.pathname}?${queryString}`;
    window.history.replaceState(null, "", updatedUrl);

    // Update the parent filters state
    setFilters(updatedFilters);
  };

  useEffect(() => {
    // Synchronize local state with query parameters
    if (router.query.filter) {
      try {
        const parsedFilter = JSON.parse(router.query.filter);
        setLocalFilters(parsedFilter);
        setFilters(parsedFilter);
      } catch (err) {
        console.error("Error parsing filter:", err);
        setLocalFilters({});
      }
    }
  }, [router.query.filter, setFilters]);


  useEffect(() => {
    const fetchCategories = async () => {
      const cachedCategories = localStorage.getItem('categories');

      if (cachedCategories) {
        setLoading(false);
        setCategories(JSON.parse(cachedCategories));
      } else {
        try {
          setLoading(true);
          const response = await axios.get('/api/all-categories');
          const fetchedCategories = response.data.categories || [];
          setCategories(fetchedCategories);
          localStorage.setItem('categories', JSON.stringify(fetchedCategories));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching categories:', error);
          setLoading(false);
        }
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
<div className="mb-6">
  <label className="font-semibold">Category</label>
  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
    {[
      { value: "", label: "All Categories" },
      { value: "Picks for you 🔥", label: "Picks for You 🔥" },
      { value: "New Pizza Flavours", label: "New Pizza Flavours" },
      { value: "The Famous New Yorker Pizza (XL)", label: "The Famous New Yorker Pizza (XL)" },
      { value: "NEW Super Meals", label: "NEW Super Meals" },
      { value: "Pizzas", label: "Pizzas" },
      { value: "Chicken Appetisers Corner", label: "Chicken Appetisers Corner" },
      { value: "Appetizers", label: "Appetizers" },
      { value: "Drinks", label: "Drinks" },
    ].map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => handleFilterChange("category", option.value)}
        className={`relative px-4 py-2 rounded-lg border transition-colors text-sm truncate ${
          localFilters.category === option.value
            ? "bg-[#FF5A00] text-white border-[#FF5A00]"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
        title={option.label} // Tooltip for long names
      >
        {option.label}
      </button>
    ))}
  </div>
</div>

    </div>
  );
}
