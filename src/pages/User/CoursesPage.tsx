import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getCourses } from "../../api/course";
import { CourseCard } from "../../components/card/CourseCard";
import FilterCourse from "../../components/features/FilterCourse";
import type { Course } from "../../schema/schema";

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);

      try {
        const res = await getCourses(
          Object.fromEntries(searchParams.entries()),
        );

        setCourses(res.courses);
        setPagination(res.pagination);
      } catch (error) {
        console.error(error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchParams]);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
  };

  return (
    <div className="w-full">
      <FilterCourse />

      <main className="p-4 sm:p-6">
        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <p className="text-sm text-gray-500">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex min-h-60 items-center justify-center">
            <p className="text-sm text-gray-500">
              No courses found matching your filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  disabled={pagination.currentPage === 1}
                  onClick={() => changePage(pagination.currentPage - 1)}
                  className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>

                <button
                  disabled={pagination.currentPage === pagination.totalPages}
                  onClick={() => changePage(pagination.currentPage + 1)}
                  className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
