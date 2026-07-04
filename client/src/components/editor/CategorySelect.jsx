const CategorySelect = ({ category, setCategory }) => {
  const categories = [
    "MERN Stack",
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "DevOps",
    "Database",
    "UI/UX",
    "Career",
    "Other",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;