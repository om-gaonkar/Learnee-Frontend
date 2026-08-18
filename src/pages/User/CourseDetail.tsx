import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCourseDetail } from "../../api/course";
import type { Course } from "../../schema/schema";

const infoClass = "rounded-xl border border-gray-100 bg-gray-50 p-4";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getCourseDetail(id);
        setCourse(res.course);
      } catch (error) {
        console.error(error);
        setError("Unable to load course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-500">Loading course...</p>;
  if (error)
    return (
      <p className="p-6 text-red-500 flex justify-center items-center">
        {error}
      </p>
    );
  if (!course) return <p className="p-6 text-gray-500">Course not found.</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-indigo-50/70 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-indigo-600 shadow-sm">
              {course.subject}
            </span>

            <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-600 shadow-sm">
              ⭐ {course.teacher.rating}
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            {course.title}
          </h1>

          <p className="mt-3 max-w-2xl leading-6 text-gray-600">
            {course.description}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={infoClass}>
              <p className="text-xs text-gray-400">Grade</p>
              <p className="mt-1 font-medium text-gray-900">
                Grade {course.grade}
              </p>
            </div>

            <div className={infoClass}>
              <p className="text-xs text-gray-400">Duration</p>
              <p className="mt-1 font-medium text-gray-900">
                {course.duration}
              </p>
            </div>

            <div className={infoClass}>
              <p className="text-xs text-gray-400">Teacher</p>
              <p className="mt-1 font-medium text-gray-900">
                {course.teacher.name}
              </p>
            </div>

            <div className={infoClass}>
              <p className="text-xs text-gray-400">Rating</p>
              <p className="mt-1 font-medium text-gray-900">
                ⭐ {course.teacher.rating}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
            <div>
              <p className="text-xs text-gray-400">Course fee</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{course.price}
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
