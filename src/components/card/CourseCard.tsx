import type { Course } from "../../schema/schema";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          {course.subject}
        </span>

        <span className="flex items-center gap-1 text-sm font-medium text-gray-600">
          ⭐ {course.teacher.rating}
        </span>
      </div>

      <h2 className="mb-3 text-xl font-semibold leading-snug text-gray-900">
        {course.title}
      </h2>

      <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
        <span>Grade {course.grade}</span>
        <span className="h-1 w-1 rounded-full bg-gray-300" />
        <span>{course.duration}</span>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-xs text-gray-400">Course fee</p>
          <p className="text-xl font-bold text-gray-900">₹{course.price}</p>
        </div>

        <button
          type="button"
          className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          View Course
        </button>
      </div>
    </div>
  );
}
