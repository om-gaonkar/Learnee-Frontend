import { subjects } from "../../schema/schema";
import { useSearchParams } from "react-router";

export default function FilterCourse() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) params.set(key, value);
    else params.delete(key);

    params.set("page", "1");
    setSearchParams(params);
  };

  return (
    <div className="flex flex-wrap gap-3 p-4">
      <input
        value={searchParams.get("search") ?? ""}
        onChange={(e) => updateParam("search", e.target.value)}
        placeholder="Search course..."
        className="rounded-lg border px-3 py-2"
      />

      <select
        value={searchParams.get("grade") ?? ""}
        onChange={(e) => updateParam("grade", e.target.value)}
        className="rounded-lg border px-3 py-2"
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
        className="rounded-lg border px-3 py-2"
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
        className="w-28 rounded-lg border px-3 py-2"
      />

      <input
        type="number"
        value={searchParams.get("maxPrice") ?? ""}
        onChange={(e) => updateParam("maxPrice", e.target.value)}
        placeholder="Max price"
        className="w-28 rounded-lg border px-3 py-2"
      />

      <select
        value={searchParams.get("rating") ?? ""}
        onChange={(e) => updateParam("rating", e.target.value)}
        className="rounded-lg border px-3 py-2"
      >
        <option value="">Any Rating</option>
        <option value="4">4+ ⭐</option>
        <option value="4.5">4.5+ ⭐</option>
      </select>

      <select
        value={searchParams.get("sort") ?? ""}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="rounded-lg border px-3 py-2"
      >
        <option value="">Sort By</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating_desc">Rating: High to Low</option>
      </select>
    </div>
  );
}
