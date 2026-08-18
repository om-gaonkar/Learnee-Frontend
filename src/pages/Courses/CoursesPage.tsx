import { useEffect, useState } from "react";
import { getCourses } from "../../api/course";
import { CourseCard } from "../../components/card/CourseCard";
import type { Course } from "../../schema/schema";
import FilterCourse from "../../components/features/FilterCourse";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        setCourses(res.courses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <div>
        <FilterCourse />
      </div>
      <main className="w-full p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
