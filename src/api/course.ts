const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCourses = async (params?: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);

  const res = await fetch(
    `${BASE_URL}/api/courses/getcourses?${searchParams}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Unable to fetch courses");
  }

  return res.json();
};


export const getCourseDetail = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/courses/getcourses/${id}`, {
      method: "GET",
      credentials: "include",
    });

  if (!res.ok) throw new Error("Unable to fetch course");

  const data = await res.json();
  return data;
};