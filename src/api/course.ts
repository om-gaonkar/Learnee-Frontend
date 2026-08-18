const BASE_URL = import.meta.env.VITE_BASE_URL;
    

export const getCourses = async () => {
  const res = await fetch(`${BASE_URL}/api/courses/getcourses`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Unable to fetch refresh token");
  }

  const data = await res.json();

  return data;
};

