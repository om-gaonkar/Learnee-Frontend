import { subjects } from "../../schema/schema";
import { useSearchParams } from "react-router";

const inputClass =
  "rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100";

const selectClass = inputClass;

export default function FilterCourse() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) params.set(key, value);
    else params.delete(key);

    params.set("page", "1");
    setSearchParams(params);
  };

  const resetFilters = () => setSearchParams({});

  return (
    <div className="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-sm sm:mx-6">
      <div className="flex flex-wrap gap-3">
        <input
          value={searchParams.get("search") ?? ""}
          onChange={(e) => updateParam("search", e.target.value)}
          placeholder="Search courses..."
          className={`${inputClass} min-w-52 px-4`}
        />

        <select
          value={searchParams.get("grade") ?? ""}
          onChange={(e) => updateParam("grade", e.target.value)}
          className={selectClass}
        >
          <option value="">All Grades</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
            <option key={grade} value={grade}>
              Grade {grade}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("subject") ?? ""}
          onChange={(e) => updateParam("subject", e.target.value)}
          className={selectClass}
        >
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={searchParams.get("minPrice") ?? ""}
          onChange={(e) => updateParam("minPrice", e.target.value)}
          placeholder="Min price"
          className={`${inputClass} w-28`}
        />

        <input
          type="number"
          value={searchParams.get("maxPrice") ?? ""}
          onChange={(e) => updateParam("maxPrice", e.target.value)}
          placeholder="Max price"
          className={`${inputClass} w-28`}
        />

        <select
          value={searchParams.get("rating") ?? ""}
          onChange={(e) => updateParam("rating", e.target.value)}
          className={selectClass}
        >
          <option value="">Any Rating</option>
          <option value="4">4+ ⭐</option>
          <option value="4.5">4.5+ ⭐</option>
        </select>

        <select
          value={searchParams.get("sort") ?? ""}
          onChange={(e) => updateParam("sort", e.target.value)}
          className={selectClass}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating_desc">Rating: High to Low</option>
        </select>

        <button
          onClick={resetFilters}
          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
