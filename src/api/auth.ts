const BASE_URL = import.meta.env.VITE_BASE_URL;
    

export const CheckAuth = async () => {
  const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Unable to fetch refresh token");
  }

  const data = await res.json();

  return data;
};



export const logout = async () => {
  const res = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Unable to fetch refresh token");
  }

  const data = await res.json();

  return data;
};




